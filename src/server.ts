import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});