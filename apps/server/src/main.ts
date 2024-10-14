/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet';
import cors from 'cors';

import userRoutes from './routes/userRoutes'
import courseRoutes from './routes/courseRoutes'
import announcementRoutes from './routes/announcementRoutes'
import discussionRoutes from './routes/discussionRouter'
import contentRoutes from './routes/contentRoutes'
import notificationRoutes from './routes/notificationRoutes'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongooseURI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_NAME}`
app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connect(mongooseURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courses', announcementRoutes);
app.use('/api/courses', discussionRoutes);
app.use('/api/courses', contentRoutes);
app.use('/api', notificationRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello, Frontend?" })
})

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
