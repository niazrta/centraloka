import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [newestPlaces, setNewestPlaces] = useState([]);
  
  
  const API_URL = 'https://wisata-kitaa.vercel.app/api/places'; 

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    try {
      const resPop = await axios.get(`${API_URL}/popular`);
      setPopularPlaces(resPop.data);
      
      const resNew = await axios.get(API_URL);
      setNewestPlaces(resNew.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Card = ({ place }) => (
    <Link to={`/place/${place.id}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden mb-4">
      <img src={place.image_url} alt={place.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-bold text-lg">{place.name}</h3>
        <p className="text-gray-500 text-sm truncate">📍{place.location}</p>
      </div>
    </Link>
  );

  return (
    <div>
      {/* --- BAGIAN HEADER / HERO SECTION BARU --- */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-10 rounded-xl overflow-hidden shadow-xl group">
        {/* Gambar Latar (Ganti src dengan foto Jawa Tengah pilihanmu) */}
        <img 
          src="https://media.istockphoto.com/id/585488420/id/foto/patung-buddha-kuno-dan-stupa-di-candi-borobudur.jpg?s=612x612&w=0&k=20&c=Zfnjxu2rbS0VLsYxZHgtOLIksqGhLg4WN6BUoZ6VDDA=" 
          alt="Candi Borobudur Jawa Tengah" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay Gelap supaya teks terbaca */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Jelajahi Pesona <span className="text-blue-400">Jawa Tengah</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl drop-shadow-md mb-6">
            Temukan surga tersembunyi, budaya yang kaya, dan destinasi wisata tak terlupakan di jantung pulau Jawa.
          </p>
          <a href="#explore" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg border border-transparent hover:border-white">
            Mulai Petualangan
          </a>
        </div>
      </div>
      {/* --- AKHIR BAGIAN HEADER --- */}

      {/* Bagian Populer */}
      <section id="explore" className="mb-8 scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Wisata Paling Populer</h2>
          {/* <Link to="/category/popular" className="text-sm text-blue-600 hover:underline">Lihat Semua</Link> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularPlaces.length > 0 ? (
            popularPlaces.map(place => <Card key={place.id} place={place} />)
          ) : (
            <p className="col-span-3 text-center text-gray-400 py-10">Belum ada data populer.</p>
          )}
        </div>
      </section>

      {/* Bagian Terbaru */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Wisata Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newestPlaces.length > 0 ? (
            newestPlaces.map(place => <Card key={place.id} place={place} />)
          ) : (
             <p className="col-span-full text-center text-gray-400 py-10">Belum ada data wisata.</p>
          )}
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-xl text-center mt-10 shadow-inner border border-blue-200">
        <h3 className="text-2xl font-bold mb-2 text-blue-900">Punya rekomendasi tempat asik?</h3>
        <p className="mb-6 text-gray-700">Bantu kami melengkapi katalog wisata ini dengan menambahkan tempat favoritmu di Jawa Tengah.</p>
        <Link to="/add" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1">
          + Tambah Wisata Sekarang
        </Link>
      </section>
    </div>
  );
};

export default Home;