import { useState } from 'react';
import { Menu, Search, Video, Bell, User as UserIcon, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic later or just navigate
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[10px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">NoorStream</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <button type="submit" className="px-6 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/upload" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 text-gray-700 font-medium">
          <Upload className="w-5 h-5" />
          <span>Upload</span>
        </Link>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
        {user ? (
          <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer block">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </Link>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 text-emerald-600 border border-emerald-200 rounded-full hover:bg-emerald-50">
            <UserIcon className="w-5 h-5" />
            <span className="font-medium">Sign in</span>
          </button>
        )}
      </div>
    </nav>
  );
}
