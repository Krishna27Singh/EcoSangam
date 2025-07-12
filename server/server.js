const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = 6000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/test', (req, res) => {
  res.json({ msg: 'This route is working fine' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
