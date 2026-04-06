import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { LogIn as LoginIcon, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/login', data);
      const { access_token, ...userData } = response.data;
      login(access_token, userData as any);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-stone-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden">
          {/* Decorative backdrop */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10">
            <header className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Premium Access</span>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Welcome Back</h1>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-primary transition-colors">
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

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400">
                    <Lock size={18} />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="PASSWORD"
                    className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold uppercase tracking-widest placeholder:text-stone-300 focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[10px] font-black uppercase tracking-tight ml-4">{errors.password.message}</p>}
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-primary transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <footer className="mt-10 text-center">
              <Link
                to="/register"
                className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:text-on-surface hover:border-on-surface transition-all"
              >
                Register
              </Link>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
