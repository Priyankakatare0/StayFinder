const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi); 

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$'))
        .required()
});


module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().uri().required(),
    description: Joi.string().required(),
    availability: Joi.array().items(
        Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
        })
    ).required(),
    host: JoiObjectId().required()
});