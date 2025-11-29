import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Sesuaikan port
    axios.get('http://localhost:3000/api/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-800">Kalender Event Wisata</h2>
        <p className="text-gray-500 mt-2">Jangan lewatkan keseruan acara mendatang di kota ini</p>
      </div>

      <div className="grid gap-6">
        {events.length === 0 && <p className="text-center text-gray-500">Belum ada event yang dijadwalkan.</p>}
        
        {events.map(event => (
          <Link to={`/event/${event.id}`} key={event.id} className="block group">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row">
              
              {/* Image Section */}
              <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                {event.image_url ? (
                    <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                )}
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
                    <p className="text-xl font-bold text-blue-600">{new Date(event.date).getDate()}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                        {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                        📍 {event.location}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                        {event.description}
                    </p>
                </div>
                <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                    Lihat Detail Event &rarr;
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Event;