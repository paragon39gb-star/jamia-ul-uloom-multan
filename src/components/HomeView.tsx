import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Youtube, Facebook, Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { Language, View } from '../types';
import { CONTENT, ANNOUNCEMENTS } from '../constants';
import Sidebar from './Sidebar';

export default function HomeView({ lang, setView }: { lang: Language, setView: (v: View) => void }) {
  const isUrdu = lang === 'ur';
  return (
    <div className={`flex flex-col lg:flex-row gap-12 ${isUrdu ? 'lg:flex-row-reverse' : ''}`}>
       <div className="flex-1 space-y-16">
          {/* Main Hero Article */}
          <article className="bg-white p-10 md:p-14 border border-stone-200 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-700" />
             <h2 className={`text-3xl md:text-5xl font-black text-stone-900 mb-8 pb-3 border-b-4 border-emerald-50 w-fit ${isUrdu ? 'urdu-text' : ''}`}>
                {isUrdu ? "مرحبا بكم في جامع العلوم!" : "Welcome to Jame ul Uloom!"}
             </h2>
             <div className="relative overflow-hidden rounded-xl mb-10 shadow-2xl">
                <img src="input_file_16.png" className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
             </div>
             <p className={`text-xl text-stone-700 leading-relaxed mb-8 ${isUrdu ? 'urdu-text text-2xl text-justify' : ''}`}>
                {CONTENT[lang].intro.p1}
             </p>
             <button onClick={() => setView('About')} className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-800 flex items-center gap-3 group transition-all shadow-lg shadow-emerald-900/10">
                {isUrdu ? "مزید پڑھیں" : "Read More"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </article>

          {/* Social Hub Section */}
          <section className="bg-stone-50 p-10 md:p-14 border border-stone-200 rounded-3xl">
             <div className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-12 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
                <h3 className={`text-3xl font-black text-stone-900 flex items-center gap-4 ${isUrdu ? 'urdu-text' : ''}`}>
                   <Globe className="text-emerald-700" size={32} />
                   {isUrdu ? 'سوشل میڈیا ہب' : 'Social Media Hub'}
                </h3>
                <div className="flex gap-4">
                   <a href="https://youtube.com/@jamiaululoommultan" target="_blank" rel="noopener noreferrer" 
                      className="bg-[#FF0000] text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg hover:scale-105 transition-all">
                      <Youtube size={18} /> {isUrdu ? 'سبسکرائب' : 'Subscribe'}
                   </a>
                   <a href="https://facebook.com/jamiaululoommultan" target="_blank" rel="noopener noreferrer" 
                      className="bg-[#1877F2] text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg hover:scale-105 transition-all">
                      <Facebook size={18} /> {isUrdu ? 'فالو کریں' : 'Follow'}
                   </a>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Video */}
                <div className="bg-white p-4 border rounded-2xl shadow-sm">
                   <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isUrdu ? 'urdu-text flex-row-reverse text-right' : ''}`}>
                      <Youtube className="text-red-600" size={20} />
                      {isUrdu ? 'تازہ ترین ویڈیو' : 'Latest Upload'}
                   </h4>
                   <div className="aspect-video rounded-xl overflow-hidden bg-stone-100 border">
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/vD2GqY5zI_s`}
                        title="Latest Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                   </div>
                </div>

                {/* Facebook Feed / Images */}
                <div className="bg-white p-4 border rounded-2xl shadow-sm">
                   <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isUrdu ? 'urdu-text flex-row-reverse text-right' : ''}`}>
                      <Facebook className="text-blue-600" size={20} />
                      {isUrdu ? 'فیس بک اپ ڈیٹس' : 'Facebook Feeds'}
                   </h4>
                   <div className="grid grid-cols-2 gap-3">
                      {[11, 12, 13, 14].map(idx => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden border group cursor-pointer">
                           <img src={`input_file_${idx}.png`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-4 py-2 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 rounded-lg transition-colors">
                      {isUrdu ? 'فیس بک پیج پر جائیں' : 'View All Posts'}
                   </button>
                </div>
             </div>
          </section>

          {/* News & Announcements Section */}
          <section className="space-y-8">
             <div className={`flex items-center justify-between mb-8 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <h3 className={`text-3xl font-black text-stone-900 flex items-center gap-4 ${isUrdu ? 'urdu-text' : ''}`}>
                   <Calendar className="text-emerald-700" size={32} />
                   {isUrdu ? 'تعلیمی اعلانات' : 'Latest Announcements'}
                </h3>
                <button onClick={() => setView('Portal')} className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-emerald-700 border-b-2 border-stone-100 hover:border-emerald-700 transition-all">
                   {isUrdu ? 'تمام دیکھیں' : 'View All'}
                </button>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {ANNOUNCEMENTS.map((news) => (
                   <motion.div 
                      key={news.id}
                      whileHover={{ y: -5 }}
                      className={`p-10 bg-white border-b-8 border-r-2 border-l-2 border-stone-100 hover:border-emerald-700 shadow-xl transition-all flex flex-col md:flex-row gap-10 ${isUrdu ? 'md:flex-row-reverse text-right' : ''}`}
                   >
                      <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-2xl min-w-[140px] border-2 border-emerald-100">
                         <span className="text-emerald-800 font-black text-3xl mb-1">{isUrdu ? news.urDate.split(' ')[0] : news.date.split(' ')[1].replace(',', '')}</span>
                         <span className="text-xs uppercase font-black text-emerald-600 tracking-widest">{isUrdu ? news.urDate.split(' ')[1] : news.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1">
                         <h4 className={`text-2xl font-black text-stone-800 mb-4 ${isUrdu ? 'urdu-text' : ''}`}>
                            {isUrdu ? news.urTitle : news.title}
                         </h4>
                         <p className={`text-stone-600 text-lg leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                            {isUrdu ? news.urDesc : news.desc}
                         </p>
                      </div>
                      <div className="flex items-center justify-center">
                         <button className="w-14 h-14 border-2 border-stone-100 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 rounded-full transition-all flex items-center justify-center">
                            <ChevronRight className={isUrdu ? 'rotate-180' : ''} size={24} />
                         </button>
                      </div>
                   </motion.div>
                ))}
             </div>
          </section>
       </div>
       <Sidebar lang={lang} />
    </div>
  );
}
