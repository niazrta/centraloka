import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [myPlaces, setMyPlaces] = useState([]);
  const { user, token, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  // LOGIKA NAMA:
  // 1. Cek metadata full_name (dari register baru)
  // 2. Jika kosong, pakai email (untuk user lama)
  const userName = user?.user_metadata?.full_name || user?.email || "Pengguna";
  const userEmail = user?.email || "";

  // Sesuaikan port backend
  const API_URL = 'http://localhost:3000/api/places';

  useEffect(() => {
    if (!token) {
        navigate('/login');
    } else {
        fetchMyPlaces();
    }
  }, [token]);

  const fetchMyPlaces = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/me`); 
      setMyPlaces(res.data);
    } catch (error) {
      console.error("Gagal mengambil data wisata:", error);
    }
  };

  const handleLogout = () => {
    if(window.confirm("Yakin ingin keluar?")) {
      logout();
      navigate('/login');
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Hapus wisata ini secara permanen?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMyPlaces(); 
      } catch (error) {
        alert("Gagal menghapus wisata");
      }
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* --- Header Profil --- */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
            {/* Avatar Lingkaran */}
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-md">
                {/* Ambil huruf depan nama */}
                {userName.charAt(0).toUpperCase()}
            </div>
            
            {/* Info User */}
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{userName}</h2>
                <p className="text-gray-500 text-sm">{userEmail}</p>
                <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    User Verified
                </span>
            </div>
        </div>

        <button 
            onClick={handleLogout} 
            className="px-6 py-2 border border-red-200 text-red-600 rounded-full font-semibold hover:bg-red-50 transition"
        >
            Logout
        </button>
      </div>

      {/* --- Statistik Singkat (Optional) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg flex flex-col justify-between">
              <div>
                  <p className="text-blue-100 text-sm">Total Wisata Anda</p>
                  <h3 className="text-4xl font-bold mt-1">{myPlaces.length}</h3>
              </div>
              <Link to="/add" className="mt-4 bg-white/20 text-white text-center py-2 rounded-lg hover:bg-white/30 transition text-sm backdrop-blur-sm">
                  + Tambah Baru
              </Link>
          </div>
          
          <div className="md:col-span-2 bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center">
              <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Selamat Datang di Dashboard!</h3>
                  <p className="text-blue-700">
                      Di sini kamu bisa mengelola semua destinasi wisata yang pernah kamu bagikan. 
                      Pastikan informasi wisata selalu update agar membantu wisatawan lain.
                  </p>
              </div>
          </div>
      </div>

      {/* --- List Wisata --- */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Daftar Wisata Saya</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPlaces.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-400 text-lg mb-2">Belum ada wisata.</p>
                    <Link to="/add" className="text-blue-600 font-semibold hover:underline">Mulai tambahkan wisata pertamamu</Link>
                </div>
            )}
            
            {myPlaces.map(place => (
            <div key={place.id} className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden">
                {/* Image */}
                <div className="h-48 w-full relative">
                    <img src={place.image_url} alt={place.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                        {place.category}
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{place.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                            📍 {place.location}
                        </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link 
                            to={`/edit/${place.id}`} 
                            className="text-center py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm font-semibold hover:bg-yellow-100 transition"
                        >
                            ✏️ Edit
                        </Link>
                        <button 
                            onClick={() => handleDelete(place.id)}
                            className="text-center py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                        >
                            🗑️ Hapus
                        </button>
                        <Link 
                            to={`/place/${place.id}`} 
                            className="col-span-2 text-center py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                        >
                            Lihat Detail Publik &rarr;
                        </Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;