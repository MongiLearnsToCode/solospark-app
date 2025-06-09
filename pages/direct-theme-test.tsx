import React from 'react';
import Head from 'next/head';

const DirectThemeTest: React.FC = () => {
  return (
    <>
      <Head>
        <title>SoloSpark Direct Theme Test</title>
        <style jsx global>{`
          /* Direct theme colors */
          .amber-gold-bg { background-color: #F59E0B; }
          .sky-blue-bg { background-color: #0EA5E9; }
          .indigo-bg { background-color: #6366F1; }
          .offwhite-bg { background-color: #F9FAFB; }
          .slate-gray-bg { background-color: #475569; }

          .amber-gold-text { color: #F59E0B; }
          .sky-blue-text { color: #0EA5E9; }
          .indigo-text { color: #6366F1; }
          .offwhite-text { color: #F9FAFB; }
          .slate-gray-text { color: #475569; }
          
          /* Font families */
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-poppins { font-family: 'Poppins', sans-serif; }
          
          /* Font sizes */
          .text-h1 { font-size: 32px; line-height: 40px; }
          .text-h2 { font-size: 24px; line-height: 32px; }
          .text-h3 { font-size: 20px; line-height: 28px; }
          .text-base { font-size: 16px; line-height: 24px; }
          
          /* Mobile font sizes */
          @media (max-width: 767px) {
            .text-h1 { font-size: 24px; line-height: 32px; }
            .text-h2 { font-size: 20px; line-height: 28px; }
            .text-h3 { font-size: 16px; line-height: 24px; }
            .text-base { font-size: 14px; line-height: 21px; }
          }
          
          /* Layout */
          .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
          .grid { display: grid; gap: 16px; }
          .grid-cols-1 { grid-template-columns: 1fr; }
          
          @media (min-width: 768px) {
            .grid-cols-md-3 { grid-template-columns: repeat(3, 1fr); }
          }
          
          /* Spacing */
          .p-4 { padding: 16px; }
          .mb-4 { margin-bottom: 16px; }
          .mb-8 { margin-bottom: 32px; }
          .space-y-4 > * + * { margin-top: 16px; }
          
          /* Utilities */
          .rounded { border-radius: 8px; }
          .shadow { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
          .text-white { color: white; }
          .font-bold { font-weight: 700; }
          .text-center { text-align: center; }
        `}</style>
      </Head>
      <div className="container">
        <h1 className="text-h1 font-poppins font-bold text-center mb-8">SoloSpark Direct Theme Test</h1>
        
        <div className="space-y-4 mb-8">
          <h2 className="text-h2 font-poppins font-bold">Color Palette Test</h2>
          
          <div className="grid grid-cols-1 grid-cols-md-3">
            <div className="p-4 amber-gold-bg text-white rounded shadow">
              Amber Gold (#F59E0B)
            </div>
            <div className="p-4 sky-blue-bg text-white rounded shadow">
              Sky Blue (#0EA5E9)
            </div>
            <div className="p-4 indigo-bg text-white rounded shadow">
              Indigo (#6366F1)
            </div>
            <div className="p-4 offwhite-bg slate-gray-text rounded shadow">
              Off-White (#F9FAFB)
            </div>
            <div className="p-4 slate-gray-bg text-white rounded shadow">
              Slate Gray (#475569)
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-h2 font-poppins font-bold">Typography Test</h2>
          
          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-h3 font-poppins font-bold">Font Families</h3>
              <p className="font-inter text-base">Inter (sans): The quick brown fox jumps over the lazy dog.</p>
              <p className="font-poppins text-base">Poppins: The quick brown fox jumps over the lazy dog.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h3 font-poppins font-bold">Font Sizes</h3>
              <p className="text-base">Base (16px): The quick brown fox jumps over the lazy dog.</p>
              <h1 className="text-h1 font-poppins">H1: Heading Level 1</h1>
              <h2 className="text-h2 font-poppins">H2: Heading Level 2</h2>
              <h3 className="text-h3 font-poppins">H3: Heading Level 3</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectThemeTest;
