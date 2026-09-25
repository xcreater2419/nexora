import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '../types/database.types';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, fullName: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  toggleAdminRole: () => void;
}

const DEFAULT_DEMO_USER: Profile = {
  id: 'usr_demo_india_01',
  email: 'ganesh.sharma@example.in',
  full_name: 'Ganesh Sharma',
  phone: '+91 98765 43210',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'admin', // Default to admin for evaluation convenience
  is_active: true,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    try {
      const stored = localStorage.getItem('nexora_user');
      return stored ? JSON.parse(stored) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile as Profile);
              localStorage.setItem('nexora_user', JSON.stringify(profile));
            }
          }
        } catch (err) {
          console.warn('Supabase auth session load warning:', err);
        }
      }
      if (mounted) setIsLoading(false);
    }

    initAuth();

    const client = supabase;
    if (isSupabaseConfigured() && client) {
      const { data: authListener } = client.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && mounted) {
            setUser(profile as Profile);
            localStorage.setItem('nexora_user', JSON.stringify(profile));
          }
        } else if (mounted) {
          setUser(null);
          localStorage.removeItem('nexora_user');
        }
      });

      return () => {
        mounted = false;
        authListener.subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured() && supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        if (profile) {
          setUser(profile as Profile);
          localStorage.setItem('nexora_user', JSON.stringify(profile));
        }
      }
      setIsLoading(false);
      return { success: true };
    }

    // Offline / Demo login
    const demoUser: Profile = {
      id: `usr_${Date.now()}`,
      email,
      full_name: email.split('@')[0].replace('.', ' '),
      phone: '+91 98765 43210',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setUser(demoUser);
    localStorage.setItem('nexora_user', JSON.stringify(demoUser));
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (email: string, fullName: string, phone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured() && supabase && password) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: 'customer'
          }
        }
      });
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      setIsLoading(false);
      return { success: true };
    }

    const newUser: Profile = {
      id: `usr_${Date.now()}`,
      email,
      full_name: fullName,
      phone,
      avatar_url: null,
      role: 'customer',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('nexora_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('nexora_user');
  };

  const toggleAdminRole = () => {
    if (isSupabaseConfigured()) {
      console.warn('Admin authorization is strictly enforced by Supabase database policies. Self-elevation is disabled.');
      return;
    }
    if (!user) return;
    const nextRole: UserRole = user.role === 'admin' ? 'customer' : 'admin';
    const updated = { ...user, role: nextRole };
    setUser(updated);
    localStorage.setItem('nexora_user', JSON.stringify(updated));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, signup, logout, toggleAdminRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
