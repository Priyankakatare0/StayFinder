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

module.exports.bookingSchema = Joi.object({
    check_in: Joi.date().required(),
    check_out: Joi.date().required(),
    no_of_guest: Joi.number().required(),
    room_type: Joi.string().required(),
    listing_id: JoiObjectId().required(),
    user_id: JoiObjectId().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_no: Joi.string().required(),
    email: Joi.string().email().required(),
});

module.exports.ratingValidationSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    listing_id: Joi.string().required(),
    user_id: Joi.string().required(),
    comment: Joi.string().allow('').optional()
});