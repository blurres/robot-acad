
import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Zap, Activity, Box, Triangle, Sliders, Waves, Share2, Lightbulb, Battery, Cpu, BrainCircuit, CheckCircle, XCircle, RotateCw, Award, ArrowRight } from './Icons';

interface CompDef {
  name: string;
  icon: any;
  color: string;
  symbol: React.ReactNode;
  desc: string;
  uses: string[];
}

const COMPONENTS: CompDef[] = [
  {
    name: "Resistor",
    icon: Waves,
    color: "text-orange-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M0 10 L5 10 L7.5 5 L12.5 15 L17.5 5 L22.5 15 L27.5 5 L32.5 15 L35 10 L40 10" />
      </svg>
    ),
    desc: "Resists the flow of electrical current. Think of it as a kink in a water hose.",
    uses: ["Limiting current to LEDs", "Voltage Dividers", "Pull-up/Pull-down"]
  },
  {
    name: "Capacitor",
    icon: Box,
    color: "text-purple-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M0 10 L16 10 M24 10 L40 10 M16 2 L16 18 M24 2 L24 18" />
      </svg>
    ),
    desc: "Stores and releases electrical energy quickly. Acts like a tiny temporary battery.",
    uses: ["Smoothing voltage supply", "Filtering noise", "Timing circuits"]
  },
  {
    name: "Diode",
    icon: Triangle,
    color: "text-gray-400",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M0 10 L15 10 M25 10 L40 10 M25 2 L25 18 M15 2 L15 18 L25 10 L15 2" />
      </svg>
    ),
    desc: "A one-way valve for electricity. Allows current to flow in only one direction.",
    uses: ["Protecting against reverse polarity", "Converting AC to DC (Rectifier)", "Flyback protection"]
  },
  {
    name: "LED",
    icon: Lightbulb,
    color: "text-red-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M5 10 L15 10 M25 10 L35 10 M25 2 L25 18 M15 2 L15 18 L25 10 L15 2" />
        <path d="M28 4 L32 0 M30 7 L34 3" strokeWidth="1.5" />
      </svg>
    ),
    desc: "Light Emitting Diode. Produces light when current flows through it.",
    uses: ["Indicators", "Lighting", "Sensors (IR)"]
  },
  {
    name: "Transistor (BJT)",
    icon: Share2,
    color: "text-blue-500",
    symbol: (
      <svg viewBox="0 0 40 40" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <circle cx="20" cy="20" r="18" className="opacity-20" />
        <path d="M20 10 L20 20 L35 12 M20 20 L20 30 M12 20 L20 20 M35 28 L20 20" />
        <path d="M30 29 L35 28 L34 23" /> 
      </svg>
    ),
    desc: "An electronic switch or amplifier. A small current at the Base controls a large current.",
    uses: ["Switching motors", "Amplifying signals", "Logic gates"]
  },
  {
    name: "Battery",
    icon: Battery,
    color: "text-green-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M0 10 L16 10 M24 10 L40 10 M16 5 L16 15 M24 2 L24 18" />
        <text x="5" y="5" fontSize="8" className="fill-current stroke-none">+</text>
      </svg>
    ),
    desc: "Provides the voltage potential to push electrons through the circuit.",
    uses: ["Power source", "Reference voltage"]
  },
  {
    name: "Inductor",
    icon: Activity,
    color: "text-pink-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <path d="M0 10 L5 10 Q10 0 15 10 Q20 0 25 10 Q30 0 35 10 L40 10" />
      </svg>
    ),
    desc: "Resists changes in current flow. Stores energy in a magnetic field.",
    uses: ["Filtering", "Transformers", "Boost converters"]
  },
  {
    name: "Potentiometer",
    icon: Sliders,
    color: "text-yellow-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
         <path d="M0 10 L5 10 L7.5 5 L12.5 15 L17.5 5 L22.5 15 L27.5 5 L32.5 15 L35 10 L40 10" />
         <path d="M20 18 L16 14 L24 14 Z" fill="currentColor" className="stroke-none" />
      </svg>
    ),
    desc: "A resistor with a variable value. The knob moves a wiper along the resistive track.",
    uses: ["Volume knobs", "Angle sensors", "Tuning"]
  },
  {
    name: "Microcontroller",
    icon: Cpu,
    color: "text-indigo-500",
    symbol: (
      <svg viewBox="0 0 40 20" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
        <rect x="5" y="2" width="30" height="16" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="2" y1="5" x2="5" y2="5" />
        <line x1="2" y1="10" x2="5" y2="10" />
        <line x1="2" y1="15" x2="5" y2="15" />
        <line x1="35" y1="5" x2="38" y2="5" />
        <line x1="35" y1="10" x2="38" y2="10" />
        <line x1="35" y1="15" x2="38" y2="15" />
      </svg>
    ),
    desc: "A small computer on a chip. It reads inputs, runs code, and controls outputs.",
    uses: ["Robot brain", "Home automation", "Data logging"]
  }
];

