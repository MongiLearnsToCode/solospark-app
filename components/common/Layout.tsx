import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-amber-gold font-heading text-h2-mobile md:text-h2 font-bold no-underline hover:no-underline hover:scale-105 transition-transform duration-200"
            >
              SoloSpark
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Main navigation">
              <Link href="/" className="nav-link-inactive">
                Home
              </Link>
              <Link href="/dashboard" className="nav-link-inactive">
                Dashboard
              </Link>
              <Link href="/calendar" className="nav-link-inactive">
                Calendar
              </Link>
            </nav>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open mobile menu">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-slate-gray"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>
      
      <footer className="bg-slate-gray text-offwhite mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-h3-mobile md:text-h3 font-heading font-semibold mb-4 text-offwhite">
                SoloSpark
              </h3>
              <p className="text-sm text-neutral-300 mb-4 max-w-md">
                Social media management platform designed for solopreneurs. 
                Post smarter, not harder.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-sky-blue transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-sky-blue transition-colors duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-medium mb-4 text-offwhite">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Calendar
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-heading font-medium mb-4 text-offwhite">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-sky-blue text-sm transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-600 text-center">
            <p className="text-sm text-neutral-300">
              &copy; {new Date().getFullYear()} SoloSpark. All rights reserved. 
              Made with ❤️ for solopreneurs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;