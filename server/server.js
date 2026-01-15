const express = require('express');
const cors = require('cors');
require('dotenv').config();

const initDb = require('./database/initDb'); // Import the DB initializer
const entryRoutes = require('./routes/entryRoutes'); // Import routes

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entries', entryRoutes);

// Start Server
// We run initDb() first to ensure the table exists before the server takes requests
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 API endpoint: http://localhost:${PORT}/api/entries`);
    });
});