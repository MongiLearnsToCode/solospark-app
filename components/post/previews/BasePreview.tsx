import React from 'react';
import { Card, CardContent } from "../../ui/card";

export interface BasePreviewProps {
  caption: string;
  media?: string;
  className?: string;
  children?: React.ReactNode;
}

const BasePreview: React.FC<BasePreviewProps> = ({ caption, media, className, children }) => {
  return (
    <Card className={`overflow-hidden shadow-md ${className}`}>
      <CardContent className="p-0">
        {media && (
          <div className="w-full h-40 bg-slate-200 overflow-hidden">
            <img 
              src={media} 
              alt="Post media" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/F9FAFB/475569?text=Media+Preview';
              }}
            />
          </div>
        )}
        {!media && (
          <div className="w-full h-40 bg-slate-200 flex items-center justify-center text-slate-500">
            No media preview
          </div>
        )}
        <div className="p-4">
          {caption ? (
            <p className="text-sm text-slate-800 line-clamp-3">{caption}</p>
          ) : (
            <p className="text-sm text-slate-400 italic">No caption provided</p>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasePreview;
