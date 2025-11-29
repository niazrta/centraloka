import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">WisataKita</Link>
        
        <div className="flex space-x-4 text-sm font-medium items-center">
          <Link to="/" className="hover:text-blue-200">Beranda</Link>
          <Link to="/category" className="hover:text-blue-200">Kategori</Link>
          <Link to="/event" className="hover:text-blue-200">Event</Link>
          <Link to="/favorites" className="hover:text-blue-200">Favorit</Link>
          
          {token ? (
            // Jika sudah login
            <Link to="/profile" className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-gray-100">Profil Saya</Link>
          ) : (
            // Jika belum login
            <Link to="/login" className="bg-blue-800 px-3 py-1 rounded-full hover:bg-blue-900">Masuk / Daftar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;