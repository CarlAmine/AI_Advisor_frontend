import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input, Button } from "../../components";
import { useAuth } from "../../hooks/useAuth";

export const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string): string => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setTouched({ email: true, password: true });
    
    if (emailErr || passwordErr) {
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Unable to sign in. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="University email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            error={touched.email ? emailError : ""}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onBlur={handlePasswordBlur}
            error={touched.password ? passwordError : ""}
          />
        </motion.div>
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-danger-500/40 bg-danger-500/5 px-4 py-3 text-sm text-danger-300 flex items-start gap-3"
        >
          <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}
      <Button type="submit" className="w-full" loading={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/40" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-base px-2 text-slate-400">or</span>
        </div>
      </div>
      
      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/sign-up"
          className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
        >
          Sign up here
        </Link>
      </p>
    </form>
  );
};


