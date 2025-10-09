// src/components/NoteList.jsx (Diperbarui)

import NoteItem from "./NoteItem";

// Menerima prop searchQuery yang baru
const NoteList = ({ notes, onUpdate, onDelete, onEdit, searchQuery }) => { 
  
  const isDataEmpty = notes.length === 0;
  
  // Tentukan pesan yang akan ditampilkan
  let message = "";
  if (isDataEmpty) {
    if (searchQuery && searchQuery.trim().length > 0) {
      // Kondisi 1: Data kosong DAN ada query pencarian
      message = "Note is not found";
    } else {
      // Kondisi 2: Data kosong DAN TIDAK ada query pencarian (datalist benar-benar kosong)
      message = "Touch the '+' button to get started!";
    }
  }

  return (
    <section className="container px-8 py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <h1 className="col-span-full text-center text-gray-500 text-lg font-medium">
            {message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default NoteList;