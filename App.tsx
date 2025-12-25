
import React, { useState, useEffect, useRef } from 'react';
import { MemoryRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, Cpu, Wrench, MessageSquare, Sun, Moon, 
  Menu, X, Zap, Code, Box, Rocket, CheckCircle, XCircle, Activity, Battery, ChevronRight, Play, Lightbulb, Radio, Fan, BrainCircuit, RotateCw, Award, ArrowRight, Lock, Map as MapIcon, PanelLeft, Plus, Search, Trash2, ShieldAlert, List
} from './components/Icons';
import { generateProject, chatWithTutor } from './services/geminiService';
import { AppSection, Difficulty, LessonContent, ProjectContent, ChatMessage, CurriculumSection } from './types';
import CircuitLab from './components/CircuitLab';
import DroneProject from './components/DroneProject';
import ComponentGuide from './components/ComponentGuide';
import SafetyManual from './components/SafetyManual';
import { STATIC_LESSONS, CURRICULUM, COMMUNITY_PROJECTS } from './data/lessonData';

// --- Sub-Components ---

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center py-20 animate-fade-in">
    <div className="relative mb-4">
      <div className="w-10 h-10 rounded-full border-2 border-light-border dark:border-dark-surfaceHighlight"></div>
      <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
    </div>
    <span className="text-light-subtext dark:text-dark-subtext font-medium text-xs animate-pulse">Loading content...</span>
  </div>
);

const SidebarItem = ({ to, icon: Icon, label, active, collapsed }: { to: string, icon: any, label: string, active: boolean, collapsed: boolean }) => (
  <Link 
    to={to} 
    title={collapsed ? label : undefined}
    className={`flex items-center py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
      active 
        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
        : 'text-light-subtext dark:text-dark-subtext hover:bg-light-surface dark:hover:bg-dark-surfaceHighlight hover:text-light-text dark:hover:text-white'
    } ${collapsed ? 'md:justify-center md:px-2' : 'px-4 space-x-3'}`}
  >
    <Icon className={`w-4 h-4 relative z-10 flex-shrink-0 ${active ? 'text-white' : 'group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors'}`} />
    <span className={`font-medium tracking-wide text-xs relative z-10 transition-all duration-200 ${collapsed ? 'md:hidden' : 'block'}`}>{label}</span>
  </Link>
);

// --- Helpers for Icons ---

const getModuleIcon = (iconName: string) => {
  switch(iconName) {
    case 'zap': return Zap;
    case 'cpu': return Cpu;
    case 'cog': return Fan; 
    case 'brain': return BrainCircuit;
    default: return BookOpen;
  }
};

const getModuleColor = (color: string, isDark: boolean) => {
  const alpha = isDark ? '20' : '10';
  const textShade = isDark ? '400' : '600';
  switch(color) {
    case 'blue': return `bg-blue-500/${alpha} text-blue-${textShade}`;
    case 'purple': return `bg-purple-500/${alpha} text-purple-${textShade}`;
    case 'orange': return `bg-orange-500/${alpha} text-orange-${textShade}`;
    case 'pink': return `bg-pink-500/${alpha} text-pink-${textShade}`;
    default: return `bg-gray-500/${alpha} text-gray-${textShade}`;
  }
};

// --- Helper Functions for Locking ---

const getCompletedLessons = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem('completedLessons') || '[]');
  } catch {
    return [];
  }
};

const isLessonUnlocked = (lessonId: string, completedLessons: string[]) => {
  // Find the lesson in curriculum
  for (let sIdx = 0; sIdx < CURRICULUM.length; sIdx++) {
    const section = CURRICULUM[sIdx];
    const lIdx = section.lessons.findIndex(l => l.id === lessonId);
    
    if (lIdx !== -1) {
      // Logic:
      // 1. If it's the very first lesson of first module, it's unlocked.
      // 2. If it's the first lesson of a later module, the PREVIOUS MODULE must be fully complete.
      // 3. If it's a later lesson in the SAME module, the PREVIOUS LESSON must be complete.

      if (sIdx === 0 && lIdx === 0) return true;

      if (lIdx === 0) {
        // First lesson of a new section. Check if previous section is done.
        const prevSection = CURRICULUM[sIdx - 1];
        const allPrevDone = prevSection.lessons.every(l => completedLessons.includes(l.id));
        return allPrevDone;
      } else {
        // Subsequent lesson in same section. Check if prev lesson is done.
        const prevLessonId = section.lessons[lIdx - 1].id;
        return completedLessons.includes(prevLessonId);
      }
    }
  }
  return false;
};

