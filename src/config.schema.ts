//* config.schema.ts

import * as Joi from '@hapi/joi';

export const configValidation = Joi.object({
    PORT: Joi.number().default(3000),
    CURRENT_ENV: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    JWT_SECRET:  Joi.string().required(),
});
    