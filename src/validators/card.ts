import { celebrate, Joi, Segments } from 'celebrate';
import { CARD_NAME_MAX_LENGTH, CARD_NAME_MIN_LENGTH } from '../constants';

export const cardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(CARD_NAME_MIN_LENGTH).max(CARD_NAME_MAX_LENGTH).required(),
    link: Joi.string().uri().required(),
  }),
});

export const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
