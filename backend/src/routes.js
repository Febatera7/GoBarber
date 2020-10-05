import { Router } from 'express';
import authMiddleware from './app/middlewares/auth'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.get('/providers', authMiddleware, ProviderController.index);
routes.get('/providers/:providerId/available', authMiddleware, AvailableController.index);

routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.delete('/appointments/:id', authMiddleware, AppointmentController.delete);

routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

routes.get('/schedule', authMiddleware, ScheduleController.index);

routes.post('/sessions', SessionController.store);

export default routes;
