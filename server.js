const express = require('express');
const app = express();
const Database = require('better-sqlite3');

// If you change this value, you must update the port number within vite.config in the frontend folder. 
const PORT = process.env.PORT || 5000;

const userRouter = require('./backend/routes/user.js');

app.use(express.json());
//app.use("/api/user", userRouter);


app.get('/api', (req, res) => {
  res.json({message: "If your seeing this message than everythig is working!"})
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
