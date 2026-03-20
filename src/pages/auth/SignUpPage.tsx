import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input, Button } from "../../components";
import { useAuth } from "../../hooks/useAuth";

export const SignUpPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const validateEmail = (value: string): string => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    return "";
  };

  const validateName = (value: string, field: string): string => {
    if (!value.trim()) return `${field} is required`;
    if (value.length < 2) return `${field} must be at least 2 characters`;
    return "";
  };

  const handleFieldChange = (field: keyof typeof errors, value: string) => {
    if (field === "firstName") setFirstName(value);
    if (field === "lastName") setLastName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    if (touched[field]) {
      let error = "";
      if (field === "email") error = validateEmail(value);
      else if (field === "password") error = validatePassword(value);
      else if (field === "firstName") error = validateName(value, "First name");
      else if (field === "lastName") error = validateName(value, "Last name");
      
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error = "";
    const value = field === "firstName" ? firstName : 
                  field === "lastName" ? lastName :
                  field === "email" ? email : password;
    
    if (field === "email") error = validateEmail(value);
    else if (field === "password") error = validatePassword(value);
    else if (field === "firstName") error = validateName(value, "First name");
    else if (field === "lastName") error = validateName(value, "Last name");
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      firstName: validateName(firstName, "First name"),
      lastName: validateName(lastName, "Last name"),
      email: validateEmail(email),
      password: validatePassword(password)
    };
    
    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, password: true });
    
    if (Object.values(newErrors).some(err => err !== "")) {
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await registerUser({ email, password, first_name: firstName, last_name: lastName });
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to sign up. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Input
            label="First name"
            name="firstName"
            placeholder="John"
            required
            value={firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            onBlur={() => handleFieldBlur("firstName")}
            error={touched.firstName ? errors.firstName : ""}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Last name"
            name="lastName"
            placeholder="Doe"
            required
            value={lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            onBlur={() => handleFieldBlur("lastName")}
            error={touched.lastName ? errors.lastName : ""}
          />
        </motion.div>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Input
            label="University email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@university.edu"
            required
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleFieldBlur("email")}
            error={touched.email ? errors.email : ""}
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
            autoComplete="new-password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            onBlur={() => handleFieldBlur("password")}
            error={touched.password ? errors.password : ""}
            helperText="At least 8 characters with uppercase, lowercase, and number"
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
        {loading ? "Creating account..." : "Sign up"}
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
        Already have an account? {" "}
        <Link
          to="/auth/sign-in"
          className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
        >
          Sign in here
        </Link>
      </p>
    </form>
  );
};
