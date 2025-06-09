import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>SoloSpark - Post Smarter, Not Harder</title>
        <meta name="description" content="Social media management platform designed for solopreneurs. Schedule, create, and analyze your content across all platforms." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-gold/10 blur-3xl animate-pulse"></div>
          <div className="absolute top-32 -left-32 w-96 h-96 rounded-full bg-sky-blue/10 blur-3xl animate-pulse animation-delay-150"></div>
          <div className="absolute bottom-16 right-1/4 w-48 h-48 rounded-full bg-indigo/10 blur-2xl animate-pulse animation-delay-300"></div>
        </div>
        
        <div className="container-padded relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <Badge variant="ai" className="animate-fade-in">
                ✨ AI-Powered Social Media Management
              </Badge>
              
              <h1 className="text-h1-mobile md:text-h1 font-heading font-bold leading-tight text-balance animate-slide-up">
                Post Smarter, <span className="text-amber-gold">Not Harder</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 max-w-lg mx-auto lg:mx-0 animate-slide-up animation-delay-75">
                SoloSpark helps solopreneurs manage their social media presence with AI-powered content creation, smart scheduling, and insightful analytics—all from one beautiful dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start animate-slide-up animation-delay-150">
                <Link href="/auth/signup">
                  <Button size="xl" className="w-full sm:w-auto shadow-lg shadow-amber-gold/20">
                    Get Started Free
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </Button>
              </div>
              
              <div className="pt-6 flex items-center gap-4 justify-center lg:justify-start animate-fade-in animation-delay-300">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-gold to-sky-blue border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <span className="text-xs font-medium text-white">S{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-neutral-600">
                  <span className="font-semibold text-slate-gray">1,000+</span> solopreneurs trust SoloSpark
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-scale-in animation-delay-150">
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-xl bg-gradient-to-tr from-amber-gold/20 via-sky-blue/20 to-indigo/20 blur-xl"></div>
                <Card className="relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-gold via-sky-blue to-indigo"></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        SoloSpark Dashboard
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[4/3] bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-amber-gold/20 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-8 h-8 text-amber-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-neutral-600 font-medium">Dashboard Preview</p>
                        <p className="text-xs text-neutral-500">Coming to life soon...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-gold/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-sky-blue/20 rounded-full blur-lg animate-pulse animation-delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-padded">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Why Choose SoloSpark?
            </Badge>
            <h2 className="text-h2-mobile md:text-h2 font-heading font-semibold mb-4 text-balance">
              Everything you need to manage social media like a pro
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our platform is designed specifically for solopreneurs who need to maintain a professional social media presence without a team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-gold">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  Schedule your content for optimal engagement times across all platforms with our intelligent timing recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-blue/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <CardTitle>AI Content Creation</CardTitle>
                <CardDescription>
                  Generate engaging captions, optimize hashtags, and create compelling content with our AI-powered writing assistant.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Track performance and gain actionable insights to optimize your social media strategy and grow your audience.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <CardTitle>Multi-Platform Publishing</CardTitle>
                <CardDescription>
                  Post once, tweak everywhere. Customize content for Instagram, Twitter, and LinkedIn with platform-specific optimizations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4V12z"></path>
                  </svg>
                </div>
                <CardTitle>Visual Calendar</CardTitle>
                <CardDescription>
                  Drag-and-drop scheduling with a beautiful calendar view. See your entire content strategy at a glance.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card hover className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Invite team members, assign roles, and collaborate on content creation with built-in approval workflows.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-padded text-center">
          <h2 className="text-h2-mobile md:text-h2 font-heading font-semibold mb-8">
            Trusted by solopreneurs worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder for logos */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                <span className="text-neutral-400 font-medium">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-gray text-offwhite relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-gold/20 to-sky-blue/20"></div>
        </div>
        
        <div className="container-padded text-center relative z-10">
          <Badge variant="ai" className="mb-6 bg-white/10 text-offwhite border-white/20">
            ✨ Ready to transform your social media?
          </Badge>
          
          <h2 className="text-h2-mobile md:text-h2 font-heading font-semibold mb-6 text-offwhite text-balance">
            Join thousands of solopreneurs who post smarter, not harder
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-8 text-neutral-300">
            Start your free trial today and experience the power of AI-driven social media management. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/auth/signup">
              <Button size="xl" className="w-full sm:w-auto shadow-lg">
                Start Free Trial
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-offwhite hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="text-sm text-neutral-400">
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;