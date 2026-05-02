import React, { useState, useEffect } from 'react';
import { X, List, ChevronRight, GraduationCap, BookOpen, Settings, CreditCard } from 'lucide-react';
import { Language, User } from '../types';

export default function PortalView({ lang, user, onLogout }: { lang: Language, user: User, onLogout: () => void }) {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const isUrdu = lang === 'ur';

  useEffect(() => {
    if (user.role === 'admin') {
      fetch('/api/admin/admissions', {
        headers: { 'x-user-role': 'admin' }
      })
      .then(res => res.json())
      .then(data => setAdmissions(data));
    }
  }, [user.role]);

  return (
    <div className="space-y-10">
       <header className={`flex flex-col md:flex-row items-center justify-between p-8 bg-white border border-stone-200 rounded-2xl ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
          <div className={`${isUrdu ? 'text-right' : ''}`}>
             <h2 className={`text-4xl font-black ${isUrdu ? 'urdu-text' : ''}`}>
                {isUrdu ? `خوش آمدید، ${user.username}` : `Welcome, ${user.username}`}
             </h2>
             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 inline-block">
                {user.role}
             </span>
          </div>
          <button onClick={onLogout} className="mt-6 md:mt-0 px-6 py-3 border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-500 rounded-xl font-bold transition-all flex items-center gap-2">
             Logout <X size={18} />
          </button>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
             {user.role === 'admin' && (
               <div className="bg-white border rounded-2xl overflow-hidden">
                  <div className="bg-stone-50 p-6 border-b flex justify-between items-center">
                     <h3 className="font-bold flex items-center gap-2"><List size={18}/> {isUrdu ? 'حالیہ داخلہ فارم' : 'Recent Admissions'}</h3>
                     <span className="text-xs bg-stone-200 px-2 py-1 rounded">{admissions.length} Total</span>
                  </div>
                  <div className="divide-y max-h-[500px] overflow-y-auto">
                     {admissions.map(a => (
                       <div key={a.id} className="p-6 hover:bg-stone-50 flex justify-between items-center">
                          <div>
                             <p className="font-bold">{a.fullName}</p>
                             <p className="text-xs text-stone-400">{a.department} • {new Date(a.submittedAt).toLocaleDateString()}</p>
                          </div>
                          <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors"><ChevronRight size={18}/></button>
                       </div>
                     ))}
                     {admissions.length === 0 && <p className="p-10 text-center text-stone-400">No applications found.</p>}
                  </div>
               </div>
             )}

             {user.role === 'faculty' && (
               <div className="bg-white p-10 border rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Academic Schedule</h3>
                  <div className="space-y-4">
                     {[
                       { time: '08:00 AM', subject: 'Dars-e-Quran', room: 'Hall A' },
                       { time: '10:30 AM', subject: 'Arabic Literature', room: 'Class 4' },
                       { time: '02:00 PM', subject: 'Fiqh Seminar', room: 'Library' },
                     ].map(s => (
                       <div key={s.time} className="flex items-center gap-6 p-4 border-l-4 border-emerald-500 bg-stone-50">
                          <span className="font-mono font-bold text-emerald-700">{s.time}</span>
                          <div>
                             <p className="font-bold">{s.subject}</p>
                             <p className="text-xs text-stone-400">{s.room}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {user.role === 'student' && (
               <div className="bg-white p-10 border rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Your Status</h3>
                  <div className="flex items-center gap-6 p-10 bg-emerald-50 rounded-3xl border border-emerald-100">
                     <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                        <GraduationCap size={40} />
                     </div>
                     <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-1">Current Enrollment</p>
                        <h4 className="text-4xl font-black text-emerald-900">Active</h4>
                        <p className="text-emerald-700 mt-2">Dars-e-Nizami (Level 3)</p>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-8">
             <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl">
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-stone-500 pb-2 border-b border-stone-800">Quick Actions</h4>
                <div className="space-y-4">
                   <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-4 transition-all transition-colors group">
                      <div className="p-2 bg-emerald-600 rounded-lg group-hover:scale-110 transition-transform"><BookOpen size={18}/></div>
                      <span className="font-bold text-sm">Course Materials</span>
                   </button>
                   <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-4 transition-all transition-colors group">
                      <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform"><Settings size={18}/></div>
                      <span className="font-bold text-sm">Account Settings</span>
                   </button>
                   <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-4 transition-all transition-colors group">
                      <div className="p-2 bg-amber-600 rounded-lg group-hover:scale-110 transition-transform"><CreditCard size={18}/></div>
                      <span className="font-bold text-sm">Financials</span>
                   </button>
                </div>
             </div>

             <div className="bg-white p-8 border rounded-2xl">
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest border-b pb-2">Institution Mails</h4>
                <div className="space-y-4">
                   <div className="p-4 bg-stone-50 rounded-xl border-b border-stone-100">
                      <p className="text-[10px] text-stone-400 mb-1">TODAY</p>
                      <p className="text-sm font-bold">New Exam Policy 2026</p>
                   </div>
                   <div className="p-4 bg-stone-50 rounded-xl border-b border-stone-100 opacity-60">
                      <p className="text-[10px] text-stone-400 mb-1">YESTERDAY</p>
                      <p className="text-sm font-bold">System Maintenance Notice</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
