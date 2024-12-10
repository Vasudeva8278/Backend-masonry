const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',       // Same as HOST in Django settings
    user: 'root',            // Same as USER in Django settings
    password: 'vasu@1234',   // Same as PASSWORD in Django settings
    database: 'Masonry',     // Same as NAME in Django settings
    port: 3306               // Same as PORT in Django settings
});

module.exports = pool.promise(); // Use the promise-based API for asynchronous operations
