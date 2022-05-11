import { routes } from '@/main/routes';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export { app };
