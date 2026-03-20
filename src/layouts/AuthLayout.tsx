import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-background">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663445009235/mqrjtnLTPuV8W9rpRJHu95/auth-hero-cbFU7PHYR9Rm3Gx2wujMZM.webp)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-background via-slate-900/80 to-surface-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/15 via-transparent to-transparent" />

      {/* Animated Floating Orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl"
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 mx-4 w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-700/40 bg-surface-base/95 backdrop-blur-xl p-8 shadow-elevation-high">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500 shadow-elevation-high">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 lg:text-4xl">
              AI Academic Advisor
            </h1>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span>Smart planning. Better semesters.</span>
            </p>
          </div>

          {/* Form Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Secure • Private • Built for students
        </p>
      </motion.div>
    </div>
  );
};


