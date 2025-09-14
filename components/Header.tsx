
import React from 'react';
import { PhotoIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 shadow-md p-4 flex items-center gap-3">
       <PhotoIcon className="h-8 w-8 text-brand-primary" />
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">
        AI Photo Studio
      </h1>
    </header>
  );
};

export default Header;
