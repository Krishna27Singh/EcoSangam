const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const geminiRoutes = require('./routes/geminiRoutes');
app.use('/api/gemini', geminiRoutes);



const tipsRoute = require("./routes/tipsRoute");
app.use("/api/tips", tipsRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
