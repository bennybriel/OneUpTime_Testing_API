const Joi = require('joi');

const employeeSchema  = Joi.object().keys({
    name: Joi.string().min(5).required(),
    gender : Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    department: Joi.string().min(3)
});

exports.employeeSchema;

