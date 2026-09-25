import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/account');
    } else {
      setErrorMsg(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Please enter your email address first to receive password reset instructions.');
      return;
    }
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) {
        alert('Reset request error: ' + error.message);
      } else {
        alert('Password recovery link has been sent to ' + email.trim());
      }
    } else {
      alert('Password reset link simulated for ' + email.trim() + '. In live Supabase mode, an email with a secure token will be dispatched.');
    }
  };

  const handleQuickDemoLogin = async (role: 'customer' | 'admin') => {
    setIsLoading(true);
    const demoEmail = role === 'admin' ? 'admin@nexora.in' : 'ganesh.sharma@example.in';
    await login(demoEmail);
    setIsLoading(false);
    navigate(role === 'admin' ? '/admin' : '/account');
  };

  return (
    <div className="container-dense py-8 max-w-md">
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs text-xs space-y-4">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-nexora-800 to-nexora-600 flex items-center justify-center mx-auto text-white font-extrabold text-lg shadow-sm">
            N
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
            Sign In to NEXORA India
          </h1>
          <p className="text-[11px] text-slate-500">
            Access your orders, saved addresses, and express COD checkout
          </p>
        </div>

        {errorMsg && (
          <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-700 font-semibold">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-nexora-600 hover:underline text-[10px] bg-transparent border-0 p-0 cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow"
          >
            {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Fast Login Pills */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block text-center">
            One-Click Instant Evaluation Logins:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('customer')}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-left transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-nexora-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-800 text-[11px]">Customer</div>
                <div className="text-[9px] text-slate-400">Ganesh Sharma</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 rounded text-left transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-800 text-[11px]">Admin Store</div>
                <div className="text-[9px] text-amber-700">Master Access</div>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center text-slate-600 text-[11px] pt-1">
          Don't have an account?{' '}
          <Link to="/signup" className="text-nexora-600 font-bold hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
};
