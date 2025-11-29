import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pastikan port backend sesuai (3000 atau 5000)
  const API_URL = 'http://localhost:3000/api/events';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-blue-600 font-bold">Memuat Event...</div>;
  if (!event) return <div className="text-center mt-20 text-red-500">Event tidak ditemukan.</div>;

  // Format Tanggal
  const eventDate = new Date(event.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-800 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                    Coming Soon
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg flex items-center gap-2">
                    📍 {event.location}
                </p>
            </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Column: Description */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Deskripsi Acara</h2>
          <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">
            {event.description || "Tidak ada deskripsi tersedia untuk event ini."}
          </p>
        </div>

        {/* Right Column: Info Card */}
        <div className="md:col-span-1">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Jadwal Pelaksanaan</h3>
                
                <div className="flex items-start gap-3 mb-4">
                    <div className="bg-white p-2 rounded shadow text-blue-600">
                        📅
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Tanggal</p>
                        <p className="font-semibold text-gray-800">{eventDate}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 mb-6">
                    <div className="bg-white p-2 rounded shadow text-blue-600">
                        📍
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="font-semibold text-gray-800">{event.location}</p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                    Kembali
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DetailEvent;