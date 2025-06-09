import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const ShadcnTest = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-h1 font-heading mb-6">Shadcn UI Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-h2 font-heading mb-2">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="indigo">Indigo</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-h2 font-heading mb-2">Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h2 className="text-h2 font-heading mb-2">Input</h2>
          <Input placeholder="Enter text here..." />
        </div>
        
        <div>
          <h2 className="text-h2 font-heading mb-2">Checkbox</h2>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadcnTest;
