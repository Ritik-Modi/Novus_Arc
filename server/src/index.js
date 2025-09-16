import express from 'express';
import doten from 'dotenv';
import cors from 'cors';
import uploadRoutes from './routes/upload.route.js';
import connectDB from './config/database.config.js';

doten.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin : true , credentials : true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('✅ Server is running...');
});

app.listen(PORT,() =>{
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})