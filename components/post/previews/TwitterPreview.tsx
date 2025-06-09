import React from 'react';
import BasePreview, { BasePreviewProps } from './BasePreview';
import { Avatar, AvatarImage } from "../../../components/ui/avatar";

interface TwitterPreviewProps extends BasePreviewProps {}

const TwitterPreview: React.FC<TwitterPreviewProps> = ({ caption, media }) => {
  return (
    <div className="twitter-preview border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex items-start gap-3 p-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://placehold.co/100/F59E0B/FFFFFF?text=SP" alt="Profile" />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm">SoloSpark</span>
            <span className="text-slate-500 text-sm">@solospark</span>
          </div>
          
          <p className="text-sm mt-1 text-slate-800">
            {caption || <span className="text-slate-400 italic">No caption provided</span>}
          </p>
          
          {media && (
            <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
              <img 
                src={media} 
                alt="Post media" 
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/F9FAFB/475569?text=Media+Preview';
                }}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3 text-slate-500">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="text-xs">24</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              <span className="text-xs">12</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span className="text-xs">36</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
