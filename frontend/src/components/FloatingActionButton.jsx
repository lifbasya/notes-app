// src/components/FloatingActionButton.jsx
import { Plus } from 'lucide-react';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-600 transition-colors z-40 cursor-pointer"
      aria-label="Add new note"
    >
      <Plus />
    </button>
  );
};

export default FloatingActionButton;