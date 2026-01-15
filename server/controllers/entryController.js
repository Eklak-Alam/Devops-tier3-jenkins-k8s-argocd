// controllers/entryController.js
const db = require('../config/db');

// 1. CREATE (Post a new entry)
exports.createEntry = async (req, res) => {
    const { title, content, category, mood } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO daily_entries (title, content, category, mood) VALUES (?, ?, ?, ?)',
            [title, content, category, mood]
        );
        res.status(201).json({ message: 'Entry created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. READ (Get all entries)
exports.getAllEntries = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM daily_entries ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. READ ONE (Get specific entry)
exports.getEntryById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM daily_entries WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. UPDATE (Edit an entry)
exports.updateEntry = async (req, res) => {
    const { title, content, category, mood } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE daily_entries SET title = ?, content = ?, category = ?, mood = ? WHERE id = ?',
            [title, content, category, mood, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json({ message: 'Entry updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. DELETE (Remove an entry)
exports.deleteEntry = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM daily_entries WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};