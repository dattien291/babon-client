import { get } from 'lodash';
import * as Yup from 'yup';

export const forgetPasswordSchema = (messages = {}) =>
  Yup.object().shape({
    username: Yup.string().required(get(messages, 'username.required')),
  });

export const verifySchema = (messages = {}) =>
  Yup.object().shape({
    code: Yup.string().required(get(messages, 'code.required')),
  });

export const resetPasswordSchema = (messages = {}) =>
  Yup.object().shape({
    password: Yup.string().required(get(messages, 'password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')])
      .required(get(messages, 'confirmPassword.required')),
  });
