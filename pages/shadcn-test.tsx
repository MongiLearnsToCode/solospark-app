import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const ShadcnTestPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <>
      <Head>
        <title>SoloSpark - Shadcn UI Test</title>
        <meta name="description" content="Testing Shadcn UI components for SoloSpark MVP" />
      </Head>
      <Toaster />
      <div className="min-h-screen bg-offwhite">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-h1-mobile md:text-h1 font-poppins font-bold text-center">Shadcn UI Test</h1>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-slate-gray mb-4">This page demonstrates the Shadcn UI components configured for the SoloSpark MVP.</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-amber-gold text-white text-sm rounded-full">Amber Gold</span>
              <span className="inline-block px-3 py-1 bg-sky-blue text-white text-sm rounded-full">Sky Blue</span>
              <span className="inline-block px-3 py-1 bg-indigo text-white text-sm rounded-full">Indigo</span>
              <span className="inline-block px-3 py-1 bg-slate-gray text-white text-sm rounded-full">Slate Gray</span>
              <span className="inline-block px-3 py-1 bg-offwhite text-slate-gray text-sm rounded-full border border-slate-200">Off White</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Button Component */}
            <Card>
              <CardHeader>
                <CardTitle>Button Component</CardTitle>
                <CardDescription>Various button styles using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-amber-gold hover:bg-amber-gold/90">Amber Gold</Button>
                  <Button className="bg-sky-blue hover:bg-sky-blue/90">Sky Blue</Button>
                  <Button className="bg-indigo hover:bg-indigo/90">Indigo</Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Component */}
            <Card>
              <CardHeader>
                <CardTitle>Input Component</CardTitle>
                <CardDescription>Text input field using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter your name" />
                <Input placeholder="Enter your email" type="email" />
                <div className="flex gap-2">
                  <Input placeholder="Search..." className="flex-1" />
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Checkbox Component */}
            <Card>
              <CardHeader>
                <CardTitle>Checkbox Component</CardTitle>
                <CardDescription>Selection controls using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subscribe to newsletter
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Select Component */}
            <Card>
              <CardHeader>
                <CardTitle>Select Component</CardTitle>
                <CardDescription>Dropdown selection using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Dialog Component */}
            <Card>
              <CardHeader>
                <CardTitle>Dialog Component</CardTitle>
                <CardDescription>Modal dialogs using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                      <DialogDescription>
                        Create a new social media post to schedule.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input placeholder="Enter your caption..." className="mb-4" />
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select platforms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Calendar Component */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar Component</CardTitle>
                <CardDescription>Date picker using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
              <CardFooter>
                <p className="text-sm text-slate-500">
                  Selected date: {date?.toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>

            {/* Avatar Component */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar Component</CardTitle>
                <CardDescription>User avatars using Shadcn UI</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/radix-ui.png" alt="@radix" />
                  <AvatarFallback>RU</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            {/* Toast Component */}
            <Card>
              <CardHeader>
                <CardTitle>Toast Component</CardTitle>
                <CardDescription>Notifications using Sonner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => toast('Post created successfully!')}
                    className="bg-amber-gold hover:bg-amber-gold/90"
                  >
                    Show Success Toast
                  </Button>
                  <Button 
                    onClick={() => toast.error('Failed to create post.')}
                    variant="destructive"
                  >
                    Show Error Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <footer className="bg-slate-gray text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>SoloSpark MVP - Shadcn UI Components</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ShadcnTestPage;
