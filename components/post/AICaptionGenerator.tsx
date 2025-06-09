import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';

interface AICaptionGeneratorProps {
  onSelectCaption: (caption: string) => void;
}

const AICaptionGenerator: React.FC<AICaptionGeneratorProps> = ({ onSelectCaption }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'humorous' | 'inspirational'>('professional');
  const [platform, setPlatform] = useState<'instagram' | 'twitter' | 'linkedin'>('instagram');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const generateCaptions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/generate-captions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          tone,
          platform,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          length: 'medium',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate captions');
      }
      
      const data = await response.json();
      setCaptions(data.captions);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating captions');
      setCaptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCaption = (caption: string) => {
    onSelectCaption(caption);
    setIsOpen(false);
    setCaptions([]);
  };

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="accent"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="mb-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        ✨ Generate AI Caption
      </Button>
    );
  }

  return (
    <Card className="mb-4 border-indigo/20 bg-gradient-to-br from-indigo/5 to-sky-blue/5">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">AI Caption Generator</CardTitle>
            <Badge variant="ai">✨ AI-Powered</Badge>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              setCaptions([]);
              setError(null);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-gray mb-1">
              Topic
            </label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., productivity tips, business growth"
            />
          </div>
          
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-slate-gray mb-1">
              Keywords (comma separated)
            </label>
            <Input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., success, goals, planning"
            />
          </div>
          
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-gray mb-1">
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="form-select w-full"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humorous</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-slate-gray mb-1">
              Platform
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as any)}
              className="form-select w-full"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
        </div>
        
        <Button
          type="button"
          onClick={generateCaptions}
          disabled={isLoading}
          loading={isLoading}
          className="w-full"
          variant="accent"
        >
          {isLoading ? 'Generating...' : '✨ Generate Captions'}
        </Button>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {captions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-gray">Suggested Captions:</h4>
            <div className="space-y-2">
              {captions.map((caption, index) => (
                <Card
                  key={index}
                  hover
                  className="cursor-pointer transition-all duration-200 hover:border-sky-blue/50"
                  onClick={() => handleSelectCaption(caption)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-gray leading-relaxed">{caption}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-neutral-500">
                        {caption.length} characters
                      </span>
                      <Button size="sm" variant="ghost">
                        Use This Caption
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AICaptionGenerator;