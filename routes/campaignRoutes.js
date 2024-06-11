import { Router } from 'express';
import authMiddleware from '../middleware/authentication.js';
import validateMiddleware from '../middleware/validation.js';
import campaignController from '../controllers/campaignController.js';

const router = Router();
const campController = new campaignController();

router.get('/', campController.getCampaign);

router.post('/', 
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    validateMiddleware.campaign,
    campController.addNewCampaign);

router.delete('/', campController.removeAllCampaign);

export default router;