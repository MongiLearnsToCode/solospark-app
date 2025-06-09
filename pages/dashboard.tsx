import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Navigation from '../components/common/Navigation';
import PostEditor from '../components/post/PostEditor';
import PostList from '../components/post/PostList';

const Dashboard: NextPage = () => {
  const { user, loading, requireAuth, signOut } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Redirect if not authenticated
    requireAuth();

    // Set user name if available
    if (user?.email) {
      const email = user.email;
      const name = email.split('@')[0];
      setUserName(name);
    }
  }, [user, requireAuth]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If not authenticated, the requireAuth function will redirect
  // This is just an extra check
  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-gray-300 mr-4">{user?.email}</span>
              <button 
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PostEditor />
          </div>
          
          <div>
            <PostList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
