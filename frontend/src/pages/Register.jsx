import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState(''); // State untuk Nama
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sesuaikan port backend (3000 atau 5000)
  const API_URL = 'http://localhost:3000/api/auth/register';

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi sederhana di frontend
    if (password.length < 6) {
        alert("Password harus minimal 6 karakter!");
        setLoading(false);
        return;
    }

    try {
      // Kirim object lengkap { name, email, password }
      await axios.post(API_URL, { 
        name, 
        email, 
        password 
      });
      
      alert('Registrasi Berhasil! Silakan Login dengan akun baru Anda.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Terjadi kesalahan saat registrasi";
      alert("Gagal Registrasi: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600">Buat Akun</h2>
            <p className="text-gray-500 mt-2">Bergabunglah untuk membagikan pengalaman wisatamu</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Input Nama Lengkap */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  required 
              />
          </div>

          {/* Input Email */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input 
                  type="email" 
                  placeholder="nama@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  required 
              />
          </div>

          {/* Input Password */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                  type="password" 
                  placeholder="Minimal 6 karakter" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  required 
              />
          </div>

          <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-md disabled:bg-gray-400"
          >
              {loading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login disini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;