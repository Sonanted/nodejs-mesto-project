import { celebrate, Joi, Segments } from 'celebrate';

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

export const userIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

export const userValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(300).optional(),
    avatar: Joi.string().uri().optional(),
  }),
});

export const patchUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(300).optional(),
  }),
});

export const avatarValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});
