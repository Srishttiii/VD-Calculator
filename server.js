const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calculator_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

app.post('/api/log', (req, res) => {
  const { expression, result } = req.body;
  const sql = 'INSERT INTO logs (expression, result) VALUES (?, ?)';
  db.query(sql, [expression, result], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Logged successfully' });
  });
});

app.get('/api/logs', (req, res) => {
  db.query('SELECT * FROM logs ORDER BY id DESC', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
