/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Laptop, Globe, Users, Youtube } from 'lucide-react';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import FacultyView from './components/FacultyView';
import LoginView from './components/LoginView';
import PortalView from './components/PortalView';
import AdmissionForm from './components/AdmissionForm';

import { Language, View, User } from './types';
import { CONTENT } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [view, setView] = useState<View>('Home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const isUrdu = lang === 'ur';

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setView('Portal');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('Home');
  };

  return (
    <div className={`min-h-screen bg-[#fcfcfc] text-stone-800 flex flex-col ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
       <Navigation 
         lang={lang} 
         setLang={setLang} 
         view={view} 
         setView={setView} 
         currentUser={currentUser} 
       />

       {/* Main Content Area */}
       <main className="container mx-auto px-4 py-20 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
               {view === 'Home' && <HomeView lang={lang} setView={setView} />}
               {view === 'Faculty' && <FacultyView lang={lang} />}
               {view === 'Login' && <LoginView lang={lang} onLoginSuccess={handleLoginSuccess} />}
               {view === 'Portal' && currentUser && <PortalView lang={lang} user={currentUser} onLogout={handleLogout} />}
               
               {view === 'About' && (
                 <div className="max-w-5xl mx-auto bg-white p-12 md:p-20 shadow-sm border border-stone-200">
                    <img src="input_file_3.png" className="w-full rounded-2xl mb-14" referrerPolicy="no-referrer" />
                    <h2 className={`text-5xl font-black mb-10 text-stone-900 ${isUrdu ? 'urdu-text text-right pb-4 border-b' : ''}`}>
                       {isUrdu ? 'تعارف اور مقصد' : 'Vision and Purpose'}
                    </h2>
                    <div className={`space-y-10 text-stone-600 ${isUrdu ? 'urdu-text text-right text-2xl leading-[2.5]' : 'text-lg leading-relaxed'}`}>
                       <p>{CONTENT[lang].intro.p1}</p>
                       <p>{CONTENT[lang].intro.p2}</p>
                       <div className="p-10 bg-stone-50 border-r-8 border-emerald-600 rounded-lg italic">
                          {isUrdu ? 'ایک ادارہ ، ایک تحریک' : 'One Institution, One Movement'}
                       </div>
                    </div>
                 </div>
               )}

               {view === 'Donations' && (
                 <div className="max-w-4xl mx-auto bg-emerald-900 text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <h2 className={`text-4xl md:text-6xl font-black mb-10 ${isUrdu ? 'urdu-text text-right' : ''}`}>
                       {isUrdu ? 'صدقہ جاریہ' : 'Make a Difference'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2">Meezan Bank</p>
                          <p className="text-3xl font-black font-mono">0501 0100 7752 82</p>
                       </div>
                       <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2">MCB Bank</p>
                          <p className="text-3xl font-black font-mono">0118 6010 1000 6672</p>
                       </div>
                    </div>
                 </div>
               )}

               {view === 'Admissions' && (
                 <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 text-center border rounded-3xl shadow-xl">
                    <img src="input_file_16.png" className="w-full h-64 object-cover rounded-2xl mb-12 shadow-lg" referrerPolicy="no-referrer" />
                    <h2 className={`text-5xl font-black mb-8 ${isUrdu ? 'urdu-text' : ''}`}>{isUrdu ? 'آن لائن داخلہ' : 'Online Admissions'}</h2>
                    <p className={`text-stone-500 mb-10 text-lg ${isUrdu ? 'urdu-text' : ''}`}>
                       {isUrdu ? 'جامع العلوم ملتان میں نئے تعلیمی سال کے لیے داخلے شروع ہیں۔ نیچے دیے گئے بٹن پر کلک کر کے فارم پر کریں۔' : 'Admissions are open for the new academic session. Click the button below to start your application process.'}
                    </p>
                    <button 
                      onClick={() => setIsAdmissionOpen(true)}
                      className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black text-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20 hover:scale-105"
                    >
                      {isUrdu ? 'داخلہ فارم کھولیں' : 'Open Admission Form'}
                    </button>
                 </div>
               )}

               {view === 'Gallery' && (
                  <div className="space-y-12">
                    <div className="text-center mb-16">
                       <h2 className={`text-5xl font-black text-stone-900 mb-6 ${isUrdu ? 'urdu-text' : ''}`}>
                          {isUrdu ? 'تصویری خاکہ' : 'Photo Gallery'}
                       </h2>
                       <div className="h-1.5 w-24 bg-emerald-700 mx-auto rounded-full" />
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                      {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 5, 3].map(idx => (
                        <div key={idx} className="bg-white p-3 rounded-2xl shadow-lg border border-stone-100 group overflow-hidden">
                          <img 
                            src={`input_file_${idx}.png`} 
                            className="w-full rounded-xl transform group-hover:scale-105 transition-transform duration-700" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
               )}

               {view === 'Videos' && (
                 <div className="space-y-16">
                   <div className="text-center max-w-2xl mx-auto">
                      <h2 className={`text-5xl font-black text-stone-900 mb-6 ${isUrdu ? 'urdu-text' : ''}`}>
                         {isUrdu ? 'ویڈیو گیلری' : 'Official Media Gallery'}
                      </h2>
                      <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-6" />
                      <p className={`text-stone-500 text-lg ${isUrdu ? 'urdu-text' : ''}`}>
                         {isUrdu ? 'جامع العلوم ملتان کے آفیشل یوٹیوب چینل سے منتخب کردہ بیانات اور پروگرامز' : 'Selected lectures and event highlights from our official YouTube channel'}
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {[
                        { id: "vD2GqY5zI_s", title: "Introduction to Jame ul Uloom" },
                        { id: "O0_Zz_y5GfU", title: "Annual Convocation Highlights" },
                        { id: "T1_b5_m9Kls", title: "New IT Center Tour" },
                        { id: "X8_c2_v0Pql", title: "Spiritual Gathering 2026" }
                      ].map(video => (
                        <div key={video.id} className="bg-white p-6 border shadow-xl hover:shadow-2xl transition-all group rounded-3xl">
                           <div className="aspect-video bg-stone-900 relative rounded-2xl overflow-hidden ring-4 ring-stone-50">
                              <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                           </div>
                           <div className="pt-8 pb-4">
                              <h4 className={`text-2xl font-black text-stone-900 ${isUrdu ? 'urdu-text text-right' : ''}`}>
                                {isUrdu ? 'جامع العلوم ملتان: تعارفی دستاویزی فلم' : video.title}
                              </h4>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                         <Youtube size={400} className="absolute -top-20 -right-20" />
                      </div>
                      <h3 className={`text-3xl md:text-5xl font-black mb-8 ${isUrdu ? 'urdu-text' : ''}`}>
                         {isUrdu ? 'ہمارے یوٹیوب چینل کو جوائن کریں' : 'Join Our YouTube Community'}
                      </h3>
                      <p className={`text-stone-400 mb-12 max-w-xl mx-auto text-lg ${isUrdu ? 'urdu-text' : ''}`}>
                         {isUrdu ? 'جامعہ کی تمام سرگرمیوں، بیانات اور تعلیمی پروگرامز کی ویڈیوز کے لیے ہمارا چینل سبسکرائب کریں۔' : 'Subscribe for regular updates on educational lectures, institutional events, and spiritual gatherings.'}
                      </p>
                      <a 
                        href="https://youtube.com/@jamiaululoommultan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-[#FF0000] text-white rounded-full font-black text-2xl hover:bg-red-700 transition-all shadow-2xl hover:scale-105"
                      >
                         <Youtube size={32} /> {isUrdu ? 'سبسکرائب کریں' : 'Subscribe Now'}
                      </a>
                   </div>
                 </div>
               )}

               {view === 'Departments' && (
                 <div className="bg-white p-12 md:p-20 shadow-sm border border-stone-200">
                    <h2 className={`text-4xl font-black mb-12 ${isUrdu ? 'urdu-text text-right' : ''}`}>Academic Departments</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       {[
                         { id: "Religious Sciences", icon: <BookOpen />, img: "input_file_17.png" },
                         { id: "Modern Education", icon: <Laptop />, img: "input_file_19.png" },
                         { id: "IT & Freelancing", icon: <Globe />, img: "input_file_13.png" },
                         { id: "Girls Secondary", icon: <Users />, img: "input_file_22.png" }
                       ].map(dept => (
                         <div key={dept.id} className={`group cursor-pointer border rounded-2xl overflow-hidden hover:shadow-2xl transition-all ${isUrdu ? 'text-right' : ''}`}>
                            <div className="h-64 overflow-hidden relative">
                               <img src={dept.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                               <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-white font-bold text-xl">{isUrdu ? 'تفصیل دیکھیں' : 'View Details'}</span>
                               </div>
                            </div>
                            <div className="p-8">
                               <div className="text-emerald-700 mb-4">{dept.icon}</div>
                               <h3 className="text-2xl font-black">{dept.id}</h3>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </motion.div>
          </AnimatePresence>
       </main>

       <Footer lang={lang} />

       <AnimatePresence>
          {isAdmissionOpen && (
            <AdmissionForm lang={lang} onClose={() => setIsAdmissionOpen(false)} />
          )}
       </AnimatePresence>
    </div>
  );
}
