
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`w-full max-w-2xl h-96 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-colors duration-300 ${isDragging ? 'border-brand-primary bg-base-200' : 'border-base-300 hover:border-brand-secondary hover:bg-base-200'}`}
      >
        <div className="text-center p-8">
          <UploadIcon className="mx-auto h-16 w-16 text-text-secondary mb-4" />
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Drag & Drop or Click to Upload</h2>
          <p className="text-text-secondary">Supported formats: PNG, JPG, WEBP</p>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
