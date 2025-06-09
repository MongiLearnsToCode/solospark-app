import React from 'react';
import ColorTest from '../components/test/ColorTest';

const ColorTestPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-h1 font-poppins text-center mb-8">SoloSpark Color Test</h1>
      <ColorTest />
    </div>
  );
};

export default ColorTestPage;
