import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes, isBefore } from 'date-fns';
import { usePostsData, useUpdatePost, Post } from '../../hooks/usePostData';
import { Button } from '../ui/button';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CreatePostModal from '../post/CreatePostModal';

// Add custom styles for drag and drop
import './calendar-styles.css';

// Set up the localizer for react-big-calendar using date-fns
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define the event type for calendar
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Post; // Store the original post as a resource
}

// Create a DnD-enabled Calendar component
const DnDCalendar = withDragAndDrop(Calendar as any) as any;

const CalendarView: React.FC = () => {
  const { data: posts, isLoading, error } = usePostsData();
  const updatePost = useUpdatePost();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<{ event: CalendarEvent, start: Date, end: Date } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [view, setView] = useState<string>(Views.MONTH);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  // Convert posts to calendar events
  const events = useMemo(() => {
    if (!posts) return [];
    
    return posts.map((post) => {
      const scheduledAt = new Date(post.scheduledAt);
      // End time is 30 minutes after start time for visualization purposes
      const endTime = new Date(scheduledAt);
      endTime.setMinutes(endTime.getMinutes() + 30);
      
      return {
        id: post.id,
        title: post.caption.length > 30 ? `${post.caption.substring(0, 30)}...` : post.caption,
        start: scheduledAt,
        end: endTime,
        resource: post,
      };
    });
  }, [posts]);

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  // Handle event drop to show confirmation dialog
  const handleEventDrop = useCallback(({ event, start, end }: any) => {
    // Store the dragged event details for confirmation
    setDraggedEvent({ event, start, end: end || addMinutes(start, 30) });
    setShowConfirmation(true);
  }, []);
  
  // Handle event resize
  const handleEventResize = useCallback(({ event, start, end }: any) => {
    // For resizing, we also want to confirm the change
    setDraggedEvent({ event, start, end });
    setShowConfirmation(true);
  }, []);
  
  // Confirm the rescheduling
  const confirmReschedule = async () => {
    if (!draggedEvent) return;
    
    const { event, start, end } = draggedEvent;
    
    try {
      setIsUpdating(true);
      setSelectedEvent(null);
      setShowConfirmation(false);
      
      // Calculate duration in minutes for display
      const durationMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
      
      // Update the post with the new scheduled time
      await updatePost.mutateAsync({
        id: event.id,
        data: {
          caption: event.resource.caption,
          media: event.resource.media,
          platforms: event.resource.platforms as ("instagram" | "twitter" | "linkedin")[],
          scheduledAt: start.toISOString(),
          platformSpecific: event.resource.platformSpecific || {},
        },
      });
      
      setUpdateStatus({
        type: 'success',
        message: `Post rescheduled to ${format(start, 'PPp')} (${durationMinutes} min duration)`,
      });
      
      // Clear status after 3 seconds
      setTimeout(() => setUpdateStatus(null), 3000);
    } catch (error: any) {
      console.error('Failed to reschedule post:', error);
      setUpdateStatus({
        type: 'error',
        message: error.message || 'Failed to reschedule post',
      });
      setTimeout(() => setUpdateStatus(null), 3000);
    } finally {
      setIsUpdating(false);
      setDraggedEvent(null);
    }
  };
  
  // Cancel the rescheduling
  const cancelReschedule = () => {
    setShowConfirmation(false);
    setDraggedEvent(null);
  };

  // Custom event component to show post details with platform indicators
  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <div className="p-1 overflow-hidden">
      <div className="font-medium text-xs">{event.title}</div>
      <div className="text-xs opacity-70 flex items-center">
        {format(event.start, 'p')}
        <div className="ml-auto flex space-x-1">
          {event.resource.platforms.map((platform) => (
            <span 
              key={platform} 
              className={`platform-indicator platform-${platform}`} 
              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
  // Custom tooltip component for events
  const EventTooltip = ({ event }: { event: CalendarEvent }) => (
    <div className="rbc-tooltip p-2 bg-white shadow-lg rounded-md border border-gray-200">
      <div className="font-medium">{event.title}</div>
      <div className="text-sm text-gray-600 mt-1">
        Scheduled: {format(event.start, 'PPp')}
      </div>
      <div className="text-sm mt-1 flex flex-wrap gap-1">
        {event.resource.platforms.map((platform) => (
          <span 
            key={platform}
            className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
          >
            {platform}
          </span>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading calendar...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading posts: {error.message}</div>;
  }

  return (
    <div className="calendar-container">
      {updateStatus && (
        <div className={`mb-3 px-3 py-2 rounded-md text-sm ${
          updateStatus.type === 'success' 
            ? 'bg-green-500 bg-opacity-10 text-green-500 border border-green-500' 
            : 'bg-red-500 bg-opacity-10 text-red-500 border border-red-500'
        }`}>
          {updateStatus.message}
        </div>
      )}
      
      <div className="h-[600px] bg-white rounded-lg shadow">
        <div className="p-2 mb-2 flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView(Views.MONTH)}
            className={view === Views.MONTH ? 'bg-blue-50' : ''}
          >
            Month
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView(Views.WEEK)}
            className={view === Views.WEEK ? 'bg-blue-50' : ''}
          >
            Week
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView(Views.DAY)}
            className={view === Views.DAY ? 'bg-blue-50' : ''}
          >
            Day
          </Button>
        </div>
        
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '90%' }}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}
          onView={setView as any}
          selectable
          onSelectSlot={(slotInfo: any) => {
            // Open create post modal with the selected time
            setSelectedSlot(new Date(slotInfo.start));
            setShowCreateModal(true);
          }}
          onSelectEvent={handleSelectEvent as any}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          draggableAccessor={() => true}
          resizable
          components={{
            event: EventComponent as any,
            // Add tooltip component when available in your version
            // eventWrapper: EventTooltip as any,
          }}
          popup
          className="p-4"
          step={15}
          timeslots={4}
          dayLayoutAlgorithm="no-overlap"
        />
      </div>
      
      {selectedEvent && (
        <div className="mt-4 p-4 border rounded-lg bg-white shadow">
          <h3 className="text-lg font-semibold">Selected Post</h3>
          <p className="mt-2"><strong>Caption:</strong> {selectedEvent.resource.caption}</p>
          <p className="mt-1"><strong>Scheduled for:</strong> {format(selectedEvent.start, 'PPpp')}</p>
          <p className="mt-1"><strong>Platforms:</strong> {selectedEvent.resource.platforms.join(', ')}</p>
          <div className="mt-3 flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      {showConfirmation && draggedEvent && (
        <>
          <div className="confirmation-dialog-backdrop" onClick={cancelReschedule} />
          <div className="confirmation-dialog">
            <h3 className="text-lg font-semibold mb-2">Confirm Reschedule</h3>
            <p>Are you sure you want to reschedule this post?</p>
            
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <p><strong>Post:</strong> {draggedEvent.event.title}</p>
              <p><strong>New time:</strong> {format(draggedEvent.start, 'PPpp')}</p>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={cancelReschedule}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmReschedule}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        initialDate={selectedSlot || undefined}
      />
    </div>
  );
};

export default CalendarView;
