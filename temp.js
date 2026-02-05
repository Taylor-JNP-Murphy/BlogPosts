const sqlite3 = require('sqlite3').verbose();

// Open (or create) the database
const db = new sqlite3.Database('blog.db');

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS blog (
    request_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    blog_content TEXT NOT NULL,
    date DATE NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists.');
  }

  // Close the database
  db.close();
});
