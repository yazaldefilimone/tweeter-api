import { sigInUserControllerFactore } from '@/main/factories/presentation/controllers/user'
import { RouterAdapter } from '@/main/adapters'


import { Router } from 'express';

const userRouter = Router();


userRouter.post('/', RouterAdapter(sigInUserControllerFactore()));




export { userRouter }