const isSectionLocked = (sectionIndex: number, completedLessons: string[]) => {
  if (sectionIndex === 0) return false;
  // Locked if previous section is not fully complete
  const prevSection = CURRICULUM[sectionIndex - 1];
  return !prevSection.lessons.every(l => completedLessons.includes(l.id));
};


// --- Pages ---

const Dashboard = () => {
  const completedLessons = getCompletedLessons();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Find current active lesson (first unlocked but incomplete)
  let currentLessonId: string | null = null;
  let currentLessonTitle: string = "";
  
  for (const section of CURRICULUM) {
    for (const lesson of section.lessons) {
      if (!completedLessons.includes(lesson.id) && isLessonUnlocked(lesson.id, completedLessons)) {
        currentLessonId = lesson.id;
        currentLessonTitle = lesson.title;
        break;
      }
    }
    if (currentLessonId) break;
  }

  // If all complete
  if (!currentLessonId && completedLessons.length > 0) {
    currentLessonId = "completed"; 
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in pb-20">
      <header className="mb-10">
        <h2 className="text-xs font-bold text-light-subtext dark:text-dark-subtext uppercase tracking-widest mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold text-light-text dark:text-white tracking-tight">{greeting}, Engineer.</h1>
      </header>

      {/* Hero: Current Path */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-light-text dark:text-white tracking-tight mb-4 flex items-center">
          <MapIcon className="w-5 h-5 mr-2 text-primary-500"/> Continue Learning
        </h2>
        
        {currentLessonId === "completed" ? (
           <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2rem] p-8 text-white shadow-glow">
              <h3 className="text-2xl font-bold mb-2">Curriculum Complete!</h3>
              <p className="opacity-90">You've mastered the basics. Time to build a project.</p>
              <Link to="/projects/drone-build" className="mt-4 inline-block bg-white text-green-600 font-bold px-6 py-2 rounded-full">Build Drone</Link>
           </div>
        ) : (
           <Link 
             to={currentLessonId ? `/learn/${currentLessonId}` : '#'} 
             onClick={(e) => !currentLessonId && e.preventDefault()}
             className="relative block h-48 md:h-56 rounded-[2rem] overflow-hidden shadow-glow group border border-primary-500/30"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-800 opacity-90 transition-opacity group-hover:opacity-100"></div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              
              <div className="absolute top-6 right-6">
                 <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    <Play className="w-3 h-3 mr-1.5 fill-current" /> Up Next
                 </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 max-w-xl">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Recommended Lesson</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {currentLessonTitle || "Start Your Journey"}
                </h3>
              </div>
           </Link>
        )}
      </div>

      {/* Curriculum Path Vertical Timeline */}
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-8 space-y-12 pb-12">
        {CURRICULUM.map((section, sIdx) => {
          const isLocked = isSectionLocked(sIdx, completedLessons);
          const Icon = getModuleIcon(section.icon);
          const allComplete = section.lessons.every(l => completedLessons.includes(l.id));

          return (
            <div key={section.id} className="relative pl-8 md:pl-12">
               {/* Timeline Dot */}
               <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${
                 allComplete 
                   ? 'bg-green-500 border-green-500' 
                   : isLocked 
                     ? 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700' 
                     : 'bg-primary-500 border-primary-500 animate-pulse'
               }`}></div>

               {/* Section Header */}
               <div className={`mb-6 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex items-center space-x-3 mb-2">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${isLocked ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        Module {sIdx + 1}
                     </span>
                     {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-white">{section.title}</h3>
                  <p className="text-light-subtext dark:text-dark-subtext text-sm max-w-lg mt-1">{section.description}</p>
               </div>

               {/* Lessons List */}
               <div className="grid gap-4">
                 {section.lessons.map((lesson, lIdx) => {
                   const isLessonComplete = completedLessons.includes(lesson.id);
                   const isLockedLesson = isLocked || !isLessonUnlocked(lesson.id, completedLessons);

                   return (
                     <Link 
                       key={lesson.id}
                       to={isLockedLesson ? '#' : `/learn/${lesson.id}`}
                       onClick={(e) => isLockedLesson && e.preventDefault()}
                       className={`
                         flex items-center justify-between p-4 rounded-2xl border transition-all duration-200
                         ${isLockedLesson 
                            ? 'bg-gray-50 dark:bg-dark-surface/30 border-transparent cursor-not-allowed opacity-60' 
                            : 'bg-white dark:bg-dark-surface border-light-border dark:border-dark-border shadow-sm hover:shadow-md hover:border-primary-500/50 cursor-pointer'}
                       `}
                     >
                        <div className="flex items-center space-x-4">
                           <div className={`
                             w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                             ${isLessonComplete 
                               ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                               : isLockedLesson 
                                  ? 'bg-gray-100 text-gray-400 dark:bg-white/5' 
                                  : 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'}
                           `}>
                              {isLessonComplete ? <CheckCircle className="w-5 h-5"/> : isLockedLesson ? <Lock className="w-4 h-4"/> : <Play className="w-4 h-4 ml-0.5"/>}
                           </div>
                           <div>
                              <div className="text-sm font-bold text-light-text dark:text-white mb-0.5">{lesson.title}</div>
                              <div className="text-xs text-light-subtext dark:text-dark-subtext font-medium flex items-center">
                                 {lesson.duration} • {lesson.xp} XP
                              </div>
                           </div>
                        </div>
                        {!isLockedLesson && !isLessonComplete && (
                           <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                     </Link>
                   )
                 })}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LessonPage = () => {
  const params = useLocation();
  const lessonId = params.pathname.split('/').pop() || '';
  const navigate = useNavigate();
  
  const [data, setData] = useState<LessonContent | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (STATIC_LESSONS[lessonId]) {
      const lesson = STATIC_LESSONS[lessonId];
      setData(lesson);
      setQuizAnswers(new Array(lesson.quiz.length).fill(-1));
    } else {
      // Handle not found
      setData(null);
    }
  }, [lessonId]);

  const handleQuizSelect = (qIndex: number, optionIndex: number) => {
    if (quizAnswers[qIndex] !== -1) return;
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const getScore = () => {
    if (!data) return 0;
    let score = 0;
    data.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const allQuestionsAnswered = quizAnswers.every(a => a !== -1);
  const passed = getScore() === data?.quiz.length;

  const handleComplete = () => {
    if (!lessonId) return;
    
    // Save progress
    const completed = getCompletedLessons();
    if (!completed.includes(lessonId)) {
       const newCompleted = [...completed, lessonId];
       localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
    }

    // Navigate to next or dashboard
    if (data?.nextLessonId) {
       navigate(`/learn/${data.nextLessonId}`);
       window.scrollTo(0,0);
    } else {
       navigate('/');
    }
  };

  if (!data) return <div className="p-10 text-center">Lesson not found. <Link to="/" className="text-primary-500">Go Back</Link></div>;

  return (
    <div className="relative min-h-screen pb-20 bg-light-bg dark:bg-dark-bg">
      <div className="fixed top-16 left-0 h-1 bg-primary-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />

      <div className="max-w-3xl mx-auto pt-6 px-6">
         <Link to="/" className="inline-flex items-center text-xs font-bold text-light-subtext dark:text-dark-subtext mb-6 hover:text-primary-500 transition-colors">
            <ChevronRight className="w-3 h-3 rotate-180 mr-1" /> Back to Curriculum
         </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-soft border border-light-border dark:border-dark-border p-8 md:p-10 min-h-[500px]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text dark:text-white tracking-tight leading-tight mb-8 pb-8 border-b border-light-border dark:border-white/5">
            {data.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none markdown-content">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-24">
         <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mr-3">
               <Award className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-light-text dark:text-white">Knowledge Check</h2>
         </div>

         <div className="space-y-4">
           {data.quiz.map((q, idx) => {
             const userAnswer = quizAnswers[idx];
             const isAnswered = userAnswer !== -1;
             const isCorrect = userAnswer === q.correctIndex;
             
             return (
               <div key={idx} className={`bg-white dark:bg-dark-surface rounded-2xl border transition-all p-6 ${isAnswered ? (isCorrect ? 'border-green-500/50' : 'border-red-500/50') : 'border-light-border dark:border-dark-border'}`}>
                    <h3 className="text-sm font-bold text-light-text dark:text-white mb-4">{q.question}</h3>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                           <button 
                             key={optIdx} 
                             onClick={() => handleQuizSelect(idx, optIdx)}
                             disabled={isAnswered}
                             className={`w-full text-left p-3 rounded-lg font-medium text-sm transition-all border flex justify-between items-center
                               ${isAnswered && optIdx === q.correctIndex ? "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400" :
                                 isAnswered && optIdx === userAnswer ? "bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400" :
                                 "border-transparent bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10"}
                             `}
                           >
                             <span>{opt}</span>
                             {isAnswered && optIdx === q.correctIndex && <CheckCircle className="w-4 h-4 text-green-500" />}
                           </button>
                      ))}
                    </div>
               </div>
             );
           })}
         </div>

         {allQuestionsAnswered && (
           <div className="mt-8 bg-gradient-to-br from-primary-600 to-blue-700 rounded-[2rem] p-8 text-center text-white shadow-2xl animate-fade-in">
              <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
              <p className="text-blue-100 text-sm mb-6">You scored {getScore()}/{data.quiz.length}</p>
              
              <button onClick={handleComplete} className="px-8 py-3 bg-white text-primary-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
                 {data.nextLessonId ? "Next Lesson" : "Finish Curriculum"} <ArrowRight className="inline w-4 h-4 ml-2"/>
              </button>
           </div>
         )}
      </div>
    </div>
  );
};

const ProjectPage = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectContent | null>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectContent[]>([]);
  const [view, setView] = useState<'list' | 'detail'>('list');

  // Load saved projects AND community projects on mount
  useEffect(() => {
    // 1. Get user generated projects from local storage
    let localProjects: ProjectContent[] = [];
    const saved = localStorage.getItem('myProjects');
    if (saved) {
      try {
        localProjects = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }

    // 2. Combine with Community Projects (duplicates are fine, but user ones take precedence if ID conflicts)
    // We filter community projects to ensure we don't duplicate them if they were somehow saved to LS (though we save to LS separately)
    // Actually, let's keep them separate lists in memory for now, but display them together.
    // For simplicity, we just merge them into state.
    
    // Create a map to dedup by ID
    const projectMap = new Map<string, ProjectContent>();
    COMMUNITY_PROJECTS.forEach(p => projectMap.set(p.id!, p));
    localProjects.forEach(p => projectMap.set(p.id!, p));

    setSavedProjects(Array.from(projectMap.values()));
  }, []);

  // Save ONLY user-generated projects to localStorage whenever list changes
  useEffect(() => {
    // Filter out community projects before saving to LS
    const communityIds = new Set(COMMUNITY_PROJECTS.map(p => p.id));
    const userProjects = savedProjects.filter(p => !communityIds.has(p.id));
    localStorage.setItem('myProjects', JSON.stringify(userProjects));
  }, [savedProjects]);

  const handleGenerate = async (selectedTopic: string) => {
    // Check if project already exists (case insensitive)
    const existing = savedProjects.find(p => p.title.toLowerCase() === selectedTopic.toLowerCase() || p.overview.toLowerCase().includes(selectedTopic.toLowerCase()));
    
    if (existing) {
       setProject(existing);
       setView('detail');
       return;
    }

    setLoading(true);
    setTopic(selectedTopic);
    setView('detail');
    setProject(null);
    
    try {
      const result = await generateProject(selectedTopic);
      const newProject = {
        ...result,
        id: Date.now().toString(),
        createdAt: Date.now()
      };
      setProject(newProject);
      setSavedProjects(prev => [newProject, ...prev]);
    } catch (e) {
      console.error(e);
      setView('list'); // Go back on error
    } finally {
      setLoading(false);
    }
  };

  const handleViewProject = (p: ProjectContent) => {
    setProject(p);
    setView('detail');
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Prevent deleting community projects
    if (COMMUNITY_PROJECTS.some(cp => cp.id === id)) {
      alert("You cannot delete community projects.");
      return;
    }

    if (confirm("Remove this project from your library?")) {
      setSavedProjects(prev => prev.filter(p => p.id !== id));
      if (project?.id === id) {
        setView('list');
        setProject(null);
      }
    }
  };

  if (view === 'detail') {
    return (
       <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fade-in pb-20">
          <button 
             onClick={() => setView('list')}
             className="inline-flex items-center text-sm font-bold text-light-subtext dark:text-dark-subtext mb-6 hover:text-primary-500 transition-colors"
          >
             <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Project Library
          </button>

          {loading && <LoadingSpinner />}
          
          {project && !loading && (
            <div className="bg-light-surface dark:bg-dark-surface rounded-[2rem] shadow-soft border border-light-border dark:border-dark-border overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="p-8 border-b border-light-border dark:border-dark-border">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-light-text dark:text-white mb-2">{project.title}</h2>
                    <p className="text-light-subtext dark:text-dark-subtext max-w-2xl text-sm leading-relaxed">{project.overview}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                    project.difficulty === 'Beginner' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300' :
                    project.difficulty === 'Intermediate' ? 'bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-300' :
                    'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-light-subtext dark:text-dark-subtext">
                   <div className="flex items-center bg-light-bg dark:bg-dark-bg px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border"><Zap className="w-3 h-3 mr-2 text-yellow-500"/> {project.estimatedTime}</div>
                </div>
              </div>

              {/* Prerequisites Card */}
              {project.prerequisites && project.prerequisites.length > 0 && (
                <div className="mx-8 mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
                  <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-4 flex items-center uppercase tracking-wider">
                    <Award className="w-4 h-4 mr-2" /> Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.prerequisites.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white dark:bg-blue-900/30 text-blue-600 dark:text-blue-200 text-xs font-bold border border-blue-100 dark:border-blue-800 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border bg-light-bg/50 dark:bg-dark-bg/30">
                  <h3 className="font-bold text-sm text-light-text dark:text-white mb-4 flex items-center uppercase tracking-wider">
                    <Box className="w-3 h-3 mr-2" /> Materials Needed
                  </h3>
                  <ul className="space-y-3">
                    {project.materials.map((m, i) => (
                      <li key={i} className="flex items-start text-xs text-light-text dark:text-dark-text group p-2.5 rounded-lg bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-sm">
                        <div className="w-4 h-4 rounded-full bg-primary-500/10 flex items-center justify-center mr-2 flex-shrink-0 text-primary-500 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                        </div>
                        <span className="font-medium">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 p-8">
                  <h3 className="font-bold text-sm text-light-text dark:text-white mb-6 uppercase tracking-wider">Build Instructions</h3>
                  <div className="space-y-8">
                    {project.steps.map((step, i) => (
                      <div key={i} className="relative pl-10 border-l-2 border-dashed border-light-border dark:border-dark-border pb-4 last:border-0 last:pb-0">
                        <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white dark:bg-dark-surface border-4 border-primary-500 shadow-sm flex items-center justify-center font-bold text-primary-600 dark:text-primary-400 z-10 text-xs">
                            {i + 1}
                        </div>
                        <h4 className="font-bold text-light-text dark:text-white mb-2 text-base">{step.stepTitle}</h4>
                        <div className="text-light-subtext dark:text-dark-subtext markdown-content bg-light-bg/50 dark:bg-dark-surfaceHighlight/30 p-4 rounded-xl text-sm">
                           <ReactMarkdown>{step.instruction}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
       </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fade-in flex flex-col min-h-full pb-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-light-text dark:text-white mb-3 tracking-tight">Project Workbench</h1>
        <p className="text-sm text-light-subtext dark:text-dark-subtext mb-8 font-light max-w-xl">
           Generate custom project guides or choose from your library.
        </p>
        
        {/* Generator Input */}
        <div className="relative group max-w-2xl mb-6">
          <input 
            type="text" 
            placeholder="Describe an idea (e.g., 'Automated cat feeder with Arduino')"
            className="w-full px-5 py-4 pl-12 pr-32 rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border focus:border-primary-500 dark:focus:border-primary-500 text-light-text dark:text-white shadow-soft outline-none transition-all text-base placeholder-gray-400"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && topic && handleGenerate(topic)}
          />
          <div className="absolute left-4 top-4 text-gray-400">
             <Search className="w-5 h-5" />
          </div>
          <button 
            onClick={() => topic && handleGenerate(topic)}
            disabled={loading || !topic}
            className="absolute right-2 top-2 bottom-2 px-5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center shadow-md text-sm"
          >
            {loading ? 'Thinking...' : 'Generate'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-12">
          {["Arduino Line Follower", "Smart Home Sensor", "Robotic Arm", "Auto Plant Waterer"].map(p => (
            <button
              key={p}
              onClick={() => handleGenerate(p)}
              disabled={loading}
              className="px-4 py-2 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-full text-xs font-medium hover:bg-primary-5 dark:hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-300 hover:border-primary-200 dark:hover:border-primary-500/30 transition-all shadow-sm flex items-center"
            >
              <Plus className="w-3 h-3 mr-1.5" /> {p}
            </button>
          ))}
        </div>

        {/* Saved Projects Library */}
        <h2 className="text-lg font-bold text-light-text dark:text-white mb-6 flex items-center">
           <Box className="w-5 h-5 mr-2" /> Your Project Library
        </h2>

        {savedProjects.length === 0 ? (
           <div className="text-center py-20 border-2 border-dashed border-light-border dark:border-dark-surfaceHighlight rounded-3xl">
              <div className="w-16 h-16 bg-light-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4 text-light-subtext dark:text-dark-subtext">
                 <Wrench className="w-8 h-8" />
              </div>
              <p className="text-sm text-light-subtext dark:text-dark-subtext font-medium">No projects yet. Generate one above!</p>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.map((p) => {
                 const isCommunity = COMMUNITY_PROJECTS.some(cp => cp.id === p.id);
                 return (
                 <div 
                   key={p.id}
                   onClick={() => handleViewProject(p)}
                   className="group bg-white dark:bg-dark-surface rounded-[1.5rem] p-6 border border-light-border dark:border-dark-border shadow-sm hover:shadow-card hover:border-blue-500/30 transition-all cursor-pointer relative"
                 >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       {!isCommunity && (
                       <button 
                         onClick={(e) => deleteProject(p.id!, e)}
                         className="p-2 bg-white dark:bg-dark-surfaceHighlight rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 text-gray-400 transition-colors shadow-sm border border-light-border dark:border-white/5"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                       )}
                       {isCommunity && (
                         <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                           <Award className="w-4 h-4" />
                         </div>
                       )}
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          p.difficulty === 'Beginner' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                          p.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                       }`}>
                          <Rocket className="w-5 h-5" />
                       </div>
                       <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-light-subtext dark:text-dark-subtext">{p.difficulty}</span>
                          <h3 className="font-bold text-light-text dark:text-white leading-tight line-clamp-1">{p.title}</h3>
                       </div>
                    </div>
                    
                    <p className="text-xs text-light-subtext dark:text-dark-subtext line-clamp-3 mb-6 leading-relaxed">
                       {p.overview}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-[10px] font-bold text-light-subtext dark:text-dark-subtext flex items-center">
                          <Zap className="w-3 h-3 mr-1" /> {p.estimatedTime}
                       </span>
                       <span className="text-xs font-bold text-primary-500 group-hover:underline">View Guide</span>
                    </div>
                 </div>
              )})}
           </div>
        )}
      </div>
    </div>
  );
};

const Playground = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your Engineering Tutor. I can help with circuit design, coding problems, or explain complex physics concepts. What's on your mind?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const replyText = await chatWithTutor(messages.map(m => ({role: m.role, text: m.text})), input);
    
    setMessages(prev => [...prev, { role: 'model', text: replyText, timestamp: Date.now() }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-4 md:p-6 max-w-4xl mx-auto">
       <div className="bg-light-surface dark:bg-black rounded-[2rem] shadow-soft border border-light-border dark:border-dark-border flex-1 flex flex-col overflow-hidden relative">
         
         {/* iOS Header */}
         <div className="p-3 border-b border-light-border dark:border-dark-surfaceHighlight bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl absolute top-0 w-full z-10 flex flex-col items-center">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 mb-1 flex items-center justify-center">
                 <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-300" />
             </div>
             <div className="flex flex-col items-center">
               <h2 className="font-semibold text-light-text dark:text-white text-xs">Engineering Tutor</h2>
               <span className="text-[9px] text-light-subtext dark:text-dark-subtext font-medium">Gemini 2.5 Flash</span>
             </div>
         </div>
         
         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto px-4 pt-24 pb-6 space-y-2 bg-light-surface dark:bg-black">
            {messages.map((m, i) => {
              const isUser = m.role === 'user';
              return (
                <div key={i} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 shadow-sm text-sm leading-relaxed break-words ${
                    isUser 
                      ? 'bg-blue-500 text-white rounded-[18px] rounded-br-none' 
                      : 'bg-[#E9E9EB] text-black dark:bg-[#262628] dark:text-white rounded-[18px] rounded-bl-none'
                  }`}>
                     <div className="markdown-content text-sm">
                        <ReactMarkdown>{m.text}</ReactMarkdown>
                     </div>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#E9E9EB] dark:bg-[#262628] rounded-[18px] rounded-bl-none px-4 py-3 flex space-x-1 items-center h-9">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
         </div>

         {/* Input Area */}
         <div className="p-3 bg-light-bg dark:bg-dark-surfaceHighlight/50 backdrop-blur-md border-t border-light-border dark:border-dark-surfaceHighlight">
            <div className="flex items-end space-x-2">
              <div className="flex-1 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-[20px] px-4 py-2 min-h-[40px] flex items-center shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent border-none focus:outline-none text-light-text dark:text-white placeholder-gray-400 text-sm"
                  />
              </div>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    input.trim() ? 'bg-blue-500 text-white hover:bg-blue-600 scale-100' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 scale-90'
                }`}
              >
                <ChevronRight className="w-5 h-5 ml-0.5 font-bold" strokeWidth={3} />
              </button>
            </div>
         </div>
       </div>
    </div>
  );
};

// --- Main Layout & Routing ---

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <MemoryRouter>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 font-sans selection:bg-primary-500 selection:text-white">
        
        {/* Top Navigation - Glassmorphism */}
        <nav className="fixed top-0 w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-light-border dark:border-white/5 z-40 h-16 px-6 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-light-subtext hover:bg-light-bg dark:hover:bg-dark-surfaceHighlight rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex p-2 text-light-subtext hover:text-primary-500 transition-colors mr-2">
                <PanelLeft className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-light-text dark:text-white">RoboAcademy</span>
            </Link>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-light-bg dark:bg-dark-surfaceHighlight text-light-subtext dark:text-dark-subtext hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full bg-light-surface/90 dark:bg-black/90 backdrop-blur-2xl border-r border-light-border dark:border-white/5 transform transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-30 pt-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64`}>
          <div className="p-4 space-y-1.5 h-full overflow-y-auto overflow-x-hidden">
            <SidebarContent collapsed={isCollapsed} />
          </div>
        </aside>

        {/* Main Content */}
        <main className={`pt-20 min-h-screen transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learn/:lessonId" element={<LessonPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/projects/drone-build" element={<DroneProject />} />
              <Route path="/circuit-lab" element={<CircuitLab />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/reference/components" element={<ComponentGuide />} />
              <Route path="/reference/safety" element={<SafetyManual />} />
            </Routes>
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          />
        )}
      </div>
    </MemoryRouter>
  );
};

// Helper for router hooks
const SidebarContent = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className={`px-4 py-2 text-[10px] font-bold text-light-subtext dark:text-dark-subtext uppercase tracking-widest opacity-60 transition-opacity duration-200 ${collapsed ? 'md:opacity-0 md:h-0 overflow-hidden' : ''}`}>Menu</div>
      <SidebarItem 
        to="/" 
        icon={BookOpen} 
        label="Curriculum" 
        active={path === '/' || path.includes('/learn/')} 
        collapsed={collapsed}
      />
      <SidebarItem 
        to="/projects" 
        icon={Wrench} 
        label="Projects" 
        active={path === '/projects' || path.includes('/projects/')} 
        collapsed={collapsed}
      />
      <SidebarItem 
        to="/circuit-lab" 
        icon={Activity} 
        label="Circuit Lab" 
        active={path === '/circuit-lab'} 
        collapsed={collapsed}
      />
      <SidebarItem 
        to="/playground" 
        icon={MessageSquare} 
        label="Tutor AI" 
        active={path === '/playground'} 
        collapsed={collapsed}
      />

      <div className={`mt-4 px-4 py-2 text-[10px] font-bold text-light-subtext dark:text-dark-subtext uppercase tracking-widest opacity-60 transition-opacity duration-200 ${collapsed ? 'md:opacity-0 md:h-0 overflow-hidden' : ''}`}>Reference</div>
      <SidebarItem 
        to="/reference/components" 
        icon={List} 
        label="Component Guide" 
        active={path === '/reference/components'} 
        collapsed={collapsed}
      />
      <SidebarItem 
        to="/reference/safety" 
        icon={ShieldAlert} 
        label="Safety Manual" 
        active={path === '/reference/safety'} 
        collapsed={collapsed}
      />
      
      <div className={`mt-auto pt-8 px-4 transition-opacity duration-200 ${collapsed ? 'md:opacity-0 md:hidden' : ''}`}>
        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 text-white">
          <h4 className="font-bold text-xs mb-1">Pro Tip</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed">Use the Circuit Lab to visualize Ohm's Law in real-time.</p>
        </div>
      </div>
    </>
  );
};

export default App;
