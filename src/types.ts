/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ur';
export type View = 'Home' | 'About' | 'Admissions' | 'Faculty' | 'Departments' | 'Donations' | 'Gallery' | 'Videos' | 'Login' | 'Portal';
export type Role = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface FacultyMember {
  id: number;
  name: string;
  ur: string;
  role: string;
  urRole: string;
  degree: string;
  urDegree: string;
}

export interface Announcement {
  id: number;
  date: string;
  urDate: string;
  title: string;
  urTitle: string;
  desc: string;
  urDesc: string;
}
