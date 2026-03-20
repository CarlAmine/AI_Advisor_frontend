import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const AUTH_HERO_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663445009235/mqrjtnLTPuV8W9rpRJHu95/neural_canvas_auth_hero-Xp5mhgUUsfSYAZo4A7tGAV.webp';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Visual Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${AUTH_HERO_IMAGE})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-void-950/80 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <div className="mb-8">
            <div className="w-12 h-12 rounded-lg bg-indigo-neon-600 flex items-center justify-center shadow-glow-indigo-lg">
              <span className="text-void-950 font-bold text-xl">AI</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Your AI-powered academic co-pilot
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-md">
            Get personalized study recommendations, track your progress, and ace
            your courses with intelligent insights.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-void-950">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-danger flex-shrink-0 mt-0.5" />
              <p className="text-danger text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="you@university.edu"
              variant="underline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              variant="underline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-void-950 text-gray-500">or</span>
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/auth/sign-up"
                className="text-gradient font-medium hover:opacity-80 transition-opacity"
              >
                Sign up
              </Link>
            </p>

            <p className="text-center text-gray-500 text-xs">
              <Link
                to="/auth/forgot-password"
                className="text-gray-400 hover:text-indigo-neon-600 transition-colors"
              >
                Forgot password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


