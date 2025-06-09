import React from 'react';
import ThemeTest from '../components/test/ThemeTest';
import Head from 'next/head';

const ThemeTestPage = () => {
  return (
    <>
      <Head>
        <title>SoloSpark Theme Test</title>
        <meta name="description" content="SoloSpark theme test page showing custom colors and typography" />
      </Head>
      <div className="min-h-screen bg-offwhite">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-h1-mobile md:text-h1 font-poppins font-bold text-center">SoloSpark Theme Test</h1>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-slate-gray mb-4">This page demonstrates the SoloSpark custom theme implementation with Tailwind CSS, showing custom colors, typography, and UI components.</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-amber-gold text-white text-sm rounded-full">Amber Gold</span>
              <span className="inline-block px-3 py-1 bg-sky-blue text-white text-sm rounded-full">Sky Blue</span>
              <span className="inline-block px-3 py-1 bg-indigo text-white text-sm rounded-full">Indigo</span>
              <span className="inline-block px-3 py-1 bg-slate-gray text-white text-sm rounded-full">Slate Gray</span>
              <span className="inline-block px-3 py-1 bg-offwhite text-slate-gray text-sm rounded-full border border-slate-200">Off White</span>
            </div>
          </div>
          <ThemeTest />
        </main>
        <footer className="bg-slate-gray text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>SoloSpark MVP - Theme Configuration</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ThemeTestPage;
