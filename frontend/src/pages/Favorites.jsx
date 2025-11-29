import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = 'https://wisata-kitaa.vercel.app/api/favorites';

  useEffect(() => {
    if (!token) {
        navigate('/login');
        return;
    }

    const fetchFavorites = async () => {
        try {
            const res = await axios.get(API_URL);
            setFavorites(res.data);
        } catch (error) {
            console.error("Gagal mengambil favorit", error);
        } finally {
            setLoading(false);
        }
    };
    fetchFavorites();
  }, [token, navigate]);

  if (loading) return <div className="text-center mt-20 font-bold text-blue-600">Memuat Favorit...</div>;

  return (
    <div className="min-h-screen pb-10">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Koleksi Favorit Saya ❤️</h2>
        <p className="text-gray-500 mt-2">Daftar destinasi impian yang telah Anda simpan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.length === 0 && (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-xl text-gray-400 mb-4">Belum ada wisata favorit.</p>
                <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                    Jelajahi Wisata
                </Link>
            </div>
        )}

        {favorites.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100">
            <div className="h-48 overflow-hidden relative">
                <img 
                    src={place.image_url} 
                    alt={place.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                    {place.category}
                </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition mb-2 truncate">{place.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                📍 {place.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;