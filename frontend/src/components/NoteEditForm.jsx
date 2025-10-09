// src/components/NoteEditForm.jsx

import { useState, useEffect } from "react";

const NoteEditForm = ({ note, onUpdate, onClose }) => {
  const [titleEdit, setTitleEdit] = useState(note.title);
  const [contentEdit, setContentEdit] = useState(note.content);

  useEffect(() => {
    setTitleEdit(note.title);
    setContentEdit(note.content);
  }, [note.title, note.content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleEdit.trim() === "" && contentEdit.trim() === "") return;
    
    onUpdate(note.id, titleEdit, contentEdit);
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={titleEdit}
        placeholder="Edit title..."
        className="px-2 focus:outline-none text-lg" 
        required
        onChange={(e) => setTitleEdit(e.target.value)}
      />
      <textarea
        value={contentEdit}
        placeholder="Edit your description..."
        className="py-3 px-4 focus:outline-none bg-[#EAEDF2] rounded-xl h-45 resize-none" 
        onChange={(e) => setContentEdit(e.target.value)}
      />
      
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="bg-gray-400 text-white text-lg font-medium rounded-md py-1.5 px-5 hover:bg-gray-500 transition-colors cursor-pointer"
          onClick={onClose} 
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white text-lg font-medium rounded-md py-1.5 px-5 hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default NoteEditForm;