import { userRouter } from '@/main/routes'



import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(helmet())
app.use(cors());


app.use(userRouter);

export { app } 
