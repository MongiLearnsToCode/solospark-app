import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postSchema, PostFormData } from '../../schemas/postSchema';
import { useUpdatePost } from '../../hooks/usePostData';
import { Post } from '../../hooks/usePostData';
import AICaptionGenerator from './AICaptionGenerator';

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, isOpen, onClose }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const updatePost = useUpdatePost();
  
  // Handle AI caption selection
  const handleSelectCaption = (caption: string) => {
    setValue('caption', caption);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: '',
      media: '',
      platforms: [],
      scheduledAt: new Date().toISOString(),
      platformSpecific: {},
    },
  });

  // Set form values when post changes
  useEffect(() => {
    if (post) {
      reset({
        caption: post.caption,
        media: post.media || '',
        platforms: post.platforms as any,
        scheduledAt: post.scheduledAt,
        platformSpecific: post.platformSpecific || {},
      });
    }
  }, [post, reset]);

  const onSubmit = async (data: PostFormData) => {
    setSuccess(null);
    
    try {
      await updatePost.mutateAsync({ id: post.id, data });
      setSuccess('Post updated successfully!');
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Post</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {updatePost.error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {updatePost.error.message || 'An error occurred while updating the post'}
          </div>
        )}

        {success && (
          <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="caption" className="block text-gray-300 mb-2">
              Caption
            </label>
            <AICaptionGenerator onSelectCaption={handleSelectCaption} />
            <textarea
              id="caption"
              {...register('caption')}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="media" className="block text-gray-300 mb-2">
              Media URL
            </label>
            <input
              id="media"
              type="text"
              {...register('media')}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.media && (
              <p className="text-red-500 text-sm mt-1">{errors.media.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Platforms</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="instagram"
                  {...register('platforms')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">Instagram</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="twitter"
                  {...register('platforms')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">Twitter</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="linkedin"
                  {...register('platforms')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">LinkedIn</span>
              </label>
            </div>
            {errors.platforms && (
              <p className="text-red-500 text-sm mt-1">{errors.platforms.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="scheduledAt" className="block text-gray-300 mb-2">
              Schedule Date & Time
            </label>
            <Controller
              control={control}
              name="scheduledAt"
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => date && field.onChange(date.toISOString())}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select date and time"
                />
              )}
            />
            {errors.scheduledAt && (
              <p className="text-red-500 text-sm mt-1">{errors.scheduledAt.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updatePost.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updatePost.isPending ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
