'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

// Icons
const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.27-2.09 3.67-5.17 3.67-9.15z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.15C3.25 21.36 7.35 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.27C.46 8.22 0 10.05 0 12s.46 3.78 1.27 5.39l4-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.64 1.27 6.61l4 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const IconScissors = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
);
const IconMoney = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
);
const IconBill = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);
const IconBack = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const IconShare = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const IconArchive = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
);
const IconUnarchive = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line><line x1="12" y1="12" x2="12" y2="18"></line><polyline points="9 15 12 12 15 15"></polyline></svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

// Types
interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
  password?: string;
}

interface Item {
  id: number;
  type: string;
  price: string;
}

interface Receipt {
  id: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerPhone: string;
  items: Item[];
  subtotal: number;
  discount: number;
  taxPercent: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  notes: string;
  archived?: boolean;
  issuedBy?: string;
  amountPaid?: number;
}

// Helpers
const generateReceiptId = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
};

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'new' | 'view' | 'stats' | 'users'>('home');
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from backend API
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        // Check for active Supabase Google session
        try {
          const meRes = await fetch('/api/auth/me');
          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData?.user) {
              setCurrentUser(meData.user);
              localStorage.setItem('activeUserId', meData.user.id);
            }
          }
        } catch (authErr) {
          console.warn('Could not check Supabase auth session:', authErr);
        }

        // Load Bills
        const resBills = await fetch('/api/bills');
        if (!resBills.ok) throw new Error('Failed to load receipts');
        const dataBills = await resBills.json();
        setReceipts(dataBills);

        // Load Users
        const resUsers = await fetch('/api/users');
        if (!resUsers.ok) throw new Error('Failed to load users');
        const dataUsers = await resUsers.json();
        setUsers(dataUsers);

        // Fallback session from localStorage if not already authenticated via Google
        const savedUserId = localStorage.getItem('activeUserId');
        if (savedUserId && !currentUser) {
          const u = dataUsers.find((u: User) => u.id === savedUserId);
          if (u) setCurrentUser(u);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error loading data from backend';
        console.error(err);
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Listen to Supabase auth state changes
    try {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const { user } = await res.json();
            if (user) {
              setCurrentUser(user);
              localStorage.setItem('activeUserId', user.id);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          localStorage.removeItem('activeUserId');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Supabase client might not have credentials configured yet
    }
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Signout warning:', e);
    }
    setCurrentUser(null);
    localStorage.removeItem('activeUserId');
    setCurrentView('home');
  };

  const saveReceiptsToDb = async (updatedReceipts: Receipt[]) => {
    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReceipts),
      });
      if (!res.ok) throw new Error('Failed to save data');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save';
      console.error(err);
      alert('Error updating database: ' + msg);
    }
  };

  const handleUpdateReceiptStatus = async (id: string, status: string) => {
    const updated = receipts.map(r => r.id === id ? { ...r, paymentStatus: status } : r);
    setReceipts(updated);
    await saveReceiptsToDb(updated);

    // If updating from inside detail view, refresh it
    if (selectedReceipt && selectedReceipt.id === id) {
      setSelectedReceipt({ ...selectedReceipt, paymentStatus: status });
    }
  };

  const handleToggleArchive = async (id: string) => {
    const updated = receipts.map(r => r.id === id ? { ...r, archived: !r.archived } : r);
    setReceipts(updated);
    await saveReceiptsToDb(updated);

    // If updating from inside detail view, refresh it
    if (selectedReceipt && selectedReceipt.id === id) {
      setSelectedReceipt(updated.find(r => r.id === id) || null);
    }
  };

  const handleSaveReceipt = async (savedReceipt: Receipt, isEdit: boolean) => {
    let updated;
    const finalReceipt = {
      ...savedReceipt,
      issuedBy: savedReceipt.issuedBy || currentUser?.name || 'Legacy User'
    };

    if (isEdit) {
      updated = receipts.map(r => r.id === finalReceipt.id ? finalReceipt : r);
    } else {
      updated = [finalReceipt, ...receipts];
    }
    setReceipts(updated);
    await saveReceiptsToDb(updated);

    setSelectedReceipt(finalReceipt);
    setCurrentView('view');
    setEditingReceipt(null);
  };

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setCurrentView('view');
  };

  const handleEditReceipt = (receipt: Receipt) => {
    setEditingReceipt(receipt);
    setCurrentView('new');
  };

  const openNewReceipt = () => {
    setEditingReceipt(null);
    setCurrentView('new');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-tailor-bg h-full w-full">
        <div className="w-10 h-10 border-4 border-tailor-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-tailor-primary mt-4">
          {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading data...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-tailor-bg p-5 text-center">
        <div className="text-red-500 mb-3"><IconAlert /></div>
        <p className="text-sm font-bold text-tailor-text">{language === 'bn' ? 'ত্রুটি ঘটেছে' : 'Something went wrong'}</p>
        <p className="text-xs text-tailor-textMuted mt-1">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-tailor-primary text-white text-xs font-bold rounded-lg">
          {language === 'bn' ? 'পুনরায় চেষ্টা করুন' : 'Retry'}
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginView users={users} setUsers={setUsers} onLogin={(u) => {
      setCurrentUser(u);
      localStorage.setItem('activeUserId', u.id);
    }} language={language} />;
  }

  return (
    <div className="h-full flex flex-col w-full bg-tailor-bg relative">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {currentView === 'users' && (
           <UserManagementView 
             users={users} 
             setUsers={setUsers} 
             currentUser={currentUser}
             onLogout={handleLogout}
             onBack={() => setCurrentView('home')}
             language={language}
           />
        )}
        {currentView === 'home' && (
          <HomeView
            receipts={receipts}
            onView={handleViewReceipt}
            onToggleArchive={handleToggleArchive}
            onUpdateStatus={handleUpdateReceiptStatus}
            onNavigateStats={() => setCurrentView('stats')}
            onNavigateUsers={() => setCurrentView('users')}
            currentUser={currentUser}
            language={language}
            setLanguage={setLanguage}
          />
        )}
        {currentView === 'stats' && (
          <StatsView
            receipts={receipts}
            onBack={() => setCurrentView('home')}
            language={language}
          />
        )}
        {currentView === 'new' && (
          <NewReceiptView
            initialData={editingReceipt}
            onBack={() => setCurrentView(editingReceipt ? 'view' : 'home')}
            onSave={handleSaveReceipt}
            language={language}
          />
        )}
        {currentView === 'view' && (
          <ReceiptDetailView
            receipt={selectedReceipt}
            onBack={() => setCurrentView('home')}
            onEdit={handleEditReceipt}
            onUpdateStatus={handleUpdateReceiptStatus}
            onToggleArchive={handleToggleArchive}
            language={language}
          />
        )}
      </div>

      {/* Floating Action Button for Home View */}
      {currentView === 'home' && (
        <div className="absolute bottom-[40px] left-0 right-0 flex justify-center z-50 pointer-events-none">
          <button
            onClick={openNewReceipt}
            className="bg-green-600 text-white px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:bg-green-700 transition-all pointer-events-auto"
          >
            <IconPlus />
            <span className="font-bold text-sm">{language === 'bn' ? 'নতুন রসিদ' : 'New Receipt'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Home View
interface HomeViewProps {
  receipts: Receipt[];
  onView: (receipt: Receipt) => void;
  onToggleArchive: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onNavigateStats: () => void;
  onNavigateUsers: () => void;
  currentUser?: User | null;
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
}

// ----------------------------------------------------------------------
// LOGIN VIEW
// ----------------------------------------------------------------------
const LoginView = ({
  users,
  onLogin,
  language,
}: {
  users: User[];
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  onLogin: (u: User) => void;
  language: string;
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth_error')) {
        return language === 'bn'
          ? 'গুগল সাইন-ইন সম্পন্ন করা যায়নি। Supabase কনফিগারেশন চেক করুন।'
          : 'Google sign-in could not be completed. Please check your Supabase settings and try again.';
      }
    }
    return null;
  });

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setLoginError(null);
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google Sign-In failed';
      console.error('Google sign-in error:', err);
      setLoginError(msg);
      setIsGoogleLoading(false);
    }
  };

  const handleStaffLogin = () => {
    const user = users.find((u) => u.id === selectedUserId);
    if (!user) return alert(language === 'bn' ? 'অনুগ্রহ করে ইউজার নির্বাচন করুন' : 'Select a user');
    if (user.password && user.password !== password)
      return alert(language === 'bn' ? 'ভুল পাসওয়ার্ড' : 'Invalid password');
    onLogin(user);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-tailor-bg p-6 h-full w-full">
      <div className="bg-white p-7 rounded-3xl shadow-xl border border-tailor-border w-full max-w-sm">
        {/* Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-sm">
            <IconScissors />
          </div>
          <h2 className="text-2xl font-black text-tailor-text tracking-tight">
            {language === 'bn' ? 'দাস টেইলার্স' : 'Das Tailors'}
          </h2>
          <p className="text-xs text-tailor-textMuted mt-1 font-medium">
            {language === 'bn'
              ? 'ক্লাউড রসিদ ও বিলিং সফটওয়্যার'
              : 'Cloud Receipts & Billing App'}
          </p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold leading-relaxed">
            {loginError}
          </div>
        )}

        {/* Primary CTA: Google OAuth Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 active:border-gray-400 rounded-xl font-bold text-xs text-gray-700 shadow-sm hover:shadow flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <IconGoogle />
          )}
          <span>
            {isGoogleLoading
              ? language === 'bn'
                ? 'সংযোগ করা হচ্ছে...'
                : 'Connecting to Google...'
              : language === 'bn'
              ? 'গুগল দিয়ে সাইন ইন করুন'
              : 'Sign in with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 absolute">
            {language === 'bn' ? 'অথবা স্টাফ পিন' : 'Or Staff PIN'}
          </span>
        </div>

        {/* Staff selection & PIN login */}
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-tailor-textMuted mb-1">
              {language === 'bn' ? 'স্টাফ একাউন্ট' : 'Staff Profile'}
            </label>
            <select
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold text-tailor-text focus:border-indigo-500 focus:bg-white transition-colors"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">
                {language === 'bn' ? 'প্রোফাইল নির্বাচন করুন...' : 'Select Profile...'}
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-tailor-textMuted mb-1">
              {language === 'bn' ? 'পাসওয়ার্ড / পিন' : 'Password / PIN'}
            </label>
            <input
              type="password"
              placeholder="••••"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-xs font-bold text-tailor-text focus:border-indigo-500 focus:bg-white transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStaffLogin()}
            />
          </div>

          <button
            onClick={handleStaffLogin}
            className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 cursor-pointer mt-1"
          >
            {language === 'bn' ? 'প্রবেশ করুন' : 'Enter'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// USER MANAGEMENT VIEW
// ----------------------------------------------------------------------
interface UserManagementViewProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  currentUser: User | null;
  onLogout: () => void;
  onBack: () => void;
  language: 'bn' | 'en';
}

const UserManagementView = ({
  users,
  setUsers,
  currentUser,
  onLogout,
  onBack,
  language,
}: UserManagementViewProps) => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserPass, setNewUserPass] = useState('');

  const saveUsersToDb = async (newUsers: User[]) => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsers),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    const newUser = {
      id: Date.now().toString(),
      name: newUserName.trim(),
      password: newUserPass,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setNewUserName('');
    setNewUserPass('');
    await saveUsersToDb(updated);
  };

  const handleDelete = async (id: string) => {
    if (id === currentUser?.id) return alert("Can't delete active user");
    if (confirm('Delete user?')) {
      const updated = users.filter((u: User) => u.id !== id);
      setUsers(updated);
      await saveUsersToDb(updated);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full">
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-tailor-text transition-colors"
          >
            <IconBack />
          </button>
          <h2 className="font-bold text-tailor-text">
            {language === 'bn' ? 'ব্যবহারকারী ও অ্যাকাউন্ট' : 'Account & Team'}
          </h2>
        </div>
        <button
          onClick={onLogout}
          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold border border-red-200 transition-colors"
        >
          {language === 'bn' ? 'লগআউট' : 'Logout'}
        </button>
      </div>

      <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
        {/* Active Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-base text-indigo-700">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-tailor-text truncate">
                {currentUser?.name}
              </h3>
              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-tailor-textMuted truncate">
              {currentUser?.email || 'Local Staff Account'}
            </p>
            {currentUser?.email && (
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-indigo-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                Google OAuth via Supabase
              </div>
            )}
          </div>
        </div>

        {/* Add Team Member Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-3 text-sm text-tailor-text">
            {language === 'bn' ? 'নতুন স্টাফ প্রোফাইল যোগ করুন' : 'Add Staff Profile'}
          </h3>
          <input
            type="text"
            placeholder={language === 'bn' ? 'নাম' : 'Name'}
            className="w-full mb-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs font-bold text-tailor-text focus:border-indigo-500 focus:bg-white"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder={language === 'bn' ? 'পিন / পাসওয়ার্ড' : 'PIN / Password'}
            className="w-full mb-3 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs font-bold text-tailor-text focus:border-indigo-500 focus:bg-white"
            value={newUserPass}
            onChange={(e) => setNewUserPass(e.target.value)}
          />
          <button
            onClick={handleAddUser}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg font-bold text-xs shadow transition-all cursor-pointer"
          >
            {language === 'bn' ? 'প্রোফাইল যোগ করুন' : 'Add Profile'}
          </button>
        </div>

        {/* Existing Team Members */}
        <div>
          <h3 className="font-bold mb-2 text-xs uppercase tracking-wider text-tailor-textMuted px-1">
            {language === 'bn' ? 'সকল টিম মেম্বার' : 'All Staff Members'}
          </h3>
          <div className="flex flex-col gap-2">
            {users.map((u: User) => (
              <div
                key={u.id}
                className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
                    {u.avatarUrl ? (
                      <img
                        src={u.avatarUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      u.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-tailor-text truncate">
                      {u.name}{' '}
                      {u.id === currentUser?.id && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1">
                          You
                        </span>
                      )}
                    </p>
                    {u.email && (
                      <p className="text-[11px] text-gray-400 truncate">{u.email}</p>
                    )}
                  </div>
                </div>
                {u.id !== currentUser?.id && (
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="p-1.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                  >
                    <IconTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeView = ({ receipts, onView, onToggleArchive, onNavigateStats, onNavigateUsers, currentUser, language, setLanguage }: HomeViewProps) => {
  const todayStr = useMemo(() => formatDisplayDate(new Date().toISOString()), []);
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'archive'>('active');

  // Filter and sort logic
  const filteredReceipts = useMemo(() => {
    // 1. Filter by active/archived tab
    let filtered = receipts.filter(r => activeTab === 'active' ? !r.archived : !!r.archived);

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.id.toLowerCase().includes(query) ||
        r.customerName.toLowerCase().includes(query)
      );
    }

    // 3. Sort by due dates (ascending - nearest deadline first)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.dueDate || a.date).getTime();
      const dateB = new Date(b.dueDate || b.date).getTime();
      return dateA - dateB;
    });
  }, [receipts, activeTab, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50">
      {/* Header */}
      <div className="bg-white pt-4 pb-3 px-5 border-b border-tailor-border relative flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-tailor-text">{language === 'bn' ? 'দাস টেইলার্স' : "Das Tailors"}</h1>
          <p className="text-xs text-tailor-textMuted font-medium">{todayStr}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateStats}
            className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            <IconChart /> {language === 'bn' ? 'স্ট্যাটস' : 'Stats'}
          </button>
          <div className="flex bg-indigo-50 border border-indigo-100 rounded-full p-1 cursor-pointer">
            <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${language === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-700 hover:bg-indigo-100'}`}>EN</button>
            <button onClick={() => setLanguage('bn')} className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${language === 'bn' ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-700 hover:bg-indigo-100'}`}>BN</button>
          </div>
          <button
            onClick={onNavigateUsers}
            className="p-1 bg-gray-100 hover:bg-gray-200 text-tailor-text rounded-full transition-colors ml-1 w-8 h-8 flex items-center justify-center overflow-hidden border border-gray-200"
            title={currentUser ? currentUser.name : "Manage Users"}
          >
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            ) : currentUser?.name ? (
              <span className="font-bold text-xs text-indigo-700">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <IconUser />
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-5 mt-6 pb-28">

        {/* Tabs Control */}
        <div className="flex bg-white rounded-xl border border-tailor-border p-1 mb-5 shadow-sm">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 text-center font-bold text-xs rounded-lg transition-all ${activeTab === 'active'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-tailor-textMuted hover:text-green-700 hover:bg-green-50'
              }`}
          >
            {language === 'bn' ? 'চলতি রসিদ (Active)' : 'Active'}
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex-1 py-2 text-center font-bold text-xs rounded-lg transition-all ${activeTab === 'archive'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-tailor-textMuted hover:text-amber-800 hover:bg-amber-100'
              }`}
          >
            {language === 'bn' ? 'আর্কাইভ (Archive)' : 'Archive'}
          </button>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h2 className={`text-lg font-bold flex items-center gap-2 ${activeTab === 'active' ? 'text-green-700' : 'text-amber-700'}`}>
            {activeTab === 'active'
              ? (language === 'bn' ? 'চলতি রসিদসমূহ' : 'Active Receipts')
              : (language === 'bn' ? 'আর্কাইভকৃত রসিদসমূহ' : 'Archived Receipts')
            }
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {filteredReceipts.length}
            </span>
          </h2>
        </div>

        {/* Search Bar */}
        {receipts.length > 0 && (
          <div className="bg-white flex items-center px-4 py-3 rounded-xl border border-tailor-border mb-4 shadow-sm">
            <span className="text-tailor-textMuted mr-3"><IconSearch /></span>
            <input
              type="text"
              placeholder={language === 'bn' ? 'রসিদ নম্বর বা নাম দিয়ে খুঁজুন...' : 'Search by receipt # or name...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent font-medium"
            />
          </div>
        )}

        {/* Receipts List */}
        {filteredReceipts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-70">
            <div className="bg-red-50 p-4 rounded-full text-tailor-primary mb-3"><IconScissors /></div>
            <h3 className="font-bold text-tailor-text">
              {activeTab === 'active'
                ? (language === 'bn' ? 'কোনো চলতি রসিদ নেই' : 'No active receipts')
                : (language === 'bn' ? 'কোনো আর্কাইভ রসিদ নেই' : 'No archived receipts')
              }
            </h3>
            <p className="text-sm text-tailor-textMuted mt-1 text-center">
              {activeTab === 'active'
                ? (language === 'bn' ? 'প্রথম বিল তৈরি করতে নিচে বাটনে ট্যাপ করুন।' : 'Tap + below to create your first bill.')
                : (language === 'bn' ? 'আর্কাইভ করা বিলগুলো এখানে দেখতে পাবেন।' : 'Archived bills will appear here.')
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReceipts.map(receipt => {
              const isUrgent = new Date(receipt.dueDate || receipt.date).getTime() <= new Date(todayIso).getTime();
              const nameColor = 'text-black';
              
              let dateBadgeClass = '';
              if (isUrgent && receipt.paymentStatus !== 'Paid') {
                dateBadgeClass = 'bg-red-50 text-red-700 border-red-300';
              } else if (activeTab === 'active') {
                dateBadgeClass = 'bg-green-50 text-green-700 border-green-300';
              } else {
                dateBadgeClass = 'bg-amber-50 text-amber-700 border-amber-300';
              }

              return (
                <div
                  key={receipt.id}
                  onClick={() => onView(receipt)}
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all cursor-pointer ${activeTab === 'active' ? 'bg-white border-green-200 hover:border-green-400 hover:shadow-md active:bg-green-50' : 'bg-white border-gray-200 opacity-90 hover:opacity-100 hover:border-amber-300 hover:shadow-sm'}`}
                >
                  <div className="flex justify-between items-start w-full gap-2">
                    <p className={`font-bold text-lg leading-tight truncate ${nameColor}`}>{receipt.customerName}</p>
                    <div className={`inline-flex shrink-0 items-center border rounded-md px-2 py-0.5 text-xs font-bold ${dateBadgeClass}`}>
                      {language === 'bn' ? 'ডেলিভারি: ' : 'Due: '} {formatDisplayDate(receipt.dueDate)}
                    </div>
                  </div>

                  <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-bold text-tailor-textMuted">
                        {receipt.items.length} {language === 'bn' ? 'টি আইটেম' : 'items'}
                      </p>
                      <p className="text-[10px] text-tailor-textMuted">
                        {language === 'bn' ? 'তৈরি: ' : 'Created: '} {formatDisplayDate(receipt.date)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className={`font-bold text-lg leading-none ${receipt.paymentStatus === 'Paid' ? 'text-green-600' : receipt.paymentStatus === 'Partial' ? 'text-yellow-600' : 'text-red-600'}`}>₹{receipt.total}</p>
                        <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mt-1.5 border ${receipt.paymentStatus === 'Paid' ? 'border-green-300 bg-green-50 text-green-700' : receipt.paymentStatus === 'Partial' ? 'border-yellow-300 bg-yellow-50 text-yellow-700' : 'border-red-300 bg-red-50 text-red-700'}`}>
                          {receipt.paymentStatus}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleArchive(receipt.id);
                        }}
                        className="p-2.5 rounded-lg transition-colors border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                        title={receipt.archived ? "Unarchive" : "Archive"}
                      >
                        {receipt.archived ? <IconUnarchive /> : <IconArchive />}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// StatCard Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  bg: string;
}
const StatCard = ({ icon, title, value, color, bg }: StatCardProps) => (
  <div className="bg-white rounded-xl p-4 border border-tailor-border flex flex-col justify-between h-28 transition-colors hover:bg-gray-50">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg} ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-tailor-textMuted uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-bold leading-none text-tailor-text">{value}</p>
    </div>
  </div>
);

// New/Edit Receipt View
interface NewReceiptViewProps {
  initialData: Receipt | null;
  onBack: () => void;
  onSave: (receipt: Receipt, isEdit: boolean) => void;
  language: 'bn' | 'en';
}

const NewReceiptView = ({ onBack, onSave, language, initialData }: NewReceiptViewProps) => {
  const isEdit = !!initialData;

  // Clean initial phone number
  let initPhone = (initialData && initialData.customerPhone) || '';
  if (initPhone.startsWith('+91')) initPhone = initPhone.substring(3).trim();
  if (initPhone.startsWith('91') && initPhone.length === 12) initPhone = initPhone.substring(2);

  const [customerName, setCustomerName] = useState((initialData && initialData.customerName) || '');
  const [customerPhone, setCustomerPhone] = useState(initPhone);
  const [dueDate, setDueDate] = useState(() => (initialData && initialData.dueDate) || new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<Item[]>(() => (initialData && initialData.items) || [{ id: 1, type: '', price: '' }]);
  const [paymentMethod, setPaymentMethod] = useState((initialData && initialData.paymentMethod) || 'Cash');
  const [paymentStatus, setPaymentStatus] = useState((initialData && initialData.paymentStatus) || 'Paid');
  const [notes, setNotes] = useState((initialData && initialData.notes) || '');
  const dateInputRef = React.useRef<HTMLInputElement>(null);

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  const total = subtotal;

  const handleAddItem = () => setItems(prev => [...prev, { id: prev.length ? Math.max(...prev.map(i => i.id)) + 1 : 1, type: '', price: '' }]);
  const handleUpdateItem = (id: number, field: keyof Item, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const handleRemoveItem = (id: number) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  const handleSaveClick = () => {
    if (!customerName.trim()) return alert(language === 'bn' ? "গ্রাহকের নাম লিখুন" : "Please enter customer name");
    if (customerPhone && customerPhone.length !== 10) return alert(language === 'bn' ? "ফোন নম্বরটি অবশ্যই ১০ সংখ্যার হতে হবে" : "Phone number must be exactly 10 digits");
    const validItems = items.filter(i => i.type.trim() !== '');
    if (validItems.length === 0) return alert(language === 'bn' ? "অন্তত একটি পোশাকের বিবরণ দিন" : "Please add at least one garment detail");

    const generatedId = generateReceiptId();

    const newReceipt: Receipt = {
      id: (initialData && initialData.id) || generatedId,
      date: (initialData && initialData.date) || new Date().toISOString(),
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      customerName,
      customerPhone,
      items: validItems.map(i => ({ id: i.id || Date.now() + Math.random(), type: i.type, price: i.price })),
      subtotal,
      discount: 0,
      taxPercent: 0,
      total,
      paymentMethod,
      paymentStatus,
      notes,
      archived: (initialData && initialData.archived) || false
    };
    onSave(newReceipt, isEdit);
  };

  return (
    <div className="flex-1 flex flex-col bg-tailor-bg h-full">
      {/* Header */}
      <div className="bg-tailor-bg pt-10 pb-4 px-4 flex items-center border-b border-tailor-border sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-tailor-text"><IconBack /></button>
        <h1 className="flex-1 text-center font-bold text-lg mr-6">
          {isEdit ? (language === 'bn' ? 'রসিদ সম্পাদনা' : 'Edit Receipt') : (language === 'bn' ? 'নতুন রসিদ' : 'New Receipt')}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-6">

        {/* Customer Section */}
        <section className="bg-white p-4 rounded-2xl border border-tailor-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-tailor-primary bg-indigo-50 p-1.5 rounded-lg"><IconUser /></div>
            <h2 className="text-sm font-bold text-tailor-primary">{language === 'bn' ? 'গ্রাহক' : 'Customer'}</h2>
          </div>
          <div className="rounded-xl border border-tailor-border overflow-hidden bg-gray-50/50">
            <div className="flex items-center px-4 py-3 border-b border-tailor-border focus-within:bg-white transition-colors">
              <input type="text" placeholder={language === 'bn' ? "গ্রাহকের নাম *" : "Customer name *"} value={customerName} onChange={e => setCustomerName(e.target.value)} className="flex-1 outline-none text-sm bg-transparent font-bold placeholder:font-normal text-tailor-text" />
            </div>
            <div className="flex items-center px-4 py-3 focus-within:bg-white transition-colors">
              <span className="text-tailor-text font-bold mr-2 text-sm">+91</span>
              <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={10} placeholder={language === 'bn' ? "ফোন নম্বর" : "Phone number"} value={customerPhone} onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="flex-1 outline-none text-sm font-bold bg-transparent placeholder:font-normal" />
            </div>
          </div>
        </section>

        {/* Due Date Section */}
        <section className="bg-white p-4 rounded-2xl border border-tailor-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-tailor-primary bg-indigo-50 p-1.5 rounded-lg"><IconClock /></div>
            <h2 className="text-sm font-bold text-tailor-primary">{language === 'bn' ? 'ডেলিভারি তারিখ *' : 'Delivery Date *'}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { label: language === 'bn' ? 'আজ' : 'Today', days: 0 },
              { label: language === 'bn' ? 'আগামীকাল' : 'Tomorrow', days: 1 },
              { label: language === 'bn' ? '৩ দিন' : '3 Days', days: 3 },
              { label: language === 'bn' ? '১ সপ্তাহ' : '1 Week', days: 7 },
              { label: language === 'bn' ? '২ সপ্তাহ' : '2 Weeks', days: 14 }
            ].map(opt => (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + opt.days);
                  setDueDate(d.toISOString().split('T')[0]);
                }}
                className="whitespace-nowrap px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-purple-700 hover:bg-purple-100 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            className="rounded-xl border border-tailor-border overflow-hidden bg-gray-50/50 flex items-center px-4 py-3 hover:bg-white transition-colors cursor-pointer"
            onClick={() => {
              try {
                dateInputRef.current?.showPicker();
              } catch {
                dateInputRef.current?.focus();
              }
            }}
          >
            <span className="flex-1 text-sm font-bold text-tailor-text">
              {dueDate ? formatDisplayDate(dueDate) : (language === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Select Date')}
            </span>
            <input
              ref={dateInputRef}
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
              className="w-0 h-0 opacity-0 overflow-hidden absolute -z-10"
            />
          </div>
        </section>

        {/* Items Section */}
        <section className="bg-white p-4 rounded-2xl border border-tailor-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-tailor-primary bg-indigo-50 p-1.5 rounded-lg"><IconScissors /></div>
            <h2 className="text-sm font-bold text-tailor-primary">{language === 'bn' ? 'পোশাক ও আইটেম' : 'Items'}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {['Saree', 'Blouse', 'Dress', 'Alteration', 'Pant', 'Shirt'].map(garment => (
              <button
                key={garment}
                type="button"
                onClick={() => {
                  const emptyItemIndex = items.findIndex(i => i.type.trim() === '');
                  if (emptyItemIndex >= 0) {
                    handleUpdateItem(items[emptyItemIndex].id, 'type', garment);
                  } else {
                    setItems([...items, { id: Date.now(), type: garment, price: '' }]);
                  }
                }}
                className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-purple-700 hover:bg-purple-100 transition-colors"
              >
                + {garment}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-tailor-border p-3 flex gap-2 bg-gray-50/50 relative group">
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <input type="text" placeholder={language === 'bn' ? "পোশাকের ধরন..." : "Garment type..."} value={item.type} onChange={e => handleUpdateItem(item.id, 'type', e.target.value)} className="w-full outline-none text-sm font-bold  border-gray-300 pb-1 focus:border-tailor-primary transition-colors bg-transparent text-tailor-text placeholder:font-normal" />
                </div>
                <div className="w-24 flex items-center border-l border-gray-200 pl-2">
                  <span className="text-green-600 text-sm font-bold mr-1">₹</span>
                  <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" value={item.price} onChange={e => handleUpdateItem(item.id, 'price', e.target.value.replace(/\D/g, ''))} className="w-full outline-none text-sm font-bold text-right bg-transparent text-green-600 placeholder:text-green-600/50" />
                </div>
                {items.length > 1 && (
                  <button onClick={() => handleRemoveItem(item.id)} className="absolute -top-2 -right-2 bg-red-50 text-red-600 rounded-full p-1 shadow-sm border border-red-100 hover:bg-red-100">
                    <IconTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleAddItem} className="w-full mt-3 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 hover:border-indigo-300 active:bg-indigo-200 transition-colors">
            <IconPlus /> {language === 'bn' ? 'আরও একটি পোশাক যোগ করুন' : 'Add another garment'}
          </button>
        </section>

        {/* Payment Details Section */}
        <section className="bg-white p-4 rounded-2xl border border-tailor-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-tailor-primary bg-indigo-50 p-1.5 rounded-lg"><IconMoney /></div>
            <h2 className="text-sm font-bold text-tailor-primary">{language === 'bn' ? 'পেমেন্ট' : 'Payment Details'}</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-tailor-textMuted uppercase tracking-wider mb-1.5">{language === 'bn' ? 'পেমেন্ট স্ট্যাটাস' : 'Status'}</label>
              <div className="flex rounded-xl overflow-hidden border border-tailor-border">
                {['Paid', 'Pending', 'Partial'].map((status, i) => {
                  const getSelectedBg = (s: string) => {
                    if (s === 'Paid') return 'bg-green-600 text-white';
                    if (s === 'Partial') return 'bg-yellow-600 text-white';
                    return 'bg-red-600 text-white';
                  };
                  return (
                  <button key={status} type="button" onClick={() => setPaymentStatus(status)} className={`flex-1 py-2 text-sm font-bold transition-colors ${paymentStatus === status ? getSelectedBg(status) : 'bg-gray-50/50 text-tailor-text hover:bg-gray-100'} ${i < 2 ? 'border-r border-tailor-border' : ''}`}>
                    {status}
                  </button>
                )})}
              </div>
            </div>
            {paymentStatus !== 'Pending' && (
              <div>
                <label className="block text-[10px] font-bold text-tailor-textMuted uppercase tracking-wider mb-1.5">{language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Method'}</label>
                <div className="flex rounded-xl overflow-hidden border border-tailor-border">
                  {['Cash', 'UPI'].map(method => {
                    const isSelected = paymentMethod === method;
                    const selectedBg = method === 'Cash' ? 'bg-green-600 text-white border-green-600' : 'bg-tailor-primary text-white border-tailor-primary';
                    return (
                    <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`flex-1 py-2 text-sm font-bold transition-colors ${isSelected ? selectedBg : 'bg-gray-50/50 text-tailor-text hover:bg-gray-100'} ${method === 'Cash' && !isSelected ? 'border-r border-tailor-border' : ''}`}>
                      {method}
                    </button>
                  )})}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Notes Section */}
        <section className="bg-white p-4 rounded-2xl border border-tailor-border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-tailor-primary bg-indigo-50 p-1.5 rounded-lg"><IconEdit /></div>
            <h2 className="text-sm font-bold text-tailor-primary">{language === 'bn' ? 'নোট' : 'Notes'}</h2>
          </div>
          <textarea placeholder={language === 'bn' ? "যেমন: শুক্রবারের মধ্যে ডেলিভারি..." : "e.g. Delivery by Friday, urgent..."} value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-gray-50/50 rounded-xl border border-tailor-border p-3 text-sm outline-none resize-none focus:ring-1 ring-tailor-primary"></textarea>
        </section>
      </div>

      {/* Footer sticky bar */}
      <div className="bg-white border-t border-tailor-border p-4 pb-safe flex justify-between items-center fixed bottom-0 w-full max-w-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-tailor-textMuted uppercase tracking-wider">TOTAL</p>
          <p className="text-2xl font-bold leading-none">₹{Math.round(total)}</p>
        </div>
        <button onClick={handleSaveClick} className="bg-tailor-primary text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 active:bg-tailor-primaryDark transition-colors">
          {isEdit ? <IconEdit /> : <IconPlus />} {language === 'bn' ? (isEdit ? 'আপডেট করুন' : 'সংরক্ষণ করুন') : (isEdit ? 'Update Receipt' : 'Save & Generate')}
        </button>
      </div>
    </div>
  );
};

// Receipt Detail View
interface ReceiptDetailViewProps {
  receipt: Receipt | null;
  onBack: () => void;
  onEdit: (receipt: Receipt) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onToggleArchive: (id: string) => void;
  language: 'bn' | 'en';
}

const ReceiptDetailView = ({ receipt, onBack, onEdit, onUpdateStatus, onToggleArchive, language }: ReceiptDetailViewProps) => {
  if (!receipt) return null;

  const handleShareWhatsApp = () => {
    const text = `*Das Tailors Receipt*\nOrder ID: ${receipt.id}\nDate: ${formatDisplayDate(receipt.date)}\nDue Date: ${formatDisplayDate(receipt.dueDate)}\n------------------------\n*Customer:* ${receipt.customerName}\n${receipt.customerPhone ? `Phone: +91 ${receipt.customerPhone}\n` : ''}------------------------\n*Items:*\n${receipt.items.map(i => `- ${i.type}: ₹${i.price || 0}`).join('\n')}\n------------------------\n*Total: ₹${Math.round(receipt.total)}*\n------------------------\nStatus: *${receipt.paymentStatus}* (${receipt.paymentMethod})\n${receipt.notes ? `\nNotes: ${receipt.notes}` : ''}\n Hope to see you again at Das Tailor!`;

    // Clean customer phone number
    let rawNumber = receipt.customerPhone.replace(/\D/g, '');
    if (rawNumber) {
      if (rawNumber.length === 10) rawNumber = '91' + rawNumber;
      else if (!rawNumber.startsWith('91')) rawNumber = '91' + rawNumber;
    }

    if (rawNumber) {
      const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    } else {
      alert(language === 'bn' ? 'গ্রাহকের ফোন নম্বর দেওয়া নেই!' : 'No phone number provided!');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-tailor-bg h-full">
      {/* Sticky Header with Actions */}
      <div className="bg-white pt-10 pb-4 px-4 flex items-center justify-between border-b border-tailor-border sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-tailor-text"><IconBack /></button>
        <h1 className="font-bold">{language === 'bn' ? 'রসিদের বিবরণ' : 'Receipt Details'}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(receipt)}
            className="p-1 text-tailor-primary bg-indigo-50 rounded-full shadow-sm border border-indigo-100 flex items-center justify-center w-8 h-8"
            title={language === 'bn' ? 'সম্পাদনা' : 'Edit'}
          >
            <IconEdit />
          </button>
        </div>
      </div>

      {/* Bill Layout */}
      <div className="flex-1 overflow-y-auto p-5 pb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-tailor-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-tailor-primary"></div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-tailor-primary uppercase tracking-widest">Das Tailors</h2>
            <p className="text-xs text-tailor-textMuted mt-1">Receipt #{receipt.id}</p>
            <p className="text-xs text-tailor-textMuted mt-0.5">{language === 'bn' ? 'তৈরির তারিখ' : 'Created'}: {formatDisplayDate(receipt.date)}</p>
            <p className="text-xs text-tailor-primary font-bold">{language === 'bn' ? 'ডেলিভারি তারিখ' : 'Due Date'}: {formatDisplayDate(receipt.dueDate)}</p>
            <p className="text-xs text-tailor-textMuted mt-1">{language === 'bn' ? 'প্রস্তুতকারক' : 'Issued by'}: <span className="font-bold text-tailor-text">{receipt.issuedBy || 'Legacy User'}</span></p>
          </div>

          <div className="mb-6 border-b border-dashed border-gray-300 pb-4">
            <p className="text-xs font-bold text-tailor-textMuted uppercase mb-1">{language === 'bn' ? 'বিল পাঠানো হয়েছে' : 'Billed To'}</p>
            <p className="font-bold text-lg">{receipt.customerName}</p>
            {receipt.customerPhone && <p className="text-sm text-tailor-textMuted">+91 {receipt.customerPhone}</p>}
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-tailor-textMuted uppercase mb-3">{language === 'bn' ? 'আইটেমসমূহ' : 'Items'}</p>
            <div className="space-y-3">
              {receipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="font-medium">{item.type}</span>
                  <span>₹{item.price || 0}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-b py-4 border-gray-200 mb-6 space-y-2">
            <div className="flex justify-between font-bold text-xl">
              <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
              <span className="text-green-600">₹{Math.round(receipt.total)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-[10px] font-bold text-tailor-textMuted uppercase mb-1">Status</p>
              <div className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase ${receipt.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : receipt.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {receipt.paymentStatus}
              </div>
            </div>
            {receipt.paymentStatus !== 'Pending' && (
              <div className="text-right">
                <p className="text-[10px] font-bold text-tailor-textMuted uppercase mb-1">Method</p>
                <p className="font-bold text-sm">{receipt.paymentMethod}</p>
              </div>
            )}
          </div>

          {receipt.notes && (
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg italic">
              <span className="font-bold not-italic">Notes: </span>{receipt.notes}
            </div>
          )}
        </div>

        {/* Share Action */}
        <button onClick={handleShareWhatsApp} className="w-full mt-4 bg-[#25D366] text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:bg-[#1DA851] transition-all active:scale-[0.98]">
          <IconShare /> {language === 'bn' ? 'হোয়াটসঅ্যাপে শেয়ার করুন' : 'Share via WhatsApp'}
        </button>

        {/* Paid Status Toggle */}
        {receipt.paymentStatus !== 'Paid' && (
          <button onClick={() => onUpdateStatus(receipt.id, 'Paid')} className="w-full mt-4 bg-green-100 text-green-700 py-3.5 rounded-xl font-bold border border-green-200 hover:bg-green-200 active:bg-green-300 transition-all flex items-center justify-center gap-2">
            <IconCheck /> {language === 'bn' ? 'পেইড হিসেবে চিহ্নিত করুন' : 'Mark as Paid'}
          </button>
        )}

        {/* Archive Action */}
        <button
          onClick={() => onToggleArchive(receipt.id)}
          className={`w-full mt-4 py-3.5 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 ${receipt.archived
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 active:bg-indigo-200'
              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 active:bg-amber-200'
            }`}
        >
          {receipt.archived ? <IconUnarchive /> : <IconArchive />}
          {receipt.archived
            ? (language === 'bn' ? 'চলতি রসিদে ফেরত পাঠান' : 'Restore from Archive')
            : (language === 'bn' ? 'রসিদটি আর্কাইভ করুন' : 'Archive Receipt')
          }
        </button>
      </div>
    </div>
  );
};

// Stats View
interface StatsViewProps {
  receipts: Receipt[];
  onBack: () => void;
  language: 'bn' | 'en';
}

const StatsView = ({ receipts, onBack, language }: StatsViewProps) => {
  const stats = useMemo(() => {
    const todayIso = new Date().toISOString().split('T')[0];
    let todayRevenue = 0;
    let todayBills = 0;
    let todayPendingCount = 0;
    let todayDueAmount = 0;

    let allTimeRevenue = 0;
    let allTimeBills = 0;
    let allTimePendingCount = 0;
    let allTimeDueAmount = 0;

    receipts.forEach(r => {
      const rDate = r.date.split('T')[0];
      const isToday = rDate === todayIso;
      
      allTimeBills++;
      if (isToday) todayBills++;

      let paidAmt = 0;
      let dueAmt = 0;

      if (r.paymentStatus === 'Paid') {
        paidAmt = r.total;
      } else if (r.paymentStatus === 'Partial') {
        paidAmt = r.amountPaid || 0;
        dueAmt = r.total - paidAmt;
      } else {
        dueAmt = r.total;
      }

      allTimeRevenue += paidAmt;
      allTimeDueAmount += dueAmt;
      if (dueAmt > 0) allTimePendingCount++;

      if (isToday) {
        todayRevenue += paidAmt;
        todayDueAmount += dueAmt;
        if (dueAmt > 0) todayPendingCount++;
      }
    });

    return {
      todayRevenue, todayBills, todayPendingCount, todayDueAmount,
      allTimeRevenue, allTimeBills, allTimePendingCount, allTimeDueAmount
    };
  }, [receipts]);

  return (
    <div className="flex-1 flex flex-col bg-tailor-bg h-full">
      <div className="bg-white pt-10 pb-4 px-4 flex items-center border-b border-tailor-border sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-tailor-text"><IconBack /></button>
        <h1 className="flex-1 text-center font-bold text-lg mr-6">
          {language === 'bn' ? 'আজকের স্ট্যাটস' : "Today's Stats"}
        </h1>
      </div>

      <div className="p-5 overflow-y-auto no-scrollbar space-y-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-tailor-textMuted mb-2 px-1">
            {language === 'bn' ? 'আজকের তথ্য' : "Today's Summary"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<IconMoney />} title={language === 'bn' ? "আজকের আয়" : "TODAY'S REVENUE"} value={`₹${stats.todayRevenue}`} color="text-tailor-text" bg="bg-gray-100" />
            <StatCard icon={<IconBill />} title={language === 'bn' ? "আজকের বিল" : "BILLS TODAY"} value={stats.todayBills} color="text-tailor-text" bg="bg-gray-100" />
            <StatCard icon={<IconClock />} title={language === 'bn' ? "বাকি বিল" : "PENDING BILLS"} value={stats.todayPendingCount} color="text-tailor-text" bg="bg-gray-100" />
            <StatCard icon={<IconAlert />} title={language === 'bn' ? "বকেয়া পরিমাণ" : "AMOUNT DUE"} value={`₹${stats.todayDueAmount}`} color="text-tailor-text" bg="bg-gray-100" />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-tailor-textMuted mb-2 px-1">
            {language === 'bn' ? 'সর্বমোট পরিসংখ্যান' : "All-Time Overview"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<IconMoney />} title={language === 'bn' ? "মোট আয়" : "ALL-TIME REVENUE"} value={`₹${stats.allTimeRevenue}`} color="text-green-700" bg="bg-green-50" />
            <StatCard icon={<IconBill />} title={language === 'bn' ? "মোট বিল" : "TOTAL BILLS"} value={stats.allTimeBills} color="text-indigo-700" bg="bg-indigo-50" />
            <StatCard icon={<IconClock />} title={language === 'bn' ? "মোট বাকি বিল" : "PENDING BILLS"} value={stats.allTimePendingCount} color="text-amber-700" bg="bg-amber-50" />
            <StatCard icon={<IconAlert />} title={language === 'bn' ? "মোট বকেয়া" : "TOTAL DUE"} value={`₹${stats.allTimeDueAmount}`} color="text-red-700" bg="bg-red-50" />
          </div>
        </div>
      </div>
    </div>
  );
};
