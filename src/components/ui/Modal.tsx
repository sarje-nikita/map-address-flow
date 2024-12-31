import React from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
}
