const Joi = require('joi');

exports.createCategoryVal = (data) => {

    const gallerySchema = Joi.object({

        name: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
            'string.empty': `Name cannot be an empty field`,
            'string.min': `Name should have a minimum length of {#limit}`,
            'any.required': `Name is a required field`
            })
    });

    return gallerySchema.validate(data);
};