import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, Phone, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from '../lib/axios';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterProps {
  onNavigate: (view: any) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const { register: authRegister } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post('/auth/register', data);
      
      // Auto login after registration
      const loginResponse = await axios.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      if (loginResponse.data?.access_token) {
        const { access_token, ...userData } = loginResponse.data;
        authRegister(access_token, userData as any);
        onNavigate('home');
      } else {
        throw new Error('Login failed after registration');
      }
    } catch (err: any) {
      console.error('Registration/Login error:', err);
      const backendMessage = err.response?.data?.message;
      
      if (Array.isArray(backendMessage)) {
        setError(backendMessage[0]); // Show the first validation error
      } else if (typeof backendMessage === 'string') {
        setError(backendMessage);
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 bg-stone-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden">
          {/* Decorative backdrop */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10">
            <header className="mb-10 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Join the Collective</span>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Register</h1>
              {/* <p className="text-stone-500 text-sm">Unlock personalized performance tracking and elite access.</p> */}
            </header>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold uppercase tracking-tight"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400">
                    <User size={18} />
                  </div>
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="FULL NAME"
                    className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold uppercase tracking-widest placeholder:text-stone-300 focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-[10px] font-black uppercase tracking-tight ml-4">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400">
                    <Mail size={18} />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold uppercase tracking-widest placeholder:text-stone-300 focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] font-black uppercase tracking-tight ml-4">{errors.email.message}</p>}
              </div>

              {/* <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400">
                    <Phone size={18} />
                  </div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="PHONE (OPTIONAL)"
                    className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold uppercase tracking-widest placeholder:text-stone-300 focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div> */}

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400">
                    <Lock size={18} />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="CHOOSE PASSWORD"
                    className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold uppercase tracking-widest placeholder:text-stone-300 focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[10px] font-black uppercase tracking-tight ml-4">{errors.password.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <footer className="mt-10 text-center">
              {/* <p className="text-sm text-stone-500 mb-4">Already part of the collective?</p> */}
              <button
                onClick={() => onNavigate('login')}
                className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:text-on-surface hover:border-on-surface transition-all"
              >
                Already have an account? Sign In
              </button>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
