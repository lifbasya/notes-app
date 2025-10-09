import { User, Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    // State untuk mengontrol apakah search bar mobile sedang aktif
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

    // Fungsi untuk mengubah status tampilan search bar mobile
    const toggleMobileSearch = () => {
        setIsMobileSearchVisible(prev => {
            // Jika kita menutup search bar, kosongkan hasil pencarian
            if (prev) onSearch(''); 
            return !prev;
        });
    };
    
    // Struktur utama input pencarian
    const SearchInput = (
        <div 
            className="flex items-center gap-1 px-3 bg-white rounded-lg shadow-md w-full transition-shadow"
            role="search"
        >
            <Search className="text-gray-400"/>
            <input
                type="text"
                placeholder="Search notes..."
                className="w-full p-3 outline-none"
                // Menghubungkan input dengan fungsi pencarian dari App
                onChange={(e) => onSearch(e.target.value)} 
                // Autofocus saat search bar mobile dibuka
                autoFocus={isMobileSearchVisible} 
            />
            
            {/* Tombol Tutup (X) hanya terlihat saat mode search mobile aktif */}
            {isMobileSearchVisible && (
                <button 
                    onClick={toggleMobileSearch} 
                    className="md:hidden text-gray-500 hover:text-red-500 p-1"
                    aria-label="Close search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );

    // 1. Tampilan Full-Width Search Bar Saat Mobile Search Aktif
    if (isMobileSearchVisible) {
        return (
            <div className="w-full flex items-center px-4 py-2 bg-gray-50 md:hidden">
                {SearchInput}
            </div>
        );
    }
    
    // 2. Tampilan Default (Desktop dan Mobile non-search mode)
    return (
        <div className="w-full flex items-center px-8 py-2 justify-between">
            
            {/* Title (Selalu terlihat) */}
            <div className="text-2xl font-semibold lg:text-3xl">
                <h1 className="">Notes App</h1>
            </div>

            {/* Desktop Search Bar (Hanya terlihat di layar MD ke atas) */}
            <div className="hidden md:flex md:w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
                {SearchInput}
            </div>

            {/* Icon Kanan (Mobile Search Toggle & User Icon) */}
            <div className="flex items-center gap-4">
                
                {/* Mobile Search Toggle (Hanya terlihat di layar kecil) */}
                <button
                    className="p-2 md:hidden text-black"
                    onClick={toggleMobileSearch}
                    aria-label="Open search"
                >
                    <Search className="w-6 h-6" />
                </button>

                {/* User Icon (Hanya terlihat di layar besar) */}
                <div className="p-2 bg-[#DCE1E5] rounded-full hidden md:block">
                    <User className="text-[#464B4F] w-6 h-6"/>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;