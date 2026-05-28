const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shafie334",   
  database: "myapp"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});


app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const sql = "INSERT INTO user (email, username, password) VALUES (?, ?, ?)";

  db.query(sql, [email, username, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.json({ success: false, message: "Username already taken" });
      }
      return res.json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Registration successful!" });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      return res.json({ success: true, message: "Login successful!" });
    }

    res.json({ success: false, message: "Invalid username or password" });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});