const express = require('express');
const app = express();
// If you change this value, you must update the port number within vite.config in the frontend folder. 
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({message: "If your seeing this message than everythig is working!"})
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
