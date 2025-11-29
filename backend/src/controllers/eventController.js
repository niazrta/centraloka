import supabase from '../config/supabaseClient.js';

// 1. Ambil Semua Event
export const getAllEvents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true }); // Urutkan dari tanggal terdekat

        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Ambil Detail Event by ID (BARU)
export const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Event tidak ditemukan" });
        
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};