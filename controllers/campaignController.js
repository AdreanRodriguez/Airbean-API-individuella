import { campaignDB } from "../models/campaignModel.js";

export default class campaignController {

    // HÄMTA KAMPANJERBJUDANDE
    // URL = api/campaign
    getCampaign = async (req, res, next) => {
        const campaignData = await campaignDB.find()
        const error = new Error()

        if(!campaignData || campaignData.length <= 0) {
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

    // Forsättning följer, se till att få fram id som är 1FBllZz7CpOGGmnN ifrån db
    addNewCampaign = async (req, res) => {
        const newCampaign = req.body
        const campaignId = campaignDB.find({ _id: id})
        console.log(`HÄR ÄR ID`, campaignId);

        newCampaign.findOne({ _id: campaignId})
        // Skriv färdigt här för att kolla så att man inte lägger till samma saker.
        if(newCampaign._id === _id) {

        }

        console.log(`HÄR ÄR NYA: `, newCampaign);
        await campaignDB.insert(newCampaign)

    }
}

