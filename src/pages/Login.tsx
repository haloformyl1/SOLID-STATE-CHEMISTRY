import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Lock, Mail, AlertCircle, KeyRound, Loader2, ArrowLeft, Moon, Sun } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { BrandMark } from '../components/BrandMark';

export const Login = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loginMode, setLoginMode] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [adminCode, setAdminCode] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useStore((state) => state.login);
  const adminLogin = useStore((state) => state.adminLogin);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const navigate = useNavigate();

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    const newOtp = generateOTP();

    try {
      await emailjs.send(
        'service_dzy9m19',
        'template_ejptlnn',
        {
          otp: newOtp,
          to_email: email, // This assumes your template supports a to_email field (optional if it just sends to the default address, but good practice)
        },
        'ZMyiGn4yoqfC3P74Q'
      );
      
      setGeneratedOtp(newOtp);
      setStep(2);
      setError('');
    } catch (err) {
      console.error('Failed to send OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpInput !== generatedOtp) {
      setError('Invalid OTP. Please check your email.');
      return;
    }

    // Both match!
    login();
    navigate('/');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (adminCode !== 'CHEMISTRY2026') {
      setError('Invalid admin access code.');
      return;
    }

    adminLogin();
    navigate('/');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--page-background)] px-4 py-20">
      {/* Decorative background elements */}
      <div className="crystal-grid absolute inset-y-0 right-0 hidden w-[48%] opacity-95 lg:block" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--accent-primary)_10%,transparent),transparent_32rem)]" aria-hidden="true"></div>

      <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="icon-button absolute right-4 top-4 z-20" aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-[var(--accent-amber)]" />}
      </button>
      
      <div className="glass-panel relative z-10 w-full max-w-lg rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-modal)] animate-fade-in-up sm:p-8">
        <div className="mb-7 flex justify-center border-b border-[var(--border-default)] pb-6">
          <BrandMark />
        </div>
        
        {step === 2 && (
          <button 
            onClick={() => setStep(1)}
            className="absolute top-4 left-4 p-2 text-[var(--text-mut)] hover:text-[var(--acc-prim)] transition-colors rounded-lg hover:bg-[var(--bg-sec)]"
            title="Back to Email"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="flex bg-[var(--surf-elev)] p-1 rounded-xl mb-8 border border-[var(--border-sub)]">
          <button
            onClick={() => { setLoginMode('student'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginMode === 'student' ? 'bg-[var(--acc-prim)] text-[var(--button-primary-text)] shadow-md' : 'text-[var(--text-mut)] hover:text-[var(--text-norm)]'}`}
          >
            Student Login
          </button>
          <button
            onClick={() => { setLoginMode('admin'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginMode === 'admin' ? 'bg-[var(--acc-prim)] text-[var(--button-primary-text)] shadow-md' : 'text-[var(--text-mut)] hover:text-[var(--text-norm)]'}`}
          >
            Admin Access
          </button>
        </div>

        <div className="text-center mb-8 mt-4">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-inner">
            <Lock className="w-8 h-8 text-[var(--acc-prim)]" />
          </div>
          <h1 className="mb-2 text-3xl font-black text-[var(--text-primary)]">
            {loginMode === 'student' ? 'Student Login' : 'Admin Login'}
          </h1>
          <p className="text-[var(--text-mut)]">
            {loginMode === 'student' 
              ? (step === 1 ? 'Verify your email to access the lab' : 'Enter the OTP sent to your email')
              : 'Enter the special access code to edit content'
            }
          </p>
        </div>

        {loginMode === 'admin' ? (
          <form onSubmit={handleAdminLogin} className="space-y-6 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-[var(--text-norm)] mb-2">
                Access Code
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-mut)]" />
                <input
                  type="password"
                  required
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surf-elev)] border border-[var(--border-sub)] text-[var(--text-str)] focus:outline-none focus:ring-2 focus:ring-[var(--acc-prim)] focus:border-transparent transition-all"
                  placeholder="Enter access code"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[var(--stat-err)] bg-[var(--stat-err)]/10 p-3 rounded-lg animate-fade-in-down">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full py-3"
            >
              Access Editor Mode
            </button>
          </form>
        ) : step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-norm)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-mut)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surf-elev)] border border-[var(--border-sub)] text-[var(--text-str)] focus:outline-none focus:ring-2 focus:ring-[var(--acc-prim)] focus:border-transparent transition-all"
                  placeholder="student@university.edu"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[var(--stat-err)] bg-[var(--stat-err)]/10 p-3 rounded-lg animate-fade-in-down">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send Verification OTP'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up">
            <div className="p-3 bg-[var(--stat-succ)]/10 text-[var(--stat-succ)] rounded-lg text-sm text-center border border-[var(--stat-succ)]/20">
              OTP sent to <strong>{email}</strong>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-norm)] mb-2">
                6-Digit OTP
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-mut)]" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))} // only numbers
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surf-elev)] border border-[var(--border-sub)] text-[var(--text-str)] focus:outline-none focus:ring-2 focus:ring-[var(--acc-prim)] focus:border-transparent transition-all font-mono tracking-widest text-lg"
                  placeholder="••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[var(--stat-err)] bg-[var(--stat-err)]/10 p-3 rounded-lg animate-fade-in-down">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full py-3"
            >
              Access Laboratory
            </button>
          </form>
        )}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-3 z-10 w-full px-4 text-center">
        <p className="m-0 text-xs font-semibold leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          <span className="block sm:inline">Designed &amp; Prepared By- Arghyadeep Roy</span>
          <span className="hidden px-2 opacity-50 sm:inline" aria-hidden="true">•</span>
          <span className="block sm:inline">Contact- 9830507435</span>
        </p>
      </div>
    </div>
  );
};
