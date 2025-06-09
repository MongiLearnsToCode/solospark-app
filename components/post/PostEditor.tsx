import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postSchema, PostFormData } from '../../schemas/postSchema';
import { useCreatePost } from '../../hooks/usePostData';
import AICaptionGenerator from './AICaptionGenerator';
import PlatformPreviews from './previews/PlatformPreviews';

// Shadcn UI components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PostEditor: React.FC = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [previewCaption, setPreviewCaption] = useState<string>('');
  const [previewMedia, setPreviewMedia] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const createPost = useCreatePost();
  
  // Handle AI caption selection
  const handleSelectCaption = (caption: string) => {
    setValue('caption', caption);
    setPreviewCaption(caption);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: '',
      media: '',
      platforms: [],
      scheduledAt: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDThh:mm
      platformSpecific: {},
    },
  });

  // Update preview values when form values change
  useEffect(() => {
    // Watch for changes in form values
    const formValues = watch();
    const { caption, media, platforms } = formValues;
    
    setPreviewCaption(caption || '');
    setPreviewMedia(media || '');
    setSelectedPlatforms(platforms || []);
    
    // Return empty cleanup function
    return () => {};
  }, [watch]);

  const onSubmit = async (data: PostFormData) => {
    setSuccess(null);
    
    try {
      await createPost.mutateAsync(data);
      setSuccess('Post scheduled successfully!');
      reset(); // Reset form after successful submission
      // Reset preview states
      setPreviewCaption('');
      setPreviewMedia('');
      setSelectedPlatforms([]);
    } catch (error) {
      // Error handling is managed by the mutation
      console.error('Failed to create post:', error);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-poppins text-slate-800">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        {createPost.error && (
          <div className="bg-red-100 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {createPost.error.message || 'An error occurred while scheduling the post'}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="caption" className="block font-medium text-slate-800">
              Caption
            </label>
            <AICaptionGenerator onSelectCaption={handleSelectCaption} />
            <textarea
              id="caption"
              {...register('caption')}
              className="w-full border border-slate-300 rounded-md px-3 py-2 resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your post caption here..."
              rows={4}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm">{errors.caption.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="media" className="block font-medium text-slate-800">
              Media URL
            </label>
            <Input
              id="media"
              type="text"
              {...register('media')}
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
            {errors.media && (
              <p className="text-red-500 text-sm">{errors.media.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="block font-medium text-slate-800">Platforms</label>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="instagram" 
                  value="instagram" 
                  {...register('platforms')} 
                />
                <label htmlFor="instagram" className="text-slate-800">Instagram</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="twitter" 
                  value="twitter" 
                  {...register('platforms')} 
                />
                <label htmlFor="twitter" className="text-slate-800">X</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="linkedin" 
                  value="linkedin" 
                  {...register('platforms')} 
                />
                <label htmlFor="linkedin" className="text-slate-800">LinkedIn</label>
              </div>
            </div>
            {errors.platforms && (
              <p className="text-red-500 text-sm">{errors.platforms.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="scheduledAt" className="block font-medium text-slate-800">
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
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholderText="Select date and time"
                />
              )}
            />
            {errors.scheduledAt && (
              <p className="text-red-500 text-sm">{errors.scheduledAt.message}</p>
            )}
          </div>

          {/* Platform Previews */}
          <div className="mt-8 mb-6">
            <PlatformPreviews 
              caption={previewCaption}
              media={previewMedia}
              selectedPlatforms={selectedPlatforms}
            />
          </div>

          <Button
            type="submit"
            disabled={createPost.isPending}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium"
            variant="default"
          >
            {createPost.isPending ? 'Scheduling...' : 'Schedule Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostEditor;