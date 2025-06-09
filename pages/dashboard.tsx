import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Navigation from '../components/common/Navigation';
import PostEditor from '../components/post/PostEditor';
import PostList from '../components/post/PostList';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Dashboard: NextPage = () => {
  const { user, loading, requireAuth, signOut } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    requireAuth();

    if (user?.email) {
      const email = user.email;
      const name = email.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, [user, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-spinner w-8 h-8 mx-auto"></div>
          <p className="text-neutral-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Dashboard - SoloSpark</title>
        <meta name="description" content="Manage your social media content with SoloSpark" />
      </Head>
      
      <div className="min-h-screen bg-offwhite">
        <Navigation />
        
        <div className="container-padded">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-h1-mobile md:text-h1 font-heading font-bold text-slate-gray mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-neutral-600">
                Ready to create amazing content? Let's make your social media shine.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-neutral-600">{user?.email}</p>
                <Badge variant="secondary" className="text-xs">
                  Free Plan
                </Badge>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleSignOut}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Posts This Week</CardDescription>
                <CardTitle className="text-2xl font-bold text-amber-gold">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +20% from last week
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Scheduled Posts</CardDescription>
                <CardTitle className="text-2xl font-bold text-sky-blue">8</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-neutral-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Next in 2 hours
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Engagement Rate</CardDescription>
                <CardTitle className="text-2xl font-bold text-indigo">4.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +0.8% this month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Post Editor */}
            <div className="space-y-6">
              <PostEditor />
            </div>
            
            {/* Post List */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Posts</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PostList />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;