import supabase from '../config/supabaseClient.js';

// 1. Register User (Menyimpan Nama Lengkap)
export const registerUser = async (req, res) => {
    const { email, password, name } = req.body; // Tangkap 'name' dari frontend

    // Validasi Input
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Nama, Email, dan Password wajib diisi" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password harus minimal 6 karakter" });
    }

    try {
        // Kirim data ke Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                // PENTING: Ini bagian yang menyimpan nama ke metadata user
                data: {
                    full_name: name, 
                }
            }
        });

        if (error) throw error;

        // Cek duplikasi (Supabase kadang tidak melempar error jika user sudah ada tapi belum verify)
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            return res.status(400).json({ error: "Email ini sudah terdaftar sebelumnya." });
        }

        res.status(201).json({ message: "Registrasi berhasil! Silakan login.", user: data.user });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};

// 2. Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Handling khusus jika email confirmation masih nyala
            if (error.message.includes("Email not confirmed")) {
                return res.status(401).json({ error: "Email belum dikonfirmasi. Cek settingan Supabase Anda." });
            }
            throw error;
        }

        // Kirim token dan data user balik ke frontend
        res.status(200).json({ token: data.session.access_token, user: data.user });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(401).json({ error: "Email atau password salah." });
    }
};