import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Navigation: React.FC = () => {
  const router = useRouter();
  
  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/dashboard" 
              className="text-xl font-heading font-bold text-amber-gold hover:scale-105 transition-transform duration-200 no-underline"
            >
              SoloSpark
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            <Link href="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/dashboard') ? 'bg-sky-blue/10 text-sky-blue' : ''}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v6m8-6v6m-8-6h8" />
                </svg>
                Dashboard
              </Button>
            </Link>
            
            <Link href="/calendar">
              <Button
                variant={isActive('/calendar') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/calendar') ? 'bg-sky-blue/10 text-sky-blue' : ''}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" disabled>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
              <Badge variant="secondary" className="ml-2 text-xs">
                Soon
              </Badge>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open mobile menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;