import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    const res = await signup(email, fullName, phone, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/account');
    } else {
      setErrorMsg(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="container-dense py-8 max-w-md">
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs text-xs space-y-4">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-nexora-800 to-nexora-600 flex items-center justify-center mx-auto text-white font-extrabold text-lg shadow-sm">
            N
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
            Create Your NEXORA Account
          </h1>
          <p className="text-[11px] text-slate-500">
            Enjoy personalized recommendations, order tracking &amp; seamless Cash on Delivery
          </p>
        </div>

        {errorMsg && (
          <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
              />
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Indian Mobile Number *</label>
            <div className="flex">
              <span className="inline-flex items-center px-2 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs rounded-l">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                required
                placeholder="9876543210"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full text-xs pl-3 pr-3 py-2 border border-slate-300 rounded-r focus:ring-1 focus:ring-nexora-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
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
            <label className="block text-slate-700 font-semibold mb-1">Set Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="At least 6 characters"
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
            {isLoading ? 'Creating Account...' : 'Register'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-slate-600 text-[11px] pt-1">
          Already have an account?{' '}
          <Link to="/login" className="text-nexora-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
