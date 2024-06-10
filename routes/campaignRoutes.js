import { Router } from 'express';
import authMiddleware from '../middleware/authentication.js';
import validateMiddleware from '../middleware/validation.js';
import campaignController from '../controllers/campaignController.js';

const campController = new campaignController();

const router = Router();

router.post('/', 
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    validateMiddleware.products.campaign,
    campController.campaign);

export default router;