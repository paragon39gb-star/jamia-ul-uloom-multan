import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';

interface AdmissionFormProps {
  lang: 'en' | 'ur';
  onClose: () => void;
}

export default function AdmissionForm({ lang, onClose }: AdmissionFormProps) {
  const isUrdu = lang === 'ur';
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    contact: '',
    address: '',
    lastEducation: '',
    course: ''
  });

  const courses = isUrdu 
    ? ["درسِ نظامی", "حفظ القرآن", "تجوید و قرات", "آئی ٹی کورسز", "شارٹ کورسز"]
    : ["Dars-e-Nizami", "Hifz-ul-Quran", "Tajweed-ul-Quran", "IT Courses", "Short Courses"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setStatus('success');
      else throw new Error();
    } catch (error) {
      setStatus('error');
    }
  };

  const labels = {
    en: {
      title: "Online Admission Form",
      name: "Full Name",
      father: "Father's Name",
      dob: "Date of Birth",
      contact: "Contact Number",
      address: "Home Address",
      education: "Previous Education",
      course: "Select Course",
      submit: "Submit Application",
      success: "Application Submitted Successfully!",
      error: "Something went wrong. Please try again."
    },
    ur: {
      title: "آن لائن داخلہ فارم",
      name: "مکمل نام",
      father: "والد کا نام",
      dob: "تاریخِ پیدائش",
      contact: "رابطہ نمبر",
      address: "رہائشی پتہ",
      education: "پچھلی تعلیم",
      course: "کورس کا انتخاب",
      submit: "درخواست جمع کروائیں",
      success: "آپ کی درخواست کامیابی سے جمع ہو گئی ہے!",
      error: "کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں۔"
    }
  }[lang];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <h2 className={`text-2xl font-bold ${isUrdu ? 'urdu-text' : ''}`}>{labels.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={80} className="text-emerald-500 mb-6" />
              <h3 className={`text-2xl font-bold mb-4 ${isUrdu ? 'urdu-text' : ''}`}>{labels.success}</h3>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold"
              >
                {isUrdu ? 'بند کریں' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`space-y-6 ${isUrdu ? 'text-right' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.name}</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.father}</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    value={formData.fatherName}
                    onChange={e => setFormData({...formData, fatherName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.dob}</label>
                  <input 
                    required
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-sans"
                    value={formData.dob}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.contact}</label>
                  <input 
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-sans"
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.education}</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  value={formData.lastEducation}
                  onChange={e => setFormData({...formData, lastEducation: e.target.value})}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.course}</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white"
                  value={formData.course}
                  onChange={e => setFormData({...formData, course: e.target.value})}
                >
                  <option value="">{isUrdu ? 'انتخاب کریں' : 'Select a course'}</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-slate-700 mb-2 ${isUrdu ? 'urdu-text' : ''}`}>{labels.address}</label>
                <textarea 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all min-h-[100px]"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">{labels.error}</p>
              )}

              <button 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span className={isUrdu ? 'urdu-text' : ''}>{labels.submit}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
