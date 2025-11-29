import supabase from '../config/supabaseClient.js';

// 1. Toggle Favorite (Like/Unlike)
export const toggleFavorite = async (req, res) => {
    const { place_id } = req.body;
    const user_id = req.user.id; // Dari middleware

    try {
        // Cek apakah sudah ada di favorit
        const { data: existing, error: fetchError } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user_id)
            .eq('place_id', place_id)
            .single();

        if (existing) {
            // Jika sudah ada, HAPUS (Unlike)
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('id', existing.id);
            
            if (error) throw error;
            return res.status(200).json({ message: "Dihapus dari favorit", isFavorited: false });
        } else {
            // Jika belum ada, TAMBAH (Like)
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id, place_id }]);
            
            if (error) throw error;
            return res.status(201).json({ message: "Ditambahkan ke favorit", isFavorited: true });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get User Favorites (List Wisata yang disukai)
export const getUserFavorites = async (req, res) => {
    const user_id = req.user.id;

    try {
        // Join tabel favorites dengan places
        const { data, error } = await supabase
            .from('favorites')
            .select(`
                id,
                place_id,
                places:place_id (*) 
            `)
            .eq('user_id', user_id);

        if (error) throw error;
        
        // Format data agar frontend lebih mudah membacanya
        // Kita ambil object 'places' di dalamnya
        const formattedData = data.map(item => item.places);
        
        res.status(200).json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Cek Status Favorit per Item
export const checkFavoriteStatus = async (req, res) => {
    const { placeId } = req.params;
    const user_id = req.user.id;

    try {
        const { data, error } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user_id)
            .eq('place_id', placeId)
            .single();

        // Jika data ada, berarti true
        res.status(200).json({ isFavorited: !!data });
    } catch (err) {
        // Jika error karena tidak ditemukan row, return false
        res.status(200).json({ isFavorited: false });
    }
};