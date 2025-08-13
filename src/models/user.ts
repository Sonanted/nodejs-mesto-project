import { Model, model, Schema, Document } from 'mongoose';
import { isEmail, isLength, isURL } from 'validator';
import bcrypt from 'bcrypt';

import UnauthorizedError from '../errors/UnauthorizedError';
import {
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_ABOUT_MIN_LENGTH,
  USER_ABOUT_MAX_LENGTH,
} from '../constants';

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    min: USER_NAME_MIN_LENGTH,
    max: USER_NAME_MAX_LENGTH,
    default: 'Жак-Ив Кусто',
    validate: {
      validator: (value: string) =>
        isLength(value, { min: USER_NAME_MIN_LENGTH, max: USER_NAME_MAX_LENGTH }),
      message: `Длина поля "Имя" должна быть от ${USER_NAME_MIN_LENGTH} до ${USER_NAME_MAX_LENGTH} символов`,
    },
  },
  about: {
    type: String,
    min: USER_ABOUT_MIN_LENGTH,
    max: USER_ABOUT_MAX_LENGTH,
    default: 'Исследователь',
    validate: {
      validator: (value: string) =>
        isLength(value, { min: USER_ABOUT_MIN_LENGTH, max: USER_ABOUT_MAX_LENGTH }),
      message: `Длина поля "О себе" должна быть от ${USER_ABOUT_MIN_LENGTH} до ${USER_ABOUT_MAX_LENGTH} символов`,
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => isURL(value),
      message: 'Некорректный формат ссылки на аватар',
    },
  },
});

export default model<IUser>('user', userSchema);