interface QuizQuestion {
  type: 'symbol' | 'desc' | 'use';
  content: React.ReactNode | string;
  correctAnswer: string;
  options: string[];
}

const ComponentGuide = () => {
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState<'guide' | 'quiz'>('guide');
  
  // Quiz State
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const filtered = COMPONENTS.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) || 
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const generateQuestion = () => {
    const targetIdx = Math.floor(Math.random() * COMPONENTS.length);
    const target = COMPONENTS[targetIdx];
    
    // Pick 3 distractors
    const distractors = COMPONENTS.filter(c => c.name !== target.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(c => c.name);
    
    const options = [...distractors, target.name].sort(() => 0.5 - Math.random());
    
    // Randomize question type
    const types: ('symbol' | 'desc' | 'use')[] = ['symbol', 'desc', 'use'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let content: React.ReactNode | string = '';
    
    if (type === 'symbol') {
      content = target.symbol;
    } else if (type === 'desc') {
      content = target.desc;
    } else {
      content = target.uses[Math.floor(Math.random() * target.uses.length)];
    }

    setQuestion({
      type,
      content,
      correctAnswer: target.name,
      options
    });
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption || !question) return;
    setSelectedOption(option);
    
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10 + (streak * 2));
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  useEffect(() => {
    if (mode === 'quiz' && !question) {
      generateQuestion();
    }
  }, [mode]);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fade-in pb-20 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-light-text dark:text-white mb-2">Component Encyclopedia</h1>
           <p className="text-light-subtext dark:text-dark-subtext">Master the building blocks of electronics.</p>
        </div>
        
        <div className="flex bg-light-surface dark:bg-dark-surface p-1 rounded-xl border border-light-border dark:border-dark-border shadow-sm">
           <button 
             onClick={() => setMode('guide')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'guide' ? 'bg-primary-500 text-white shadow-md' : 'text-light-subtext hover:text-light-text dark:text-dark-subtext dark:hover:text-white'}`}
           >
             Reference
           </button>
           <button 
             onClick={() => { setMode('quiz'); if(!question) generateQuestion(); }}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center ${mode === 'quiz' ? 'bg-primary-500 text-white shadow-md' : 'text-light-subtext hover:text-light-text dark:text-dark-subtext dark:hover:text-white'}`}
           >
             <BrainCircuit className="w-4 h-4 mr-2" />
             Practice
           </button>
        </div>
      </div>

      {mode === 'guide' ? (
        <>
          <div className="relative max-w-xl mb-8">
             <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
             <input 
                type="text"
                placeholder="Search components (e.g., 'Resistor', 'Switch')..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((comp, i) => (
              <div key={i} className="bg-white dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border shadow-soft overflow-hidden group hover:border-primary-500/50 transition-all">
                
                <div className="p-6 border-b border-light-border dark:border-dark-surfaceHighlight flex justify-between items-start bg-light-bg/50 dark:bg-black/20">
                   <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-white dark:bg-dark-surfaceHighlight flex items-center justify-center shadow-sm ${comp.color}`}>
                         <comp.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-light-text dark:text-white">{comp.name}</h3>
                      </div>
                   </div>
                   {/* Schematic Symbol Display */}
                   <div className="h-10 w-20 px-2 flex items-center justify-center text-light-text dark:text-white opacity-70" title="Schematic Symbol">
                      {comp.symbol}
                   </div>
                </div>

                <div className="p-6">
                   <p className="text-sm text-light-text dark:text-dark-subtext leading-relaxed mb-6 h-12">
                      {comp.desc}
                   </p>

                   <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center">
                         <Zap className="w-3 h-3 mr-1" /> Common Uses
                      </h4>
                      <ul className="space-y-2">
                         {comp.uses.map((u, idx) => (
                            <li key={idx} className="flex items-center text-xs font-medium text-light-text dark:text-gray-300">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></div>
                               {u}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // --- QUIZ MODE ---
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full animate-fade-in">
           
           {/* Score Header */}
           <div className="w-full flex justify-between items-center mb-8 px-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-dark-surface px-4 py-2 rounded-full border border-light-border dark:border-dark-border shadow-sm">
                 <Award className="w-5 h-5 text-yellow-500" />
                 <span className="font-bold text-light-text dark:text-white">{score} XP</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-dark-surface px-4 py-2 rounded-full border border-light-border dark:border-dark-border shadow-sm">
                 <Activity className="w-5 h-5 text-green-500" />
                 <span className="font-bold text-light-text dark:text-white">Streak: {streak}</span>
              </div>
           </div>

           {question && (
             <div className="w-full bg-white dark:bg-dark-surface rounded-[2rem] shadow-2xl border border-light-border dark:border-dark-border overflow-hidden">
                <div className="p-10 text-center border-b border-light-border dark:border-dark-border bg-light-bg/50 dark:bg-black/20 min-h-[250px] flex flex-col items-center justify-center relative">
                   
                   <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-6">
                      {question.type === 'symbol' ? 'Identify the Symbol' : question.type === 'desc' ? 'Identify the Component' : 'What is this used for?'}
                   </span>

                   {question.type === 'symbol' ? (
                      <div className="w-48 h-32 text-light-text dark:text-white">
                         {question.content}
                      </div>
                   ) : (
                      <h2 className="text-2xl font-bold text-light-text dark:text-white leading-tight">
                        "{question.content}"
                      </h2>
                   )}
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                   {question.options.map((opt, i) => {
                      const isSelected = selectedOption === opt;
                      const isCorrectAnswer = opt === question.correctAnswer;
                      const showResult = selectedOption !== null;
                      
                      let styleClass = "border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10";
                      
                      if (showResult) {
                         if (isSelected && isCorrectAnswer) styleClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                         else if (isSelected && !isCorrectAnswer) styleClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                         else if (isCorrectAnswer) styleClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 opacity-70";
                         else styleClass = "opacity-40 border-transparent";
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          disabled={showResult}
                          className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${styleClass}`}
                        >
                           <span>{opt}</span>
                           {showResult && isSelected && (isCorrectAnswer ? <CheckCircle className="w-5 h-5 text-green-500"/> : <XCircle className="w-5 h-5 text-red-500"/>)}
                        </button>
                      )
                   })}
                </div>

                {selectedOption && (
                   <div className="p-6 bg-light-bg dark:bg-dark-surfaceHighlight border-t border-light-border dark:border-dark-border flex justify-center">
                      <button 
                        onClick={generateQuestion}
                        className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold shadow-lg flex items-center transition-transform hover:scale-105"
                      >
                         Next Question <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                   </div>
                )}
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default ComponentGuide;
