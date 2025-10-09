// src/App.jsx

import { useEffect, useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import NoteForm from "./components/NoteForm";
import NoteEditForm from "./components/NoteEditForm"; 
import NoteList from "./components/NoteList";
import Modal from "./components/Modal"; 
import FloatingActionButton from "./components/FloatingActionButton"; 

function App() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal Tambah Baru
  const [searchQuery, setSearchQuery] = useState(""); 
  
  // State untuk Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null); // Objek catatan yang sedang diedit

  const baseUrl = "https://notesappapi-alif.vercel.app";

  // --- HANDLER MODAL TAMBAH BARU ---
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // --- HANDLER MODAL EDIT ---
  const handleOpenEditModal = (note) => {
      setNoteToEdit(note);
      setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
      setNoteToEdit(null);
      setIsEditModalOpen(false);
  };
  
  // --- LOGIKA FETCHING & CRUD ---
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${baseUrl}/notes`);
      const result = await res.json();
      setNotes(result.data || []); 
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newTitle, newContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      const result = await res.json();
      if (res.ok) {
        setNotes((prevNotes) => [result.data, ...prevNotes]); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, { method: "DELETE" });
      if (res.ok) { 
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (id, updateTitle, updateContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateTitle, content: updateContent }),
      });

      const result = await res.json();
      setNotes((prevNotes) => {
        return prevNotes.map((note) => (note.id === id ? result.data : note));
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // --- LOGIKA PENCARIAN & FILTERING ---
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); 
  };

  const filteredNotes = useMemo(() => {
    if (!searchQuery) {
      return notes; 
    }
    
    return notes.filter((note) => {
      const titleLower = (note.title || '').toLowerCase();
      const contentLower = (note.content || '').toLowerCase();
      
      return titleLower.includes(searchQuery) || contentLower.includes(searchQuery);
    });
  }, [notes, searchQuery]);


  return (
    <div className="relative min-h-screen">
      
      <SearchBar onSearch={handleSearch} /> 

      <main className="flex flex-col items-center">
        
        {/* PENTING: Meneruskan searchQuery ke NoteList */}
        <NoteList
          notes={filteredNotes} 
          onDelete={handleDelete}
          onUpdate={handleUpdateNote}
          onEdit={handleOpenEditModal}
          searchQuery={searchQuery} // <-- Meneruskan state pencarian
        />
      </main>

      <FloatingActionButton onClick={handleOpenModal} />

      {/* MODAL TAMBAH BARU: Menggunakan judul dinamis "New Note" */}
      <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          title="New Note" // <-- Judul untuk modal tambah
      >
        <NoteForm 
            onAddNote={addNote} 
            onClose={handleCloseModal} 
        />
      </Modal>

      {/* MODAL EDIT: Menggunakan judul dinamis "Edit Note" */}
      {isEditModalOpen && noteToEdit && (
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={handleCloseEditModal}
          title="Edit Note" // <-- Judul untuk modal edit
        >
          <NoteEditForm
            note={noteToEdit} 
            onUpdate={handleUpdateNote}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}
      
    </div>
  );
}

export default App;