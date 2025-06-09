import React from 'react';
import Layout from '../components/common/Layout';

const LayoutTestPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 font-heading mb-6">Layout Test Page</h1>
        <p className="mb-4">This page demonstrates the Layout component with header, main content area, and footer.</p>
        <div className="bg-offwhite p-6 rounded-lg shadow-sm">
          <h2 className="text-h2 font-heading mb-4">Main Content Area</h2>
          <p>This is where the main content of each page will be displayed.</p>
          <p className="mt-4">The Layout component provides consistent structure across all pages of the application.</p>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutTestPage;
