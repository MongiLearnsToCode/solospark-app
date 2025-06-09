import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import { Button } from '../components/ui/button';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>SoloSpark - Social Media Management for Solopreneurs</title>
        <meta name="description" content="Streamline your social media presence with SoloSpark - the all-in-one platform designed for solopreneurs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-16 md:py-24 overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-gold/10 blur-3xl"></div>
          <div className="absolute top-32 -left-32 w-96 h-96 rounded-full bg-sky-blue/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-gold/10 text-amber-gold font-medium text-sm mb-2">
                Social Media Management for Solopreneurs
              </div>
              <h1 className="text-h1-mobile md:text-h1 font-heading font-bold leading-tight">
                Manage Your Social Media <span className="text-amber-gold">Effortlessly</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-gray max-w-lg">
                SoloSpark helps solopreneurs schedule, post, and analyze their social media content across multiple platforms from one dashboard.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button size="lg" className="bg-amber-gold hover:bg-amber-gold/90 text-white font-medium px-8 py-6 h-auto shadow-lg shadow-amber-gold/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-slate-gray text-slate-gray hover:bg-slate-gray/5 font-medium px-8 py-6 h-auto transition-all duration-300 hover:-translate-y-0.5">
                  Watch Demo
                </Button>
              </div>
              <div className="pt-6 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center overflow-hidden">
                      <span className="text-xs font-medium text-slate-gray">U{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-gray">
                  <span className="font-semibold">1,000+</span> solopreneurs trust SoloSpark
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-xl bg-gradient-to-tr from-amber-gold/20 to-sky-blue/20 blur-xl"></div>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-gold via-sky-blue to-indigo"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-slate-400">SoloSpark Dashboard</div>
                    </div>
                    <div className="aspect-[4/3] bg-slate-100 rounded-lg flex items-center justify-center">
                      <p className="text-slate-gray font-medium">Dashboard Preview</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-gold/20 rounded-full blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-sky-blue/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-offwhite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2-mobile md:text-h2 font-heading font-semibold mb-4">
              Why Choose SoloSpark?
            </h2>
            <p className="text-lg text-slate-gray max-w-3xl mx-auto">
              Our platform is designed specifically for solopreneurs who need to maintain a professional social media presence without a team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-amber-gold/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-gold">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-slate-gray">Schedule your content for optimal engagement times across all platforms.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-sky-blue/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Content Creation</h3>
              <p className="text-slate-gray">Generate engaging captions and content ideas with our AI assistant.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-slate-gray">Track performance and gain insights to optimize your social media strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-gray text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-h2-mobile md:text-h2 font-heading font-semibold mb-6">
            Ready to Streamline Your Social Media?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of solopreneurs who are saving time and growing their audience with SoloSpark.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-gold hover:bg-amber-gold/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
