const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const configRoutes = require('./routes/configRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/myqueues', require('./routes/queueRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api', configRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));