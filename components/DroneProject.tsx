import React from 'react';
import { Rocket, Box, Cpu, Wind, Radio, Zap, CheckCircle, Wifi, Fan, Activity, Battery, ChevronRight } from './Icons';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const DroneProject = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
      
      <Link to="/projects" className="inline-flex items-center text-sm font-bold text-light-subtext dark:text-dark-subtext mb-6 hover:text-primary-500 transition-colors">
         <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Projects
      </Link>

      {/* Header Hero */}
      <div className="relative rounded-[3rem] overflow-hidden bg-black text-white mb-10 shadow-2xl h-[500px] group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        
        <div className="relative z-20 p-8 md:p-16 flex flex-col justify-end h-full">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit border border-white/10">
            <Rocket className="w-3 h-3" />
            <span>Masterclass</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-none">Build a <br/>Quadcopter.</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed mb-8">
            From loose parts to first flight. The ultimate guide to FPV drone engineering.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <div className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex items-center space-x-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Difficulty</div>
                <div className="font-semibold text-sm">Advanced</div>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex items-center space-x-3">
              <Activity className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Time</div>
                <div className="font-semibold text-sm">8 Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 relative">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-12">
          
          {/* Section 1: Theory */}
          <section className="bg-white dark:bg-dark-surface p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-light-border dark:border-dark-border">
            <h2 className="text-3xl font-bold text-light-text dark:text-white mb-6 flex items-center tracking-tight">
              How it Flies
            </h2>
            <div className="prose prose-lg dark:prose-invert text-light-subtext dark:text-dark-subtext">
              <p>
                Quadcopter flight relies on the precise differential thrust of four motors. 
                By manipulating the speed of individual motors, the flight controller can induce Pitch, Roll, and Yaw moments.
                Understanding PID loops (Proportional, Integral, Derivative) is key to tuning the drone for stable flight.
              </p>
            </div>
          </section>

          {/* Section 2: Build Steps */}
          <section>
            <h2 className="text-3xl font-bold text-light-text dark:text-white mb-8 px-4">Assembly Guide</h2>
            <div className="space-y-4">
            {[
              {
                title: "Frame Assembly",
                content: "Start by assembling the carbon fiber skeleton. Use blue Loctite on all frame screws to prevent vibrations from loosening them mid-flight. Ensure the arms are tightly sandwiched between the bottom plates."
              },
              {
                title: "Mounting Components",
                content: "Install the motors on the arms using 4 screws each. Mount the ESC/FC stack in the center, ensuring the arrow on the board points to the front of the frame. Use soft mounting gummies to dampen vibrations."
              },
              {
                title: "Soldering",
                content: "This is the critical part. Pre-tin all pads and wires. Solder motor wires to the ESC pads (order doesn't matter for brushless, we can reverse later). Solder the XT60 power pigtail with capacitor. Connect your Receiver (RX) and VTX to the Flight Controller UARTs."
              },
              {
                title: "Configuration",
                content: "Connect to Betaflight Configurator. Calibrate the accelerometer on a flat surface. Set up your Ports tab for Serial RX. Verify motor direction in the Motors tab (props off!). Set up your Modes (Arm, Angle, Horizon) on your radio transmitter."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface p-8 rounded-[2rem] border border-light-border dark:border-dark-border shadow-sm flex gap-6 group hover:border-primary-500/30 transition-colors">
                 <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-light-bg dark:bg-dark-surfaceHighlight flex items-center justify-center font-bold text-xl text-primary-500 border border-light-border dark:border-white/5">
                        {idx + 1}
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-white mb-3">{step.title}</h3>
                    <p className="text-light-subtext dark:text-dark-subtext leading-relaxed text-lg">
                      {step.content}
                    </p>
                 </div>
              </div>
            ))}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar Info */}
        <div className="lg:w-96 flex-shrink-0">
           <div className="sticky top-24 space-y-8">
              
              {/* Materials List */}
              <div className="bg-white dark:bg-dark-surface rounded-[2.5rem] p-8 border border-light-border dark:border-dark-border shadow-soft">
                <h3 className="font-bold text-xl text-light-text dark:text-white mb-6 flex items-center">
                    <Box className="w-5 h-5 mr-2" />
                    Bill of Materials
                </h3>
                <div className="space-y-4">
                   {[
                     { name: "Frame", desc: "5-inch Carbon Fiber", icon: Box },
                     { name: "Flight Controller", desc: "F7 Processor", icon: Cpu },
                     { name: "Motors", desc: "2306 2450KV Brushless", icon: Fan },
                     { name: "ESC", desc: "4-in-1 45A BLHeli_32", icon: Zap },
                     { name: "Battery", desc: "4S 1500mAh 100C LiPo", icon: Battery },
                     { name: "Radio System", desc: "ELRS or TBS Crossfire", icon: Radio },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center p-3 rounded-xl hover:bg-light-bg dark:hover:bg-dark-surfaceHighlight transition-colors group cursor-default">
                       <div className="w-10 h-10 rounded-lg bg-light-surface dark:bg-black border border-light-border dark:border-white/5 flex items-center justify-center text-primary-500 mr-3">
                         <item.icon className="w-5 h-5" />
                       </div>
                       <div>
                         <div className="font-bold text-sm text-light-text dark:text-white leading-tight">{item.name}</div>
                         <div className="text-[10px] text-light-subtext dark:text-dark-subtext uppercase tracking-wider font-semibold">{item.desc}</div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Safety Warning */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity size={100} />
                </div>
                <h3 className="font-bold text-xl mb-4 relative z-10">Safety Check</h3>
                <p className="text-indigo-100 mb-6 leading-relaxed text-sm relative z-10">
                  Drones are high-power machines. Always remove props when on the workbench.
                </p>
                <ul className="space-y-3 font-medium text-sm relative z-10">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-green-300" /> Remove props on bench</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-green-300" /> Use a smoke stopper</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-green-300" /> Fly in open fields</li>
                </ul>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default DroneProject;