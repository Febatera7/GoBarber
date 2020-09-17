import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update)

routes.post('/sessions', SessionController.store);

export default routes;
