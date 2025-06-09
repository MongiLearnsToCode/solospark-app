import React from 'react';
import BasePreview, { BasePreviewProps } from './BasePreview';
import { Avatar, AvatarImage } from "../../../components/ui/avatar";

interface LinkedInPreviewProps extends BasePreviewProps {}

const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({ caption, media }) => {
  return (
    <div className="linkedin-preview border border-slate-200 rounded-lg overflow-hidden">
      <div className="p-3 bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://placehold.co/100/F59E0B/FFFFFF?text=SP" alt="Profile" />
          </Avatar>
          <div>
            <p className="font-semibold text-sm">SoloSpark</p>
            <p className="text-xs text-slate-500">Social Media Management Platform</p>
            <p className="text-xs text-slate-500">Just now • 🌐</p>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-slate-800">
            {caption || <span className="text-slate-400 italic">No caption provided</span>}
          </p>
        </div>
      </div>
      
      {media && (
        <div className="w-full border-t border-slate-200">
          <img 
            src={media} 
            alt="Post media" 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400/F9FAFB/475569?text=Media+Preview';
            }}
          />
        </div>
      )}
      
      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span className="text-xs">Like</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="text-xs">Comment</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
              <path d="m13 13 6 6"></path>
            </svg>
            <span className="text-xs">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;
