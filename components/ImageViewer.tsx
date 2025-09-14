
import React from 'react';
import Loader from './Loader';

interface ImageViewerProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  originalImageUrl,
  editedImageUrl,
  isLoading,
}) => {
  const imageUrl = editedImageUrl || originalImageUrl;

  return (
    <div className="relative w-full h-full flex items-center justify-center max-h-[80vh]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={editedImageUrl ? "Edited" : "Original"}
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      ) : (
         <div className="text-center text-text-secondary">No image selected.</div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
          <Loader text="Applying AI magic..." />
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
