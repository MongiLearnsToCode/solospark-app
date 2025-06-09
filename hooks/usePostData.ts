import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostFormData } from '../schemas/postSchema';

// Type for post data returned from API
export interface Post {
  id: string;
  caption: string;
  media: string | null;
  platforms: string[];
  scheduledAt: string;
  userId: string;
  platformSpecific: any;
  createdAt: string;
  updatedAt: string;
}

// Fetch all posts for the current user
export const usePostsData = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
  });
};

// Create a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Post, Error, PostFormData>({
    mutationFn: async (postData: PostFormData) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts query after a successful creation
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Hook for scheduling a post
export const useSchedulePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch('/api/posts/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to schedule post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts query to update the UI
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Update an existing post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Post, Error, { id: string; data: PostFormData }>({ 
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts query after a successful update
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Delete a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete post');
      }
    },
    onSuccess: () => {
      // Invalidate and refetch posts query after a successful deletion
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
