import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube, GraduationCap } from 'lucide-react';
import { Language } from '../types';

export default function Footer({ lang }: { lang: Language }) {
  const isUrdu = lang === 'ur';
  
  return (
    <footer className="bg-stone-900 text-white pt-20 pb-10 mt-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 ${isUrdu ? 'text-right lg:flex-row-reverse' : ''}`}>
          {/* Institution Info */}
          <div className="space-y-8">
            <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <img src="input_file_23.png" className="w-16 h-auto brightness-0 invert" referrerPolicy="no-referrer" />
              <div>
                <h3 className={`text-2xl font-black ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? 'جامع العلوم ملتان' : 'Jame ul Uloom'}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Al-Jamia Al-Islamia</p>
              </div>
            </div>
            <p className={`text-stone-400 text-sm leading-relaxed ${isUrdu ? 'urdu-text text-lg' : ''}`}>
              {isUrdu 
                ? 'جامع العلوم ملتان ایک مایہ ناز اسلامی تعلیمی ادارہ ہے جو نصف صدی سے زائد عرصے سے نسلِ نو کی علمی و روحانی پیاس بجھا رہا ہے۔'
                : 'A flagship Islamic institution dedicated to the holistic development of students through the marriage of spiritual wisdom and modern academic excellence.'}
            </p>
            <div className={`flex gap-4 ${isUrdu ? 'justify-end' : ''}`}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className={`text-sm font-black uppercase tracking-widest text-emerald-500 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
              {isUrdu ? 'ضروری لنکس' : 'Explore'}
            </h4>
            <ul className={`space-y-4 text-stone-400 text-sm font-medium ${isUrdu ? 'urdu-text text-lg' : ''}`}>
              <li><a href="#" className="hover:text-white transition-colors">Academic Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library & Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Societies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Placement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recent News</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className={`text-sm font-black uppercase tracking-widest text-emerald-500 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
              {isUrdu ? 'رابطہ کیجیے' : 'Contact Us'}
            </h4>
            <ul className={`space-y-6 text-stone-400 text-sm ${isUrdu ? 'urdu-text text-lg' : ''}`}>
              <li className={`flex gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <MapPin className="text-emerald-500 flex-shrink-0" size={20} />
                <span>Opposite Shershah Toll Plaza, Multan, Pakistan</span>
              </li>
              <li className={`flex gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Phone className="text-emerald-500 flex-shrink-0" size={20} />
                <span>+92 300 735 4393</span>
              </li>
              <li className={`flex gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Mail className="text-emerald-500 flex-shrink-0" size={20} />
                <span>info@jamiaululoom.edu.pk</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className={`text-sm font-black uppercase tracking-widest text-emerald-500 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
              {isUrdu ? 'تعاون کریں' : 'Support Us'}
            </h4>
            <p className={`text-stone-400 text-sm leading-relaxed ${isUrdu ? 'urdu-text text-lg' : ''}`}>
              {isUrdu 
                ? 'اپنے عطیات اور صدقات کے ذریعے علمِ دین کی شمع کو روشن رکھنے میں ہمارا ساتھ دیں۔'
                : 'Your contributions help us provide quality education to thousands of deserving students.'}
            </p>
            <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/40">
              {isUrdu ? 'آن لائن عطیہ کریں' : 'Donate Online'}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-stone-500">
          <p>© 2026 Jame ul Uloom Multan. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
