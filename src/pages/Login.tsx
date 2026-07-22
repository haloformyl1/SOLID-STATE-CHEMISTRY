import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Lock, Mail, AlertCircle, KeyRound, Loader2, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const Login = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useStore((state) => state.login);
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

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[var(--bg-main)] to-[var(--bg-sec)]">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--acc-prim)]/10 blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--acc-viol)]/10 blur-3xl"></div>
      
      <div className="glass-panel relative z-10 w-full max-w-md p-8 rounded-2xl animate-fade-in-up border border-[var(--border-sub)]">
        
        {step === 2 && (
          <button 
            onClick={() => setStep(1)}
            className="absolute top-4 left-4 p-2 text-[var(--text-mut)] hover:text-[var(--acc-prim)] transition-colors rounded-lg hover:bg-[var(--bg-sec)]"
            title="Back to Email"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-[var(--bg-sec)] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[var(--border-sub)] shadow-inner">
            <Lock className="w-8 h-8 text-[var(--acc-prim)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-str)] mb-2 font-['Outfit']">Student Login</h1>
          <p className="text-[var(--text-mut)]">
            {step === 1 ? 'Verify your email to access the lab' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 1 ? (
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
              className="w-full py-3 px-4 bg-gradient-to-r from-[var(--acc-prim)] to-[var(--acc-sec)] hover:opacity-90 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[var(--acc-prim)]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              className="w-full py-3 px-4 bg-gradient-to-r from-[var(--acc-prim)] to-[var(--acc-sec)] hover:opacity-90 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[var(--acc-prim)]/20 active:scale-[0.98]"
            >
              Access Laboratory
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
