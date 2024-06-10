import nedb from 'nedb-promises';
import Joi from 'joi';

export const productSchema = Joi.object({
    desc: Joi.string().required(),
    title: Joi.string().max(30).required(),
    price: Joi.number().positive().required(),
    estimatedTimeInMinutes: Joi.number().positive().required(),
});

export const productDb = nedb.create({
    filename: 'config/products.db',
    autoload: true
});