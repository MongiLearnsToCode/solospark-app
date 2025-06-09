import React from 'react';

const TestTheme = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-h1 font-heading text-amber-gold">Heading 1</h1>
      <h2 className="text-h2 font-heading text-sky-blue">Heading 2</h2>
      <h3 className="text-h3 font-heading text-indigo">Heading 3</h3>
      <p className="text-base text-slate-gray">This is a paragraph with the base font size.</p>
      <a href="#" className="mt-4 block">This is a link</a>
      <div className="mt-4 p-4 bg-offwhite">
        <p>This is a section with off-white background.</p>
      </div>
    </div>
  );
};

export default TestTheme;
