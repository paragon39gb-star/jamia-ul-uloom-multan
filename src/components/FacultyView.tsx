import React from 'react';
import { Language } from '../types';
import { FACULTY_DATA } from '../constants';

export default function FacultyView({ lang }: { lang: Language }) {
  const isUrdu = lang === 'ur';
  return (
    <div className="bg-white p-10 md:p-14 border border-stone-200 shadow-sm">
       <h2 className={`text-4xl font-black mb-14 text-stone-800 ${isUrdu ? 'urdu-text text-right' : ''}`}>
          {isUrdu ? 'اساتذہ کرام کی مکمل فہرست' : 'Complete Faculty Directory'}
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY_DATA.map(f => (
            <div key={f.id} className={`p-8 border hover:bg-stone-50 transition-all group ${isUrdu ? 'text-right' : ''}`}>
               <span className="text-[10px] text-stone-300 font-mono">CODE: {f.id.toString().padStart(2,'0')}</span>
               <h4 className={`text-2xl font-bold mt-2 group-hover:text-emerald-700 transition-colors ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? f.ur : f.name}
               </h4>
               <p className={`text-emerald-600 font-semibold mb-4 mt-2 ${isUrdu ? 'urdu-text text-lg' : ''}`}>
                  {isUrdu ? f.urRole : f.role}
               </p>
               <div className="h-[1px] w-full bg-stone-100 mb-4" />
               <p className={`text-[11px] uppercase font-black tracking-widest text-stone-400 ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? f.urDegree : f.degree}
               </p>
            </div>
          ))}
       </div>
    </div>
  );
}
