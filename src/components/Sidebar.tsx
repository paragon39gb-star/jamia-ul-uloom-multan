import React from 'react';
import { Search, GraduationCap, Facebook, Youtube } from 'lucide-react';
import { Language } from '../types';

const sidebarItems = {
  en: { search: "Search", recent: "Recent Posts", categories: "Categories", meta: "Admin Links" },
  ur: { search: "تلاش کریں", recent: "تازہ ترین خبریں", categories: "زمرہ جات", meta: "انتظامی امور" }
};

export default function Sidebar({ lang }: { lang: Language }) {
  const isUrdu = lang === 'ur';
  const text = sidebarItems[lang];

  return (
    <aside className={`w-full lg:w-80 space-y-10 ${isUrdu ? 'text-right' : ''}`}>
      <div className="bg-white p-6 shadow-sm border border-stone-200">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">{text.search}</h4>
        <div className="flex border p-2 bg-stone-50">
          <input type="text" className="w-full bg-transparent outline-none text-sm" placeholder="..." />
          <Search size={16} className="text-stone-400" />
        </div>
      </div>

      <div className="bg-white shadow-sm border border-stone-200">
        <div className="bg-stone-50 border-b p-4">
           <h4 className={`font-bold ${isUrdu ? 'urdu-text' : 'uppercase text-xs tracking-widest text-stone-500'}`}>{text.recent}</h4>
        </div>
        <div className={`p-5 space-y-4 ${isUrdu ? 'urdu-text' : 'text-sm'}`}>
           <a href="#" className="block hover:text-emerald-700 transition-colors">Welcome to Jame ul Uloom!</a>
           <a href="#" className="block hover:text-emerald-700 transition-colors">Admissions 2026 Open</a>
           <a href="#" className="block hover:text-emerald-700 transition-colors">New IT Lab Inauguration</a>
        </div>
      </div>

      <div className="bg-emerald-800 p-8 text-white rounded-xl shadow-xl relative overflow-hidden group">
         <div className="absolute -top-4 -right-4 opacity-10 group-hover:scale-110 transition-transform"><GraduationCap size={150} /></div>
         <h4 className={`text-3xl font-black mb-4 ${isUrdu ? 'urdu-text' : ''}`}>3,500+</h4>
         <p className={`text-emerald-300 font-bold ${isUrdu ? 'urdu-text' : 'uppercase text-[10px] tracking-widest'}`}>{isUrdu ? 'کل طلباء' : 'Total Students'}</p>
      </div>

      <div className="bg-white p-6 shadow-sm border border-stone-200">
        <h4 className={`text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 border-b pb-2 ${isUrdu ? 'urdu-text text-lg text-right' : ''}`}>
          {isUrdu ? 'ہمیں فالو کریں' : 'Follow Us'}
        </h4>
        <div className="flex gap-4">
           <a href="https://facebook.com/jamiaululoommultan" target="_blank" rel="noopener noreferrer" className="flex-1 bg-stone-50 border p-3 flex flex-col items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
              <Facebook size={20} className="text-stone-400 group-hover:text-emerald-600" />
              <span className={`text-[10px] font-black uppercase tracking-tighter text-stone-400 group-hover:text-emerald-700 ${isUrdu ? 'urdu-text' : ''}`}>Facebook</span>
           </a>
           <a href="https://youtube.com/@jamiaululoommultan" target="_blank" rel="noopener noreferrer" className="flex-1 bg-stone-50 border p-3 flex flex-col items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
              <Youtube size={20} className="text-stone-400 group-hover:text-emerald-600" />
              <span className={`text-[10px] font-black uppercase tracking-tighter text-stone-400 group-hover:text-emerald-700 ${isUrdu ? 'urdu-text' : ''}`}>YouTube</span>
           </a>
        </div>
      </div>
    </aside>
  );
}
