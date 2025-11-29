import supabase from '../config/supabaseClient.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header "Authorization: Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Akses ditolak. Token tidak ada." });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) throw new Error("Token tidak valid");

        req.user = user; // Simpan data user di request agar bisa dipakai di controller
        next();
    } catch (err) {
        res.status(403).json({ error: "Sesi habis atau tidak valid." });
    }
};