import { get } from 'lodash';
import * as Yup from 'yup';

export const registerSchema = (messages = {}) =>
  Yup.object().shape({
    firstName: Yup.string().required(get(messages, 'firstName.required')),
    lastName: Yup.string().required(get(messages, 'lastName.required')),
    email: Yup.string().required(get(messages, 'email.required')),
    username: Yup.string().required(get(messages, 'username.required')),
    password: Yup.string().required(get(messages, 'password.required')),
  });

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

export const verifySchema = (messages = {}) =>
  Yup.object().shape({
    code: Yup.string().required(get(messages, 'code.required')),
  });
