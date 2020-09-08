const joi = require("joi");
module.exports = {
  signupValidateBody: schema => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  signupSchemas: {
    authSchema: joi.object().keys({
      email: joi
        .string()
        .email()
        .required(),
      password: joi.string().required(),
      companyname: joi.string().required(),
      userid: joi.string().required(),
      userType: joi.string()
    })
  },
}