import React from 'react';
import Head from 'next/head';

const GlobalStylesTestPage = () => {
  return (
    <>
      <Head>
        <title>SoloSpark - Global Styles Test</title>
        <meta name="description" content="Testing global styles for SoloSpark MVP" />
      </Head>
      <div className="min-h-screen bg-offwhite">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <h1>Global Styles Test</h1>
          </div>
        </header>
        <main className="container-padded max-w-6xl">
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="mb-4">Typography</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Headings</h3>
                <div className="space-y-4">
                  <h1>Heading 1</h1>
                  <h2>Heading 2</h2>
                  <h3>Heading 3</h3>
                  <h4>Heading 4</h4>
                  <h5>Heading 5</h5>
                  <h6>Heading 6</h6>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2">Body Text</h3>
                <p>This is a paragraph of text. The quick brown fox jumps over the lazy dog. This text should be using the Inter font family and should be Slate Gray in color.</p>
                <p className="mt-2">This is another paragraph with a <a href="#">link</a> that should be Sky Blue and should have an underline on hover.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="mb-4">Custom Component Classes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary">Primary Button</button>
                  <button className="btn-secondary">Secondary Button</button>
                  <button className="btn-outline">Outline Button</button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2">Selection & Focus</h3>
                <p>Try selecting this text to see the selection styling.</p>
                <div className="mt-4">
                  <label htmlFor="focusTest" className="block mb-2">Try focusing this input:</label>
                  <input 
                    id="focusTest" 
                    type="text" 
                    className="border border-slate-200 rounded-md px-3 py-2 w-full max-w-md" 
                    placeholder="Focus me to see the focus styles" 
                  />
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="mb-4">Theme Colors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-gold text-white rounded-md">
                <div className="font-bold">Amber Gold</div>
                <div className="text-sm opacity-90">#F59E0B</div>
              </div>
              <div className="p-4 bg-sky-blue text-white rounded-md">
                <div className="font-bold">Sky Blue</div>
                <div className="text-sm opacity-90">#0EA5E9</div>
              </div>
              <div className="p-4 bg-indigo text-white rounded-md">
                <div className="font-bold">Indigo</div>
                <div className="text-sm opacity-90">#6366F1</div>
              </div>
              <div className="p-4 bg-offwhite text-slate-gray rounded-md border border-slate-200">
                <div className="font-bold">Off White</div>
                <div className="text-sm opacity-90">#F9FAFB</div>
              </div>
              <div className="p-4 bg-slate-gray text-white rounded-md">
                <div className="font-bold">Slate Gray</div>
                <div className="text-sm opacity-90">#475569</div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-slate-gray text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>SoloSpark MVP - Global Styles Test</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GlobalStylesTestPage;
