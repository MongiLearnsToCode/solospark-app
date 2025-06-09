import React from 'react';
import CalendarView from '../components/calendar/CalendarView';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Navigation from '../components/common/Navigation';

const CalendarPage: React.FC = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/login');
    }
  }, [session, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Content Calendar</h1>
        <p className="mb-6 text-gray-600">
          View and manage your scheduled posts. Drag and drop to reschedule.
        </p>
        <CalendarView />
      </div>
    </>
  );
};

export default CalendarPage;
