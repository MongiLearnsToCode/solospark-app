import React from 'react';
import BasePreview, { BasePreviewProps } from './BasePreview';
import { Avatar, AvatarImage } from "../../../components/ui/avatar";

interface InstagramPreviewProps extends BasePreviewProps {}

const InstagramPreview: React.FC<InstagramPreviewProps> = ({ caption, media }) => {
  return (
    <div className="instagram-preview">
      <div className="flex items-center gap-2 p-3 border-b border-slate-200">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/100/F59E0B/FFFFFF?text=SP" alt="Profile" />
        </Avatar>
        <span className="font-medium text-sm">solospark</span>
      </div>
      
      <BasePreview 
        caption={caption} 
        media={media}
        className="border-0 shadow-none"
      >
        <div className="mt-2 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        <p className="text-xs font-medium mt-2">42 likes</p>
      </BasePreview>
    </div>
  );
};

export default InstagramPreview;
