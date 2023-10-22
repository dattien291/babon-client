import { get } from 'lodash';
import * as Yup from 'yup';

export const loginSchema = (messages = {}) =>
  Yup.object().shape({
    username: Yup.string().required(get(messages, 'username.required')),
    password: Yup.string().required(get(messages, 'password.required')),
  });

export const initialValues = {
  username: '',
  password: '',
};
