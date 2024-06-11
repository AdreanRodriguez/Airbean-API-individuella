import { campaignDB } from "../models/campaignModel.js";

export default class campaignController {

    // HÄMTA KAMPANJERBJUDANDE
    // URL = api/campaign
    getCampaign = async (req, res, next) => {
        const campaignData = await campaignDB.find()
        const error = new Error()

        if (!campaignData || campaignData.length <= 0) {
            error.message = 'No campaign found'
            error.status = 404
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Campaign found',
            status: 200,
            campaignData: campaignData
        });
    }

    addNewCampaign = async (req, res) => {
        const newCampaign = req.body;

        await campaignDB.insert(newCampaign);

        res.status(200).json({
            success: true,
            message: 'Campaign created',
            status: 200,
            newCampaign: newCampaign
        });
    }

    removeAllCampaign = async (req, res, next) => {
        const removeAll = await campaignDB.removeMany({}, { multi: true })

        if (!removeAll) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'No campaign found'
            });
        } else {
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Campaign successfully removed'
            });
        }
    }
}
