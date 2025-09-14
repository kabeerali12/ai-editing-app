
import React from 'react';
import { SparklesIcon, DownloadIcon, TrashIcon } from './icons/Icons';
import Loader from './Loader';

interface EditorPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onApply: () => void;
  onReset: () => void;
  onDownload: () => void;
  isLoading: boolean;
  hasEditedImage: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  prompt,
  setPrompt,
  onApply,
  onReset,
  onDownload,
  isLoading,
  hasEditedImage,
}) => {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col gap-6 h-full">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-text-secondary mb-2">
          Describe your edit
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'add a futuristic city in the background' or 'make it look like a vintage photograph'"
          className="w-full bg-base-300 text-text-primary rounded-md border border-base-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition p-2"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onApply}
          disabled={isLoading || !prompt}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isLoading ? (
            <Loader size="sm" />
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              <span>Generate</span>
            </>
          )}
        </button>

        {hasEditedImage && (
          <button
            onClick={onDownload}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 transition-colors"
          >
            <DownloadIcon className="h-5 w-5" />
            <span>Download</span>
          </button>
        )}
      </div>

      <div className="mt-auto border-t border-base-300 pt-4">
        <button
          onClick={onReset}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-red-400 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;
