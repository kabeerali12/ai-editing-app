
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

type ToastType = 'success' | 'error';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

let toasts: ToastMessage[] = [];
let listeners: React.Dispatch<React.SetStateAction<ToastMessage[]>>[] = [];

const toast = {
  success: (message: string) => {
    const newToast = { id: Date.now(), message, type: 'success' as ToastType };
    toasts = [...toasts, newToast];
    listeners.forEach(listener => listener(toasts));
  },
  error: (message: string) => {
    const newToast = { id: Date.now(), message, type: 'error' as ToastType };
    toasts = [...toasts, newToast];
    listeners.forEach(listener => listener(toasts));
  },
};

const Toaster: React.FC = () => {
  const [localToasts, setLocalToasts] = useState(toasts);

  const removeToast = useCallback((id: number) => {
    toasts = toasts.filter(t => t.id !== id);
    listeners.forEach(listener => listener(toasts));
  }, []);

  useEffect(() => {
    listeners.push(setLocalToasts);
    return () => {
      listeners = listeners.filter(li => li !== setLocalToasts);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed top-5 right-5 z-50 w-full max-w-xs space-y-3">
      {localToasts.map(t => (
        <Toast key={t.id} {...t} onDismiss={() => removeToast(t.id)} />
      ))}
    </div>,
    document.body
  );
};

interface ToastProps extends ToastMessage {
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const baseClasses = "flex items-center w-full p-4 text-text-primary rounded-lg shadow-lg";
  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={onDismiss}
        className="ml-auto -mx-1.5 -my-1.5 bg-transparent rounded-lg p-1.5 inline-flex h-8 w-8 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

export { Toaster, toast };
