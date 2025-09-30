'use client';

import { useState, useRef } from 'react';

interface DocumentImageUploadProps {
  id: string;
  label: string;
  type: 'passport' | 'id_card' | 'driver_license';
  onImageChange: (file: File | null) => void;
  className?: string;
}

export default function DocumentImageUpload({
  id,
  label,
  type,
  onImageChange,
  className = ''
}: DocumentImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getIcon = () => {
    switch (type) {
      case 'passport':
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'id_card':
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        );
      case 'driver_license':
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getDocumentName = () => {
    switch (type) {
      case 'passport':
        return 'Passport';
      case 'id_card':
        return 'ID Card';
      case 'driver_license':
        return 'Driver License';
      default:
        return 'Document';
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : previewUrl
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        style={{
          borderColor: isDragOver ? '#1e90ff' : previewUrl ? '#10b981' : undefined,
          backgroundColor: isDragOver ? '#f0f8ff' : previewUrl ? '#f0fdf4' : undefined
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt={`${getDocumentName()} preview`}
                className="w-32 h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-green-600 font-medium">
              {getDocumentName()} uploaded successfully
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {getIcon()}
            <div>
              <p className="text-sm font-medium text-gray-900">
                Upload {getDocumentName()} Image
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Drag and drop or click to select
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
