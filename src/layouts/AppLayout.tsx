import React from 'react';
import { DesktopNav } from '../components/navigation/DesktopNav';
import { MobileNav } from '../components/navigation/MobileNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-void-950">
      {/* Desktop Navigation */}
      <DesktopNav />

      {/* Main Content Area */}
      <main className="flex-1 sm:ml-16 mb-20 sm:mb-0">
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};
