import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postSchema, PostFormData } from '../../schemas/postSchema';
import { useCreatePost } from '../../hooks/usePostData';
import AICaptionGenerator from './AICaptionGenerator';
import { Button } from '../ui/button';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, initialDate }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const createPost = useCreatePost();
  
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
      scheduledAt: initialDate ? initialDate.toISOString() : new Date().toISOString(),
      platformSpecific: {},
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setSuccess(null);
    
    try {
      await createPost.mutateAsync(data);
      setSuccess('Post created successfully!');
      setTimeout(() => {
        setSuccess(null);
        onClose();
        reset();
      }, 1500);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div 
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create New Post</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  {...register('caption')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter your post caption..."
                />
                {errors.caption && (
                  <p className="mt-1 text-sm text-red-600">{errors.caption.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media URL
                </label>
                <input
                  type="text"
                  {...register('media')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter media URL..."
                />
                {errors.media && (
                  <p className="mt-1 text-sm text-red-600">{errors.media.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-3">
                  {['instagram', 'twitter', 'linkedin'].map((platform) => (
                    <label key={platform} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={platform}
                        {...register('platforms')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {platform}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.platforms && (
                  <p className="mt-1 text-sm text-red-600">{errors.platforms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Date & Time
                </label>
                <Controller
                  control={control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString())}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.scheduledAt && (
                  <p className="mt-1 text-sm text-red-600">{errors.scheduledAt.message}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <AICaptionGenerator onSelectCaption={handleSelectCaption} />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createPost.isPending}
                >
                  {createPost.isPending ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
