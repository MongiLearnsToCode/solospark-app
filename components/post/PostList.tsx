import React, { useState } from 'react';
import { usePostsData, useSchedulePost, useDeletePost, Post } from '../../hooks/usePostData';
import { format } from 'date-fns';
import EditPostModal from './EditPostModal';

// Define a type for our post that ensures scheduledAt is treated as a Date
type PostWithDateFields = Omit<Post, 'scheduledAt' | 'createdAt' | 'updatedAt'> & {
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = usePostsData();
  const scheduleMutation = useSchedulePost();
  const [schedulingId, setSchedulingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded">
        Failed to load posts: {error.message}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p className="text-gray-400">No posts scheduled yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Scheduled Posts</h2>
      {posts.map((post) => {
        // Convert string dates to Date objects
        const postWithDates: PostWithDateFields = {
          ...post,
          scheduledAt: new Date(post.scheduledAt),
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt)
        };
        return <PostCard key={post.id} post={postWithDates} />;
      })}
    </div>
  );
};

interface PostCardProps {
  post: PostWithDateFields;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const deletePost = useDeletePost();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  // Format the date for display
  const formattedDate = new Date(post.scheduledAt).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  // Get platform badges
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <span className="bg-pink-500 bg-opacity-20 text-pink-500 text-xs px-2 py-1 rounded">
            Instagram
          </span>
        );
      case 'twitter':
        return (
          <span className="bg-blue-500 bg-opacity-20 text-blue-500 text-xs px-2 py-1 rounded">
            Twitter
          </span>
        );
      case 'linkedin':
        return (
          <span className="bg-blue-700 bg-opacity-20 text-blue-700 text-xs px-2 py-1 rounded">
            LinkedIn
          </span>
        );
      default:
        return (
          <span className="bg-gray-500 bg-opacity-20 text-gray-500 text-xs px-2 py-1 rounded">
            {platform}
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div className="flex space-x-2">
          {post.platforms.map((platform) => (
            <div key={platform}>{getPlatformBadge(platform)}</div>
          ))}
        </div>
        <div className="text-gray-400 text-sm">{formattedDate}</div>
      </div>
      
      <p className="text-white mb-3 line-clamp-3">{post.caption}</p>
      
      {post.media && (
        <div className="mb-3">
          <img 
            src={post.media} 
            alt="Post media" 
            className="rounded-md h-32 w-auto object-cover"
            onError={(e) => {
              // Replace broken image with placeholder
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Media+Preview';
            }}
          />
        </div>
      )}
      
      {(scheduleStatus || deleteStatus) && (
        <div className={`mb-3 px-3 py-2 rounded-md text-sm ${
          (scheduleStatus?.type === 'success' || deleteStatus?.type === 'success')
            ? 'bg-green-500 bg-opacity-10 text-green-500 border border-green-500' 
            : 'bg-red-500 bg-opacity-10 text-red-500 border border-red-500'
        }`}>
          {scheduleStatus?.message || deleteStatus?.message}
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <button 
          className="text-green-500 hover:text-green-400 text-sm px-2 py-1 border border-green-500 rounded-md hover:bg-green-500 hover:bg-opacity-10 transition-colors"
          onClick={async () => {
            try {
              setIsScheduling(true);
              const response = await fetch('/api/posts/schedule', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: post.id }),
              });
              
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to schedule post');
              }
              
              setScheduleStatus({
                type: 'success',
                message: 'Post scheduled successfully!'
              });
              
              // Clear success message after 3 seconds
              setTimeout(() => setScheduleStatus(null), 3000);
            } catch (error: any) {
              console.error('Failed to schedule post:', error);
              setScheduleStatus({
                type: 'error',
                message: error.message || 'Failed to schedule post'
              });
              
              // Clear error message after 3 seconds
              setTimeout(() => setScheduleStatus(null), 3000);
            } finally {
              setIsScheduling(false);
            }
          }}
          disabled={isScheduling}
        >
          {isScheduling ? 'Scheduling...' : 'Schedule'}
        </button>
        <button 
          className="text-blue-500 hover:text-blue-400 text-sm px-2 py-1 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-10 transition-colors"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button 
          className="text-red-500 hover:text-red-400 text-sm px-2 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:bg-opacity-10 transition-colors"
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this post?')) {
              try {
                setIsDeleting(true);
                await deletePost.mutateAsync(post.id);
                setDeleteStatus({
                  type: 'success',
                  message: 'Post deleted successfully!'
                });
                // Status will be shown briefly before the post disappears from the list
                setTimeout(() => setDeleteStatus(null), 3000);
              } catch (error: any) {
                console.error('Failed to delete post:', error);
                setDeleteStatus({
                  type: 'error',
                  message: error.message || 'Failed to delete post'
                });
                setTimeout(() => setDeleteStatus(null), 3000);
              } finally {
                setIsDeleting(false);
              }
            }
          }}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      
      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <EditPostModal 
          post={{
            ...post,
            scheduledAt: post.scheduledAt.toISOString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
          }} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default PostList;
