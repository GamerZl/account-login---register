const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

//  THIS LINE IS REQUIRED 
app.use(express.static("public"));

// Temporary in-memory user storage
const users = [];

// REGISTER route
app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.json({ success: false, message: 'Username already taken' });
  }

  users.push({ email, username, password });
  console.log('Users:', users);

  res.json({ success: true, message: 'Registration successful!' });
});

// LOGIN route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.json({ success: true, message: 'Login successful!' });
  }

  res.json({ success: false, message: 'Invalid username or password' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});