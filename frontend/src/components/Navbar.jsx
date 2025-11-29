import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// --- DEFINISIKAN KOMPONEN INI DI LUAR NAVBAR ---
const NavItem = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to;
  
  // Style config
  const activeClass = "text-blue-600";
  const inactiveClass = "text-gray-400 hover:text-blue-500";

  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-full h-full py-2 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
    >
      <div className={`p-1 rounded-full ${isActive ? 'bg-blue-50' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const { user, token } = useContext(AuthContext);
  const location = useLocation();
  const isLoggedIn = user || token;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-between items-center h-16 px-2 max-w-md mx-auto md:max-w-full">
        
        {/* 1. HOME */}
        <NavItem 
          to="/" 
          label="Home"
          currentPath={location.pathname}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={location.pathname === '/' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />

        {/* 2. KATEGORI */}
        <NavItem 
          to="/category" 
          label="Kategori"
          currentPath={location.pathname}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={location.pathname === '/category' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          }
        />

        {/* 3. EVENT */}
        <NavItem 
          to="/event" 
          label="Event"
          currentPath={location.pathname}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={location.pathname === '/event' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />

        {/* 4. FAVORIT */}
        <NavItem 
          to="/favorites" 
          label="Favorit"
          currentPath={location.pathname}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={location.pathname === '/favorites' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />

        {/* 5. AKUN / LOGIN */}
        {isLoggedIn ? (
          <NavItem 
            to="/profile" 
            label="Akun"
            currentPath={location.pathname}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={location.pathname === '/profile' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        ) : (
          <NavItem 
            to="/login" 
            label="Masuk"
            currentPath={location.pathname}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            }
          />
        )}

      </div>
    </nav>
  );
};

export default Navbar;