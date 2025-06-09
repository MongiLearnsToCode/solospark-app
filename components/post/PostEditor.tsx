import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postSchema, PostFormData } from '../../schemas/postSchema';
import { useCreatePost } from '../../hooks/usePostData';
import AICaptionGenerator from './AICaptionGenerator';
import PlatformPreviews from './previews/PlatformPreviews';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";

const PostEditor: React.FC = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [previewCaption, setPreviewCaption] = useState<string>('');
  const [previewMedia, setPreviewMedia] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);
  const createPost = useCreatePost();
  
  // Handle AI caption selection
  const handleSelectCaption = (caption: string) => {
    setValue('caption', caption);
    setPreviewCaption(caption);
    setCharacterCount(caption.length);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
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

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Update preview values when form values change
  useEffect(() => {
    const { caption, media, platforms } = watchedValues;
    
    setPreviewCaption(caption || '');
    setPreviewMedia(media || '');
    setSelectedPlatforms(platforms || []);
    setCharacterCount((caption || '').length);
  }, [watchedValues]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const onSubmit = async (data: PostFormData) => {
    setSuccess(null);
    
    try {
      await createPost.mutateAsync(data);
      setSuccess('Post scheduled successfully! 🎉');
      reset();
      setPreviewCaption('');
      setPreviewMedia('');
      setSelectedPlatforms([]);
      setCharacterCount(0);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  // Get character limit for selected platforms
  const getCharacterLimit = () => {
    if (selectedPlatforms.includes('twitter')) return 280;
    if (selectedPlatforms.includes('linkedin')) return 3000;
    if (selectedPlatforms.includes('instagram')) return 2200;
    return 2200; // Default
  };

  const characterLimit = getCharacterLimit();
  const isOverLimit = characterCount > characterLimit;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-h2-mobile md:text-h2 font-heading text-slate-gray">
              Create New Post
            </CardTitle>
            <Badge variant="ai">
              ✨ AI-Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Error Alert */}
          {createPost.error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {createPost.error.message || 'An error occurred while scheduling the post'}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert variant="success" className="mb-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* AI Caption Generator */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-gray">
                Caption
              </label>
              <AICaptionGenerator onSelectCaption={handleSelectCaption} />
              
              <div className="relative">
                <Textarea
                  {...register('caption')}
                  placeholder="What's on your mind? Let AI help you craft the perfect message..."
                  className="min-h-[120px] pr-16"
                  error={!!errors.caption || isOverLimit}
                />
                <div className={`absolute bottom-3 right-3 text-xs font-medium ${
                  isOverLimit ? 'text-red-500' : characterCount > characterLimit * 0.8 ? 'text-yellow-600' : 'text-neutral-500'
                }`}>
                  {characterCount}/{characterLimit}
                </div>
              </div>
              
              {errors.caption && (
                <p className="text-red-500 text-sm">{errors.caption.message}</p>
              )}
              {isOverLimit && (
                <p className="text-red-500 text-sm">
                  Caption exceeds character limit for selected platforms
                </p>
              )}
            </div>

            {/* Media URL */}
            <div className="space-y-2">
              <label htmlFor="media" className="block text-sm font-medium text-slate-gray">
                Media URL
              </label>
              <Input
                id="media"
                type="url"
                {...register('media')}
                placeholder="https://example.com/image.jpg"
                error={!!errors.media}
              />
              {errors.media && (
                <p className="text-red-500 text-sm">{errors.media.message}</p>
              )}
            </div>

            {/* Platform Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-gray">
                Platforms
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500', icon: '📷' },
                  { id: 'twitter', name: 'X (Twitter)', color: 'bg-blue-500', icon: '🐦' },
                  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700', icon: '💼' }
                ].map((platform) => (
                  <div key={platform.id} className="relative">
                    <input
                      type="checkbox"
                      id={platform.id}
                      value={platform.id}
                      {...register('platforms')}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={platform.id}
                      className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-sky-blue/50 peer-checked:border-sky-blue peer-checked:bg-sky-blue/5 transition-all duration-200 hover:scale-105"
                    >
                      <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white text-sm mr-3`}>
                        {platform.icon}
                      </div>
                      <span className="font-medium text-slate-gray">{platform.name}</span>
                      <div className="ml-auto">
                        <Checkbox
                          checked={selectedPlatforms.includes(platform.id)}
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.platforms && (
                <p className="text-red-500 text-sm">{errors.platforms.message}</p>
              )}
            </div>

            {/* Schedule Date & Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-gray">
                Schedule Date & Time
              </label>
              <div className="relative">
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
                      minDate={new Date()}
                      className="form-input w-full"
                      placeholderText="Select date and time"
                    />
                  )}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.scheduledAt && (
                <p className="text-red-500 text-sm">{errors.scheduledAt.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || createPost.isPending || isOverLimit}
                loading={isSubmitting || createPost.isPending}
                className="w-full"
              >
                {isSubmitting || createPost.isPending ? 'Scheduling...' : 'Schedule Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Platform Previews */}
      {(previewCaption || previewMedia || selectedPlatforms.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformPreviews 
              caption={previewCaption}
              media={previewMedia}
              selectedPlatforms={selectedPlatforms}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostEditor;