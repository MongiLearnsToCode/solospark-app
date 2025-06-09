import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-amber-gold font-heading text-h2 font-bold no-underline hover:no-underline">
            SoloSpark
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-slate-gray hover:text-sky-blue hover:no-underline">
              Home
            </Link>
            <Link href="/dashboard" className="text-slate-gray hover:text-sky-blue hover:no-underline">
              Dashboard
            </Link>
            <Link href="/auth/login" className="text-slate-gray hover:text-sky-blue hover:no-underline">
              Login
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button placeholder */}
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-gray">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-gray text-offwhite">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-h3 font-heading mb-4">SoloSpark</h3>
              <p className="text-sm">Social media management platform for solopreneurs</p>
            </div>
            <div>
              <h4 className="font-heading font-medium mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-offwhite hover:text-sky-blue text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-offwhite hover:text-sky-blue text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-offwhite hover:text-sky-blue text-sm">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-medium mb-4">Contact</h4>
              <p className="text-sm">info@solospark.com</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} SoloSpark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
