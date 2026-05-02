import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { Language, User as UserType } from '../types';

export default function LoginView({ lang, onLoginSuccess }: { lang: Language, onLoginSuccess: (user: UserType) => void }) {
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
