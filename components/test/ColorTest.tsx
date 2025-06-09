import React from 'react';

const ColorTest: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">SoloSpark Color Test</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Custom Theme Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Using our custom theme colors */}
            <div className="p-4 rounded-md shadow-md bg-amber-gold text-white">
              Amber Gold
            </div>
            <div className="p-4 rounded-md shadow-md bg-sky-blue text-white">
              Sky Blue
            </div>
            <div className="p-4 rounded-md shadow-md bg-indigo text-white">
              Indigo
            </div>
            <div className="p-4 rounded-md shadow-md bg-offwhite text-slate-gray">
              Off-White
            </div>
            <div className="p-4 rounded-md shadow-md bg-slate-gray text-white">
              Slate Gray
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Nested Theme Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Using nested theme colors */}
            <div className="p-4 rounded-md shadow-md bg-amber-gold text-white">
              amber.gold
            </div>
            <div className="p-4 rounded-md shadow-md bg-sky-blue text-white">
              sky.blue
            </div>
            <div className="p-4 rounded-md shadow-md bg-indigo text-white">
              indigo
            </div>
            <div className="p-4 rounded-md shadow-md bg-offwhite text-slate-gray">
              offwhite
            </div>
            <div className="p-4 rounded-md shadow-md bg-slate-gray text-white">
              slate.gray
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Direct HEX Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Using direct hex colors */}
            <div className="p-4 rounded-md shadow-md bg-[#F59E0B] text-white">
              #F59E0B (Amber Gold)
            </div>
            <div className="p-4 rounded-md shadow-md bg-[#0EA5E9] text-white">
              #0EA5E9 (Sky Blue)
            </div>
            <div className="p-4 rounded-md shadow-md bg-[#6366F1] text-white">
              #6366F1 (Indigo)
            </div>
            <div className="p-4 rounded-md shadow-md bg-[#F9FAFB] text-[#475569]">
              #F9FAFB (Off-White)
            </div>
            <div className="p-4 rounded-md shadow-md bg-[#475569] text-white">
              #475569 (Slate Gray)
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Standard Tailwind Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Using standard Tailwind colors */}
            <div className="p-4 rounded-md shadow-md bg-amber-500 text-white">
              amber-500
            </div>
            <div className="p-4 rounded-md shadow-md bg-sky-500 text-white">
              sky-500
            </div>
            <div className="p-4 rounded-md shadow-md bg-indigo-500 text-white">
              indigo-500
            </div>
            <div className="p-4 rounded-md shadow-md bg-slate-50 text-slate-500">
              slate-50
            </div>
            <div className="p-4 rounded-md shadow-md bg-slate-500 text-white">
              slate-500
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorTest;
