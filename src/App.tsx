/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, Globe, 
  GraduationCap, BookOpen, Users, Building2, Laptop, 
  History, Award, ExternalLink, ArrowRight, Heart,
  Search, Calendar, List, User, Lock, LogIn, Settings,
  CreditCard, FileText, ChevronDown, Facebook, Youtube
} from 'lucide-react';
import AdmissionForm from './components/AdmissionForm';

// --- Types ---
type Language = 'en' | 'ur';
type View = 'Home' | 'About' | 'Admissions' | 'Faculty' | 'Departments' | 'Donations' | 'Gallery' | 'Videos' | 'Login' | 'Portal';
type Role = 'admin' | 'faculty' | 'student';

interface User {
  id: string;
  username: string;
  role: Role;
}

interface FacultyMember {
  id: number;
  name: string;
  ur: string;
  role: string;
  urRole: string;
  degree: string;
  urDegree: string;
}

// --- FULL FACULTY DATA FROM PDF (27 MEMBERS) ---
const faculty: FacultyMember[] = [
  { id: 1, name: "Maulana Abdul Razzaq", ur: "مولانا عبدالرزاق", role: "Mohtamim / Sheikh-ul-Hadith", urRole: "مہتمم و شیخ الحدیث", degree: "MA (Fazil Jame ul Uloom)", urDegree: "ایم اے (فاضل جامع العلوم)" },
  { id: 2, name: "Maulana Hafiz Muhammad Aslam", ur: "مولانا حافظ محمد اسلم", role: "Vice Principal", urRole: "نائب مہتمم", degree: "MA (Rabita-ul-Madaris)", urDegree: "ایم اے (رابطۃ المدارس)" },
  { id: 3, name: "Maulana Hafiz Munir Ahmed", ur: "مولانا حافظ منیر احمد", role: "Vice Principal (Exams)", urRole: "نائب مہتمم (امتحانات)", degree: "MA, B.Ed (Fazil Jame ul Uloom)", urDegree: "ایم اے، بی ایڈ (فاضل جامع العلوم)" },
  { id: 4, name: "Maulana Dr. Inamullah Jamii", ur: "مولانا ڈاکٹر انعام اللہ جامعی", role: "Head Teacher", urRole: "صدر مدرس", degree: "Ph.D, M.Phil, B.Ed", urDegree: "پی ایچ ڈی، ایم فل، بی ایڈ" },
  { id: 5, name: "Maulana Dr. Abdus Salam", ur: "مولانا ڈاکٹر عبدالسلام", role: "In-charge Bazm-e-Adab", urRole: "انچارج بزمِ ادب", degree: "Ph.D, B.Ed", urDegree: "پی ایچ ڈی، بی ایڈ" },
  { id: 6, name: "Maulana Hafiz Muhammad Sabir", ur: "مولانا حافظ محمد صابر", role: "Senior Teacher", urRole: "مدرس", degree: "MA, B.Ed", urDegree: "ایم اے، بی ایڈ" },
  { id: 7, name: "Maulana Mian Rahmatullah Mohmand", ur: "مولانا میان رحمت اللہ مہمند", role: "Adm Secretary", urRole: "سیکریٹری انتظامیہ", degree: "MA (Dars-e-Nizami)", urDegree: "ایم اے (درسِ نظامی)" },
  { id: 8, name: "Mufti Muhammad Asim Shahzad", ur: "مفتی محمد عاصم شہزاد", role: "Head Mufti", urRole: "انچارج دارالافتاء", degree: "Specialist in Fiqh", urDegree: "تخصص فی الفقہ" },
  { id: 9, name: "Maulana Hafiz Yasin Tabassum", ur: "مولانا حافظ یسین تبسم", role: "Library In-charge", urRole: "انچارج لائبریری", degree: "MA, B.Ed", urDegree: "ایم اے، بی ایڈ" },
  { id: 10, name: "Maulana Hafiz Muhammad Ashraf", ur: "مولانا حافظ محمد اشرف", role: "Teacher", urRole: "مدرس", degree: "M.Phil, B.Ed", urDegree: "ایم فل، بی ایڈ" },
  { id: 11, name: "Maulana Abdur Rashid", ur: "مولانا عبد الراشد", role: "Teacher", urRole: "مدرس", degree: "MA", urDegree: "ایم اے" },
  { id: 12, name: "Maulana Muhammad Zakariya", ur: "مولانا محمد زکریا", role: "Teacher", urRole: "مدرس", degree: "MA", urDegree: "ایم اے" },
  { id: 13, name: "Maulana Nasir Jamil", ur: "مولانا ناصر جمیل", role: "Teacher", urRole: "مدرس", degree: "MA", urDegree: "ایم اے" },
  { id: 14, name: "Maulana Hafiz Nasrullah Rahim", ur: "مولانا حافظ نصراللہ رحیم", role: "Asst Finance", urRole: "معاون مالیات", degree: "M.Phil", urDegree: "ایم فل" },
  { id: 15, name: "Maulana Hafiz Umar Farooq Bazmi", ur: "مولانا حافظ عمر فاروق بزمی", role: "Asst Finance", urRole: "معاون مالیات", degree: "MA", urDegree: "ایم اے" },
  { id: 16, name: "Maulana Mahmood Bashir", ur: "مولانا محمود بشیر", role: "Director Religious Studies", urRole: "ناظم شعبہ دراسات", degree: "M.Phil", urDegree: "ایم فل" },
  { id: 17, name: "Maulana Riaz Ahmed Farooqi", ur: "مولانا ریاض احمد فاروقی", role: "Hostel In-charge", urRole: "ناظم ہاسٹل", degree: "MA", urDegree: "ایم اے" },
  { id: 18, name: "Noor Muhammad Khan", ur: "جناب نور محمد خان", role: "IT In-charge", urRole: "انچارج آئی ٹی", degree: "M.Sc (Math), PGD(CS)", urDegree: "ایم ایس سی" },
  { id: 19, name: "Syed Murtaza Gilani", ur: "سید مرتضیٰ گیلانی", role: "Asst IT", urRole: "معاون آئی ٹی", degree: "M.Phil IT", urDegree: "ایم فل آئی ٹی" },
  { id: 20, name: "Maulana Hafiz Nasrullah Khan", ur: "مولانا حافظ نصراللہ خان", role: "Teacher", urRole: "مدرس", degree: "M.Phil", urDegree: "ایم فل" },
  { id: 21, name: "Muhammad Ubaidullah", ur: "محمد عبیداللہ", role: "Teacher (Modern Sciences)", urRole: "مدرس (جدید علوم)", degree: "M.Sc (Math), M.Phil", urDegree: "ایم ایس سی" },
  { id: 22, name: "Shahid Amin", ur: "شاہد امین", role: "Teacher (Physics/Math)", urRole: "مدرس (طبیعیات)", degree: "B.Sc (Physics/Double Math)", urDegree: "بی ایس سی" },
  { id: 23, name: "Qari Allah Bakhsh Tahir", ur: "قاری اللہ بخش طاہر", role: "Hifz In-charge", urRole: "انچارج حفظ", degree: "Fazil Tajweed", urDegree: "فاضل تجوید" },
  { id: 24, name: "Qari Muhammad Shoaib", ur: "قاری محمد شعیب", role: "Hifz Teacher", urRole: "استاد تحفیظ", degree: "MA, Tajweed", urDegree: "ایم اے، تجوید" },
  { id: 25, name: "Qari Muhammad Sufyan", ur: "قاری محمد سفیان", role: "Tajweed Teacher", urRole: "استاد تجوید", degree: "Fazil Tajweed", urDegree: "فاضل تجوید" },
  { id: 26, name: "Qari Anees-ur-Rahman", ur: "قاری انیس الرحمان", role: "Tajweed Teacher", urRole: "استاد تجوید", degree: "Fazil Tajweed", urDegree: "فاضل تجوید" },
  { id: 27, name: "Qari Mahboob Yazdani", ur: "قاری محبوب احمد یزدانی", role: "Tajweed In-charge", urRole: "انچارج تجوید", degree: "Fazil Tajweed", urDegree: "فاضل تجوید" }
];

