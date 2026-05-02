/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FacultyMember, Announcement, Language } from './types';

export const FACULTY_DATA: FacultyMember[] = [
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

export const ANNOUNCEMENTS: Announcement[] = [
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

export const CONTENT: { [key in Language]: any } = {
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
