// src/components/Modal.jsx

import { X } from 'lucide-react';

// Menerima prop 'title' untuk judul dinamis
const Modal = ({ isOpen, onClose, children, title }) => { 
  if (!isOpen) return null;

  return (
    <div
      // Styling backdrop baru Anda
      className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        // Styling container baru Anda
        className="bg-white rounded-xl shadow-2xl w-full max-w-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200"> {/* Tambah border-b agar rapi */}
          
          {/* Menggunakan prop 'title' (menggantikan "New Note" statis) */}
          <h2 className="text-2xl font-semibold">{title}</h2> 
          
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100" // Sedikit styling untuk tombol X
            aria-label="Close modal"
          >
            <X className="w-6 h-6"/>
          </button>
        </div>
        
        <div className="p-4">
            {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;