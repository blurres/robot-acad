import React from 'react';
import { ShieldAlert, Zap, AlertTriangle, Eye, Flame, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SafetyManual = () => {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto animate-fade-in pb-20">
      
      <div className="mb-8 p-6 rounded-3xl bg-red-600 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-2 flex items-center">
               <ShieldAlert className="w-8 h-8 mr-3" /> Laboratory Safety Manual
            </h1>
            <p className="text-red-100 opacity-90 max-w-xl">
               Electronics is fun, but electricity is real. Read these rules before building your first circuit.
               Safety is not an accident—it's a habit.
            </p>
         </div>
         <ShieldAlert className="absolute -right-6 -bottom-6 w-48 h-48 text-red-900 opacity-20 rotate-12" />
      </div>

      <div className="grid gap-8">
         
         {/* 1. Electrical Safety */}
         <section className="bg-white dark:bg-dark-surface rounded-2xl p-8 border border-light-border dark:border-dark-border shadow-soft">
            <h2 className="text-2xl font-bold text-light-text dark:text-white mb-6 flex items-center text-yellow-600 dark:text-yellow-500">
               <Zap className="w-6 h-6 mr-2" /> Electrical Hazards
            </h2>
            <div className="space-y-4 text-light-subtext dark:text-dark-subtext leading-relaxed">
               <p>
                  Most hobby electronics (Arduino, 5V, 9V, 12V) are considered "Low Voltage" and are generally safe from shock. 
                  However, simple mistakes can still cause heat, fire, or damage.
               </p>
               <ul className="grid gap-3 mt-4">
                  <li className="flex items-start bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                     <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                     <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        <strong>The Short Circuit:</strong> Never connect Positive (+) directly to Negative (-) without a load (like a light or motor). The wire will become a heater and melt insulation instantly.
                     </span>
                  </li>
                  <li className="flex items-start bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                     <Zap className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                     <span className="text-sm font-medium text-red-900 dark:text-red-100">
                        <strong>Mains Voltage (110V/220V):</strong> Never touch wall outlets or disassemble power supplies unless you are a trained professional. This voltage can kill.
                     </span>
                  </li>
               </ul>
            </div>
         </section>

         {/* 2. Battery Safety */}
         <section className="bg-white dark:bg-dark-surface rounded-2xl p-8 border border-light-border dark:border-dark-border shadow-soft">
            <h2 className="text-2xl font-bold text-light-text dark:text-white mb-6 flex items-center text-orange-600 dark:text-orange-500">
               <Flame className="w-6 h-6 mr-2" /> LiPo Battery Safety
            </h2>
            <div className="text-light-subtext dark:text-dark-subtext space-y-4">
               <p>
                  Lithium Polymer (LiPo) batteries are used in drones and robots. They pack immense energy density but are chemically volatile.
               </p>
               <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border border-light-border dark:border-dark-border rounded-xl">
                     <h3 className="font-bold text-light-text dark:text-white mb-2">DO</h3>
                     <ul className="text-sm space-y-2 list-disc list-inside">
                        <li>Charge inside a fireproof bag.</li>
                        <li>Store at "Storage Voltage" (3.8V per cell).</li>
                        <li>Inspect for "puffing" (swelling) before use.</li>
                     </ul>
                  </div>
                  <div className="p-4 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl">
                     <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">DON'T</h3>
                     <ul className="text-sm space-y-2 list-disc list-inside text-red-800 dark:text-red-200">
                        <li>Never leave charging unattended.</li>
                        <li>Never puncture a battery (it will explode).</li>
                        <li>Never discharge below 3.0V per cell.</li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Soldering Safety */}
         <section className="bg-white dark:bg-dark-surface rounded-2xl p-8 border border-light-border dark:border-dark-border shadow-soft">
            <h2 className="text-2xl font-bold text-light-text dark:text-white mb-6 flex items-center text-blue-600 dark:text-blue-500">
               <Eye className="w-6 h-6 mr-2" /> Soldering & Tools
            </h2>
            <div className="text-light-subtext dark:text-dark-subtext space-y-4">
               <p>
                  Soldering irons reach temperatures of 350°C - 450°C. That is hot enough to melt skin instantly.
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center">
                     <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                     <span>Always wear <strong>Safety Glasses</strong>. Molten solder can spit.</span>
                  </li>
                  <li className="flex items-center">
                     <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                     <span>Work in a ventilated area. Solder fumes (flux) are bad for lungs.</span>
                  </li>
                  <li className="flex items-center">
                     <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                     <span>Wash your hands after handling solder (especially leaded solder).</span>
                  </li>
               </ul>
            </div>
         </section>

         <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-primary-500/30">
               I Understand, Let's Build! <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
         </div>

      </div>
    </div>
  );
};

export default SafetyManual;