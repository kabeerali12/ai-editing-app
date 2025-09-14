
import React, { useState, useCallback } from 'react';
import { type ImageFile } from './types';
import { editImageWithGemini } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorPanel from './components/EditorPanel';
import ImageViewer from './components/ImageViewer';
import { Toaster, toast } from './components/Toaster';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      setOriginalImage({
        file,
        base64: base64Data,
        url: URL.createObjectURL(file),
      });
      setEditedImage(null);
      setError(null);
      setPrompt('');
    };
    reader.onerror = () => {
      const errorMessage = 'Failed to read the image file.';
      setError(errorMessage);
      toast.error(errorMessage);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleApplyEdits = useCallback(async () => {
    if (!originalImage || !prompt) {
      toast.error('Please upload an image and enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEditedImage(null); // Clear previous edit

    try {
      const newImageBase64 = await editImageWithGemini(
        originalImage.base64,
        originalImage.file.type,
        prompt
      );
      if (newImageBase64) {
        setEditedImage(`data:${originalImage.file.type};base64,${newImageBase64}`);
        toast.success('Image edited successfully!');
      } else {
        throw new Error('The AI model did not return an image. Try a different prompt.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleReset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };
  
  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `edited_${originalImage?.file.name || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-base-100 text-text-primary font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <>
            <div className="w-full lg:w-1/3 xl:w-1/4">
               <EditorPanel
                prompt={prompt}
                setPrompt={setPrompt}
                onApply={handleApplyEdits}
                onReset={handleReset}
                onDownload={handleDownload}
                isLoading={isLoading}
                hasEditedImage={!!editedImage}
              />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4 flex-grow flex items-center justify-center bg-base-200 rounded-lg p-4">
              <ImageViewer
                originalImageUrl={originalImage.url}
                editedImageUrl={editedImage}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default App;
