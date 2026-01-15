// database/initDb.js
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const initDb = async () => {
    try {
        // Read the SQL file
        const sqlPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(sqlPath, 'utf8');

        // Execute the SQL
        // Note: multipleStatements: true might be needed in connection config if you have many queries,
        // but for safety, we often run one big block or split them. 
        // For this simple table create, query() works fine.
        await db.query(schema);
        
        console.log("✅ Database initialized using 'schema.sql'");
    } catch (error) {
        console.error("❌ Database init failed:", error);
        process.exit(1);
    }
};

module.exports = initDb;