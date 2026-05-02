import React from 'react';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import { Language, View, User } from '../types';
import { CONTENT } from '../constants';

interface NavigationProps {
  lang: Language;
  setLang: (l: Language) => void;
  view: View;
  setView: (v: View) => void;
  currentUser: User | null;
}

export default function Navigation({ lang, setLang, view, setView, currentUser }: NavigationProps) {
  const isUrdu = lang === 'ur';
  
  const navItems = { ...CONTENT[lang].nav };
  if (currentUser) {
    delete navItems.Login;
    navItems.Portal = isUrdu ? 'پورٹل' : 'Portal';
  }

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-emerald-900 text-white py-2 border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Phone size={12} /> +92 300 735 4393</span>
            <span className="flex items-center gap-1"><Mail size={12} /> info@jamiaululoom.edu.pk</span>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com/jamiaululoommultan" target="_blank" className="hover:text-emerald-400 transition-colors">Facebook</a>
            <a href="https://youtube.com/@jamiaululoommultan" target="_blank" className="hover:text-emerald-400 transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col lg:flex-row items-center py-6 gap-8 ${isUrdu ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-6 cursor-pointer ${isUrdu ? 'flex-row-reverse' : ''}`} onClick={() => setView('Home')}>
              <img src="input_file_23.png" className="w-24 md:w-32 h-auto" referrerPolicy="no-referrer" />
              <div className={isUrdu ? 'text-right' : ''}>
                <h1 className={`text-3xl md:text-5xl font-black text-stone-900 tracking-tight leading-none ${isUrdu ? 'urdu-text' : ''}`}>
                  {CONTENT[lang].title}
                </h1>
                <p className="text-[10px] md:text-sm font-bold text-emerald-700 uppercase tracking-[0.4em] mt-1">{CONTENT[lang].subtitle}</p>
              </div>
            </div>

            <div className="flex-1" />

            {/* Desktop Nav */}
            <nav className={`flex flex-wrap items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              {Object.keys(navItems).map(key => (
                <button 
                  key={key} 
                  onClick={() => setView(key as View)}
                  className={`px-4 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                    view === key 
                    ? 'bg-emerald-700 text-white shadow-lg' 
                    : 'text-stone-500 hover:bg-stone-50 hover:text-emerald-700'
                  } ${isUrdu ? 'urdu-text text-sm' : ''}`}
                >
                  {navItems[key]}
                </button>
              ))}
              <button 
                onClick={() => setLang(isUrdu ? 'en' : 'ur')} 
                className="ml-4 px-4 py-2 border-2 border-emerald-700 text-emerald-700 rounded-lg text-xs font-black hover:bg-emerald-700 hover:text-white transition-all"
              >
                {isUrdu ? 'English' : 'اردو'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner / Marquee */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-3 overflow-hidden whitespace-nowrap">
        <div className="flex gap-20 animate-marquee text-xs font-bold text-emerald-800 uppercase tracking-widest">
          <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'نئے تعلیمی سال کے داخلے شروع ہیں - تفصیلات کے لیے رابطہ کریں۔' : 'Admissions Open for Academic Year 2026 - Apply Online Now!'}</span>
          <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'سالانہ امتحانات کے نتائج کا اعلان کر دیا گیا ہے۔' : 'Annual Examination Results have been announced.'}</span>
          <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'تجوید القرآن شارٹ کورس - برائے خواتین و حضرات۔' : 'Tajweed-ul-Quran Short Course - Admissions Open.'}</span>
        </div>
      </div>
    </>
  );
}
