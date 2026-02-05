
// Defining Imports
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('blog.db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

const port = 3000;

app.get('/', (req, res) => {        
  res.sendFile(path.join(__dirname, 'pages/newpost.html'));
});

app.get('/blog', (req, res) => {

  const query = `SELECT blog_title, blog_content, date FROM blog ORDER BY date DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load posts' });
    }

    res.render('blog', { posts: rows });
  });
});

app.post('/submit', (req, res) => {
  const { blog_title, blog_content, date } = req.body;

  const query = `
    INSERT INTO blog (blog_title, blog_content, date)
    VALUES (?, ?, ?)
  `;

  db.run(query, [blog_title, blog_content, date], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    res.redirect('/blog');
  });
});

app.listen(port, () => {            
  console.log(`Server running at http://localhost:${port}`);
});
