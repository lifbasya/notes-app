// src/components/NoteForm.jsx

import { useState } from "react";

// Menerima prop 'onClose' untuk menutup modal setelah submit
const NoteForm = ({ onAddNote, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana: jangan submit jika kedua field kosong
    if (title.trim() === "" && content.trim() === "") return;
    
    onAddNote(title, content);
    setTitle("");
    setContent("");
    onClose(); // Tutup modal setelah berhasil submit
  };

  return (
    // Hanya form, tanpa container/section yang membatasi lebar
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Add title..."
        className="px-2 focus:outline-none text-lg"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="type your description..."
        className="py-3 px-4 focus:outline-none bg-[#EAEDF2] rounded-xl h-45 resize-none" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <div className="flex justify-end">
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

export default NoteForm;