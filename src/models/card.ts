import { model, Schema } from 'mongoose';
import { isLength, isURL } from 'validator';

import { CARD_NAME_MAX_LENGTH, CARD_NAME_MIN_LENGTH } from '../constants';

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    validate: {
      validator: (value: string) =>
        isLength(value, { min: CARD_NAME_MIN_LENGTH, max: CARD_NAME_MAX_LENGTH }),
      message: `Длина поля "Имя" должна быть от ${CARD_NAME_MIN_LENGTH} до ${CARD_NAME_MAX_LENGTH} символов`,
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isURL(value),
      message: 'Некорректный формат ссылки на аватар',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
