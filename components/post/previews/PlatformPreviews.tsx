import React from 'react';
import InstagramPreview from './InstagramPreview';
import TwitterPreview from './TwitterPreview';
import LinkedInPreview from './LinkedInPreview';

interface PlatformPreviewsProps {
  caption: string;
  media?: string;
  selectedPlatforms: string[];
}

const PlatformPreviews: React.FC<PlatformPreviewsProps> = ({ 
  caption, 
  media, 
  selectedPlatforms 
}) => {
  if (selectedPlatforms.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>Select at least one platform to see previews</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-slate-800">Platform Previews</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPlatforms.includes('instagram') && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-slate-700">Instagram</h4>
            <InstagramPreview caption={caption} media={media} />
          </div>
        )}
        
        {selectedPlatforms.includes('twitter') && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-slate-700">X</h4>
            <TwitterPreview caption={caption} media={media} />
          </div>
        )}
        
        {selectedPlatforms.includes('linkedin') && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-slate-700">LinkedIn</h4>
            <LinkedInPreview caption={caption} media={media} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPreviews;