const announcements = [
  {
    id: 1,
    date: "May 15, 2026",
    urDate: "۱۵ مئی ۲۰۲۶ء",
    title: "Annual Examinations Result Declared",
    urTitle: "سالانہ امتحانات کے نتائج کا اعلان",
    desc: "The results for Dars-e-Nizami annual examinations are now available on the notice board.",
    urDesc: "درسِ نظامی کے سالانہ امتحانات کے نتائج نوٹس بورڈ پر آویزاں کر دیے گئے ہیں۔"
  },
  {
    id: 2,
    date: "May 10, 2026",
    urDate: "۱۰ مئی ۲۰۲۶ء",
    title: "Summer Vacation Schedule",
    urTitle: "تعطیلاتِ گرما کا شیڈول",
    desc: "Summer vacations will commence from June 1st. Please check the portal for details.",
    urDesc: "یکم جون سے گرمیوں کی چھٹیوں کا آغاز ہو رہا ہے۔ تفصیلات پورٹل پر دیکھیں۔"
  },
  {
    id: 3,
    date: "May 05, 2026",
    urDate: "۰۵ مئی ۲۰۲۶ء",
    title: "New Quran Tajweed Intensive Course",
    urTitle: "جدید تجوید القرآن شارٹ کورس",
    desc: "Registrations are now open for the 3-month intensive tajweed program for adults.",
    urDesc: "بالغوں کے لیے ۳ ماہ کے خصوصی تجوید کورس کے لیے داخلے جاری ہیں۔"
  }
];

const content: { [key in Language]: any } = {
  en: {
    title: "Jame ul Uloom Multan",
    subtitle: "Al-Jamia Al-Islamia",
    nav: {
      Home: "Home",
      About: "About Us",
      Admissions: "Admissions",
      Departments: "Departments",
      Faculty: "Our Scholars",
      Donations: "Support Us",
      Gallery: "Gallery",
      Videos: "Video Gallery",
      Login: "Log In"
    },
    intro: {
      p1: "Established in 1955, Jame ul Uloom Multan is a premier institution dedicated to producing representatives of Islam who are rooted in tradition yet proficient in modern sciences.",
      p2: "We combine the depth of the Quran and Sunnah with contemporary disciplines including IT and English, serving as a movement for spiritual and intellectual growth."
    }
  },
  ur: {
    title: "جامع العلوم ملتان",
    subtitle: "الجامعۃ الاسلامیۃ",
    nav: {
      Home: "صفحہ اول",
      About: "تعارفِ جامع",
      Admissions: "داخلہ فارم",
      Departments: "شعبہ جات",
      Faculty: "اساتذہ کرام",
      Donations: "صدقہ جاریہ",
      Gallery: "تصویری خاکہ",
      Videos: "ویڈیو گیلری",
      Login: "لاگ ان"
    },
    intro: {
      p1: "جامع العلوم ملتان کی بنیاد 1955ء میں علمائے کرام نے جنوبی پنجاب کے مرکز ملتان میں رکھی۔ اس ادارے کا مقصد اسلام کے حقیقی نمائندوں کو پیدا کرنا ہے جن کے پاس دنیا کا علم اور حب الوطنی کا نقطہ نظر ہو۔",
      p2: "یہ ادارہ ایک تحریک ہے جس کا مقصد نوجوان نسل کو قرآن و سنت کی گہری بصیرت سے آراستہ کرنا اور انہیں جدید علوم میں ماہر بنانا ہے۔"
    }
  }
};

const sidebarItems = {
  en: { search: "Search", recent: "Recent Posts", categories: "Categories", meta: "Admin Links" },
  ur: { search: "تلاش کریں", recent: "تازہ ترین خبریں", categories: "زمرہ جات", meta: "انتظامی امور" }
};

// --- Sub-Components ---

function Sidebar({ lang }: { lang: Language }) {
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

// --- Main Views ---

function HomeView({ lang, setView }: { lang: Language, setView: (v: View) => void }) {
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
                {content[lang].intro.p1}
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
                {announcements.map((news) => (
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

function FacultyView({ lang }: { lang: Language }) {
  const isUrdu = lang === 'ur';
  return (
    <div className="bg-white p-10 md:p-14 border border-stone-200 shadow-sm">
       <h2 className={`text-4xl font-black mb-14 text-stone-800 ${isUrdu ? 'urdu-text text-right' : ''}`}>
          {isUrdu ? 'اساتذہ کرام کی مکمل فہرست' : 'Complete Faculty Directory'}
       </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map(f => (
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

function LoginView({ lang, onLoginSuccess }: { lang: Language, onLoginSuccess: (user: User) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isUrdu = lang === 'ur';

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-stone-100 text-center">
       <img src="input_file_1.png" className="w-24 mx-auto mb-10 grayscale" referrerPolicy="no-referrer" />
       <h2 className={`text-2xl font-bold mb-8 ${isUrdu ? 'urdu-text' : ''}`}>{isUrdu ? 'انتظامی لاگ ان' : 'Portal Login'}</h2>
       
       <div className="mb-8 p-4 bg-stone-50 rounded-lg text-[10px] text-stone-400 font-mono text-left space-y-1">
          <p>Demo Admin: admin / admin123</p>
          <p>Demo Faculty: faculty / faculty123</p>
          <p>Demo Student: student / student123</p>
       </div>

       <div className="space-y-6">
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <div className="relative">
             <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
             <input 
               type="text" 
               placeholder="Username" 
               value={username}
               onChange={e => setUsername(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-stone-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200" 
             />
          </div>
          <div className="relative">
             <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
             <input 
               type="password" 
               placeholder="Password" 
               value={password}
               onChange={e => setPassword(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-stone-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200" 
             />
          </div>
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
             {loading ? '...' : <><LogIn size={20} /> Log In</>}
          </button>
       </div>
    </div>
  );
}

function PortalView({ lang, user, onLogout }: { lang: Language, user: User, onLogout: () => void }) {
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

  const navItems = { ...content[lang].nav };
  if (currentUser) {
    delete navItems.Login;
    navItems.Portal = isUrdu ? 'پورٹل' : 'Portal';
  }

  return (
    <div className={`min-h-screen bg-[#fcfcfc] text-stone-800 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
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
                         {content[lang].title}
                      </h1>
                      <p className="text-[10px] md:text-sm font-bold text-emerald-700 uppercase tracking-[0.4em] mt-1">{content[lang].subtitle}</p>
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

       {/* Banner / Marquee (Islamic site style) */}
       <div className="bg-emerald-50 border-b border-emerald-100 py-3 overflow-hidden whitespace-nowrap">
          <div className="flex gap-20 animate-marquee text-xs font-bold text-emerald-800 uppercase tracking-widest">
             <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'نئے تعلیمی سال کے داخلے شروع ہیں - تفصیلات کے لیے رابطہ کریں۔' : 'Admissions Open for Academic Year 2026 - Apply Online Now!'}</span>
             <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'سالانہ امتحانات کے نتائج کا اعلان کر دیا گیا ہے۔' : 'Annual Examination Results have been announced.'}</span>
             <span className={isUrdu ? 'urdu-text text-sm font-bold' : ''}>{isUrdu ? 'تجوید القرآن شارٹ کورس - برائے خواتین و حضرات۔' : 'Tajweed-ul-Quran Short Course - Admissions Open.'}</span>
          </div>
       </div>

       {/* Main Content Area */}
       <div className="container mx-auto px-4 py-20 flex-1">
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
                       <p>{content[lang].intro.p1}</p>
                       <p>{content[lang].intro.p2}</p>
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

                   {/* Main Call to Action */}
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
                       ].map(d => (
                         <div key={d.id} className={`glass-card p-6 rounded-3xl overflow-hidden group ${isUrdu ? 'text-right' : ''}`}>
                            <div className="h-48 overflow-hidden rounded-2xl mb-6">
                               <img src={d.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex items-center gap-3 mb-4 text-emerald-700">
                               {d.icon}
                               <h4 className="text-2xl font-black">{d.id}</h4>
                            </div>
                            <p className="text-stone-500 leading-relaxed text-sm">Comprehensive programs designed to empower students with both spiritual wisdom and professional excellence.</p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </motion.div>
          </AnimatePresence>
       </div>

       {/* Footer */}
       <footer className="bg-stone-900 text-stone-300 py-20 border-t border-stone-800">
          <div className="container mx-auto px-4">
             <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 ${isUrdu ? 'text-right' : 'text-left'}`}>
                {/* Branding & Mission */}
                <div className="space-y-6">
                   <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                      <img src="input_file_1.png" className="w-12 h-12 brightness-0 invert" referrerPolicy="no-referrer" />
                      <h3 className={`text-2xl font-black text-white ${isUrdu ? 'urdu-text' : ''}`}>{isUrdu ? 'جامع العلوم' : 'Jame ul Uloom'}</h3>
                   </div>
                   <p className={`text-stone-400 text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                      {isUrdu 
                        ? 'جامع العلوم ملتان ایک علمی و فکری تحریک ہے جو روایت اور جدیدیت کے حسین امتزاج سے نسلِ نو کی آبیاری کر رہی ہے۔'
                        : 'Jame ul Uloom Multan is a premier institution blending tradition with modernity to shape the future of Islamic scholarship.'}
                   </p>
                </div>

                {/* Contact Columns */}
                <div className="space-y-6">
                   <h4 className={`text-white font-black uppercase tracking-widest text-xs border-b border-stone-800 pb-4 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
                      {isUrdu ? 'رابطہ کی تفصیلات' : 'Contact Details'}
                   </h4>
                   <div className="space-y-4">
                      <a href="tel:+923007354393" className="flex items-start gap-3 hover:text-emerald-400 transition-colors group">
                         <Phone size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                         <div>
                            <span className="block font-mono text-lg tracking-tighter">0300-7354393</span>
                            <span className="text-[10px] uppercase text-stone-500 font-bold">Main Office</span>
                         </div>
                      </a>
                      <a href="tel:+923027353686" className="flex items-start gap-3 hover:text-emerald-400 transition-colors group">
                         <Phone size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                         <div>
                            <span className="block font-mono text-lg tracking-tighter">0302-7353686</span>
                            <span className="text-[10px] uppercase text-stone-500 font-bold">Administrations</span>
                         </div>
                      </a>
                   </div>
                </div>

                {/* Email & Digital */}
                <div className="space-y-6">
                   <h4 className={`text-white font-black uppercase tracking-widest text-xs border-b border-stone-800 pb-4 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
                      {isUrdu ? 'ای میل اور ویب' : 'Digital Presence'}
                   </h4>
                   <div className="space-y-4">
                      <a href="mailto:info@jamiaululoom.edu.pk" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                         <Mail size={18} className="text-emerald-500 flex-shrink-0" />
                         <span className="text-sm truncate">info@jamiaululoom.edu.pk</span>
                      </a>
                      <a href="mailto:admissions@jamiaululoom.edu.pk" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                         <Mail size={18} className="text-emerald-500 flex-shrink-0" />
                         <span className="text-sm truncate">admissions@jamiaululoom.edu.pk</span>
                      </a>
                      <div className="flex gap-4 pt-2">
                         <a href="https://facebook.com/jamiaululoommultan" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 rounded-lg hover:bg-emerald-600 text-white transition-all">
                            <Facebook size={18} />
                         </a>
                         <a href="https://youtube.com/@jamiaululoommultan" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-800 rounded-lg hover:bg-emerald-600 text-white transition-all">
                            <Youtube size={18} />
                         </a>
                         <div className="p-2 bg-stone-800 rounded-lg hover:bg-emerald-600 cursor-pointer transition-all"><Globe size={18} /></div>
                         <div className="p-2 bg-stone-800 rounded-lg hover:bg-emerald-600 cursor-pointer transition-all"><Users size={18} /></div>
                      </div>
                   </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                   <h4 className={`text-white font-black uppercase tracking-widest text-xs border-b border-stone-800 pb-4 ${isUrdu ? 'urdu-text text-xl' : ''}`}>
                      {isUrdu ? 'پتہ' : 'Campus Location'}
                   </h4>
                   <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                         <p className={`text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                            {isUrdu 
                              ? 'معصوم شاہ روڈ، نزد پی ایم اے چوک، ملتان، پنجاب، پاکستان'
                              : 'Masoom Shah Road, Near PMA Chowk, Multan, Punjab, Pakistan'}
                         </p>
                         <button className="text-emerald-500 text-[10px] uppercase font-black tracking-widest mt-4 flex items-center gap-1 hover:text-white transition-colors">
                            <ExternalLink size={12} /> View on Map
                         </button>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 text-stone-600">
                <p className={`text-[10px] uppercase font-bold tracking-[0.3em] ${isUrdu ? 'urdu-text' : ''}`}>
                   &copy; 2026 Jame ul Uloom Multan - All Rights Reserved
                </p>
                <div className="flex gap-8 text-[10px] uppercase font-black tracking-widest">
                   <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                   <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                   <a href="#" className="hover:text-white transition-colors">Student Portal</a>
                </div>
             </div>
          </div>
       </footer>

       <AnimatePresence>
        {isAdmissionOpen && (
          <AdmissionForm lang={lang} onClose={() => setIsAdmissionOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
