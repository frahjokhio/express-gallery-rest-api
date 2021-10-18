const Joi = require('joi');

exports.createPhotoVal = (data) => {

    const gallerySchema = Joi.object({

        title: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
            'string.empty': `Title cannot be an empty field`,
            'string.min': `Title should have a minimum length of {#limit}`,
            'any.required': `Title is a required field`
            }),
        description : Joi.string()
        .min(3)
        .max(30)
        .required(),
        category : Joi.string().required(),
        image: Joi.string().required()

    });

    return gallerySchema.validate(data);
};