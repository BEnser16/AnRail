const Joi = require("joi");
const joi = require("joi");

//  用 npm 的 Joi套件驗證資料格式,前端送的資料先放進來驗證,再送資料庫

//  Register Validation
const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(50).required(),
        email: joi.string().min(6).max(50).required().email(),
        password: joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
};

//  login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: joi.string().min(6).max(50).required().email(),
        password: joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
};

//  course data validation
const courseValidation = (data) => {
    const schema = joi.object({
        title:joi.string().min(6).max(50).required(),
        description:joi.string().min(6).max(50).required(),
        price:joi.number().min(10).max(9999).required(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;