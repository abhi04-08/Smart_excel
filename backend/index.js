const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: "https://smart-excel-oa62.vercel.app/",
  credentials: true
}));
app.use(express.json());
app.use('/api/upload', uploadRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/insights', require('./routes/insights'));

mongoose.connect(process.env.MONGO_URI, {}).then(() =>console.log("MongoDB Connected"))
  .catch(err =>console.log(err));

app.get('/', (req,res) => {
    res.send('API is working');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
