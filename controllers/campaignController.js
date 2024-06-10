import { campaignDB } from "../models/campaignModel.js";

export default class campaignController {

    // LÄGG TILL KAMPANJERBJUDANDE
    // URL = api/campaign
    campaign = async (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Campaign found',
            status: 200,
            campaign: req.campaign
        });
    }
}

