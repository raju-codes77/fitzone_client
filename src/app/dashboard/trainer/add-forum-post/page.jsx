"use client";

import { createForums } from '@/lib/actions/forums';
import React, { useState } from 'react';

const CreateForumPostPage = () => {
  // Controlled form input states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  // Operational management states
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle local file selection change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit flow handling Imgbb image upload followed by post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitStatus('idle');

    if (!title || !description || !imageFile) {
      setErrorMessage('Please provide a title, a brief content description, and select an image.');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Prepare Form Data for Imgbb API endpoint
      const formData = new FormData();
      formData.append('image', imageFile);

      // 2. Dispatch upload to Imgbb (Using standard v1 upload endpoint)
      // NOTE: Replace 'YOUR_IMGBB_API_KEY' with your real Imgbb token
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });

      const imgbbData = await imgbbResponse.json();

      if (!imgbbResponse.ok || !imgbbData.success) {
        throw new Error(imgbbData.error?.message || 'Imgbb host file upload rejected.');
      }

      // 3. Extract the hosted permanent link
      const permanentImageUrl = imgbbData.data.url;
      
      // 4. Build final community payload structure
      const finalPostPayload = {
        title,
        description,
        imageUrl: permanentImageUrl,
        timestamp: new Date().toISOString(),
      };

      const res=await createForums(finalPostPayload);
          if(res.insertedID){
             toast.success("Class added Successfully!")
          }      
      // In production, sync with your platform endpoint database route here:
      // await fetch('/api/forum/create', { method: 'POST', body: JSON.stringify(finalPostPayload) });

      setSubmitStatus('success');
      setTitle('');
      setDescription('');
      setImageFile(null);
      e.target.reset(); // Clear file input field layout visual
      
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Network anomaly encountered during posting routines.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen bg-slate-950 text-slate-100">
      
      {/* Module Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-50">New Community Forum Post</h1>
        <p className="text-sm text-slate-400">Contribute new articles, workout regimes, or industry discussions to the platform feed.</p>
      </div>

      <form onSubmit={handlePostSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
        
        {/* Status Alerts Notification Blocks */}
        {errorMessage && (
          <div className="bg-rose-950/40 border border-rose-900/60 rounded-lg p-3 text-sm text-rose-400">
            {errorMessage}
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-lg p-3 text-sm text-emerald-400">
            Post deployed to the community network stream successfully!
          </div>
        )}

        {/* Title Field Input */}
        <div>
          <label htmlFor="post-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Post Title
          </label>
          <input
            id="post-title"
            type="text"
            placeholder="e.g., Optimal Recovery Intervals for Fast-Twit Hypertrophy"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          />
        </div>

        {/* Image File Selector Field */}
        <div>
          <label htmlFor="post-image" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Cover Graphic / Image Attachment
          </label>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center hover:border-slate-700 transition-colors relative">
            <input
              id="post-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="space-y-1">
              <svg className="mx-auto h-8 w-8 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-slate-300 font-medium">
                {imageFile ? `Selected: ${imageFile.name}` : 'Click here or drop your file to stage image'}
              </p>
              <p className="text-[10px] text-slate-500">Supports PNG, JPG, or WEBP formats up to 32MB</p>
            </div>
          </div>
        </div>

        {/* Post Body Description Field */}
        <div>
          <label htmlFor="post-description" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Article Description / Body Content
          </label>
          <textarea
            id="post-description"
            rows="6"
            placeholder="Structure down breaking updates, workout structures, or resource metrics..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors resize-none"
          />
        </div>

        {/* Submit Anchor Call */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isUploading}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed focus:outline-none"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                {/* Simple loading spinner asset element */}
                <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading Asset to Imgbb...
              </span>
            ) : (
              'Deploy Forum Contribution'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateForumPostPage;