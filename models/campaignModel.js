import nedb from 'nedb-promises';
import Joi from 'joi';

const campaignSchema = Joi.object({
    prod1: Joi.string().max(16).required(),
    prod2: Joi.string().max(16).required(),
    price: Joi.number().positive().required(),
});

export default campaignSchema;

export const campaignDB = nedb.create({
    filename: 'config/campaign.db',
    autoload: true
});