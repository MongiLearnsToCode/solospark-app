import React from 'react';

const ThemeTest: React.FC = () => {
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-h1-mobile md:text-h1 font-poppins font-bold">SoloSpark Theme Test</h1>
      
      <section className="space-y-6">
        <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold">Color Palette Test</h2>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Primary Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-amber-gold text-white rounded-md shadow-md">
              <div className="font-bold mb-1">Amber Gold</div>
              <div className="text-sm opacity-90">#F59E0B</div>
            </div>
            <div className="p-6 bg-sky-blue text-white rounded-md shadow-md">
              <div className="font-bold mb-1">Sky Blue</div>
              <div className="text-sm opacity-90">#0EA5E9</div>
            </div>
            <div className="p-6 bg-indigo text-white rounded-md shadow-md">
              <div className="font-bold mb-1">Indigo</div>
              <div className="text-sm opacity-90">#6366F1</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Neutral Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-offwhite text-slate-gray rounded-md shadow-md">
              <div className="font-bold mb-1">Off-White</div>
              <div className="text-sm opacity-90">#F9FAFB</div>
            </div>
            <div className="p-6 bg-slate-gray text-white rounded-md shadow-md">
              <div className="font-bold mb-1">Slate Gray</div>
              <div className="text-sm opacity-90">#475569</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Color Usage Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-md shadow-md border border-slate-200">
              <div className="font-bold text-sky-blue mb-2">Primary Text</div>
              <div className="text-slate-gray">Regular text in slate gray on white background</div>
              <div className="mt-3">
                <button className="bg-amber-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">Amber Button</button>
              </div>
            </div>
            <div className="p-6 bg-slate-gray rounded-md shadow-md">
              <div className="font-bold text-sky-blue mb-2">Inverted Text</div>
              <div className="text-offwhite">Light text on dark background</div>
              <div className="mt-3">
                <button className="bg-indigo text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">Indigo Button</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="space-y-6">
        <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold">Typography Test</h2>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Font Families</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-md shadow-md border border-slate-200">
              <div className="font-bold mb-2">Inter (Sans)</div>
              <p className="font-sans">Primary font for body text. The quick brown fox jumps over the lazy dog.</p>
              <p className="font-sans mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890</p>
              <div className="mt-4 space-y-2">
                <p className="font-sans font-normal">Regular 400: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-sans font-medium">Medium 500: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-sans font-semibold">Semibold 600: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-sans font-bold">Bold 700: The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md border border-slate-200">
              <div className="font-bold mb-2">Poppins</div>
              <p className="font-poppins">Primary font for headings. The quick brown fox jumps over the lazy dog.</p>
              <p className="font-poppins mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890</p>
              <div className="mt-4 space-y-2">
                <p className="font-poppins font-normal">Regular 400: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-medium">Medium 500: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-semibold">Semibold 600: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-bold">Bold 700: The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Responsive Font Sizes</h3>
          <div className="space-y-6 p-6 bg-white rounded-md shadow-md border border-slate-200">
            <div>
              <div className="text-sm text-slate-500 mb-1">Base Text</div>
              <p className="text-base-mobile md:text-base">Base (16px/14px mobile): The quick brown fox jumps over the lazy dog.</p>
            </div>
            
            <div>
              <div className="text-sm text-slate-500 mb-1">Heading 1</div>
              <h1 className="text-h1-mobile md:text-h1 font-poppins">H1: Heading Level 1</h1>
              <div className="text-xs text-slate-400 mt-1">32px/40px (desktop) • 24px/32px (mobile)</div>
            </div>
            
            <div>
              <div className="text-sm text-slate-500 mb-1">Heading 2</div>
              <h2 className="text-h2-mobile md:text-h2 font-poppins">H2: Heading Level 2</h2>
              <div className="text-xs text-slate-400 mt-1">24px/32px (desktop) • 20px/28px (mobile)</div>
            </div>
            
            <div>
              <div className="text-sm text-slate-500 mb-1">Heading 3</div>
              <h3 className="text-h3-mobile md:text-h3 font-poppins">H3: Heading Level 3</h3>
              <div className="text-xs text-slate-400 mt-1">20px/28px (desktop) • 16px/24px (mobile)</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="space-y-6">
        <h2 className="text-h2-mobile md:text-h2 font-poppins font-bold">UI Components</h2>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Buttons</h3>
          <div className="p-6 bg-white rounded-md shadow-md border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="font-bold mb-2">Primary Buttons</div>
                <div className="space-y-3">
                  <button className="bg-amber-gold text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">Amber Gold</button>
                  <button className="bg-sky-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">Sky Blue</button>
                  <button className="bg-indigo text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">Indigo</button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="font-bold mb-2">Secondary Buttons</div>
                <div className="space-y-3">
                  <button className="border-2 border-amber-gold text-amber-gold px-6 py-2 rounded-md hover:bg-amber-gold hover:text-white transition-all">Amber Gold</button>
                  <button className="border-2 border-sky-blue text-sky-blue px-6 py-2 rounded-md hover:bg-sky-blue hover:text-white transition-all">Sky Blue</button>
                  <button className="border-2 border-indigo text-indigo px-6 py-2 rounded-md hover:bg-indigo hover:text-white transition-all">Indigo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-h3-mobile md:text-h3 font-poppins font-semibold mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="h-32 bg-amber-gold"></div>
              <div className="p-4">
                <h4 className="font-poppins font-semibold mb-2">Amber Gold Card</h4>
                <p className="text-slate-gray text-sm">This card uses our amber gold theme color for the header area.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="h-32 bg-sky-blue"></div>
              <div className="p-4">
                <h4 className="font-poppins font-semibold mb-2">Sky Blue Card</h4>
                <p className="text-slate-gray text-sm">This card uses our sky blue theme color for the header area.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="h-32 bg-indigo"></div>
              <div className="p-4">
                <h4 className="font-poppins font-semibold mb-2">Indigo Card</h4>
                <p className="text-slate-gray text-sm">This card uses our indigo theme color for the header area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeTest;
