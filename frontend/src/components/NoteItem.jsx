// src/components/NoteItem.jsx

import { showFormattedDate } from "../helpers/dateUtils";
import { Pencil, Trash2 } from 'lucide-react';

// Hapus onUpdate, karena update kini dilakukan di Modal
const NoteItem = ({ note, onDelete, onEdit }) => { 
  
  return (
    <div className="rounded-lg shadow-md bg-white w-full p-5 flex flex-col justify-between"> 
      
      <div>
        <p className="font-medium text-xl">{note.title}</p>
        <p className="text-base">{note.content}</p>
        <p className="text-xs text-gray-500 mt-2">
          {showFormattedDate(note.created_at || note.createdAt)}
        </p>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-400 flex text-white px-3 py-1.5 gap-2 justify-center rounded cursor-pointer hover:bg-blue-500 transition-colors"
          onClick={() => onEdit(note)} 
        >
          <Pencil className="w-5"/>
          Edit
        </button>
        <button
          className="bg-red-500 flex text-white px-3 py-1.5 gap-2 justify-center rounded hover:bg-red-600 transition-colors cursor-pointer"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="w-5"/>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;