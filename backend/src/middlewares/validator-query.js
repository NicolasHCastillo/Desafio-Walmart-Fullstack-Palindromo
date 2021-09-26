import { param, query, validationResult } from 'express-validator';

export const identifierValidationRules = () => {
    return [
        param('id')
            .isInt({min: 1})
    ];
}

export const searchValidationRules = () => {
  return [
    query('search')
        .isString()
        .isLength({min: 4})
        .optional()
    ,
    query('limit')
        .isInt({min: 1})
        .optional()
    ,
    query('page')
        .isInt({min: 1})
        .optional()
  ];
}
  
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}