import { changePasswordThunk } from '@/kytesoft-client/store/user/thunks';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const changePasswordSchema = (messages = {}) =>
  Yup.object().shape({
    password: Yup.string().required(get(messages, 'password.password')),
    newPassword: Yup.string().required(get(messages, 'newPassword.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')])
      .required(get(messages, 'confirmPassword.required')),
  });

export const useChangePassword = ({
  onSuccess = () => null,
  onError = () => null,
  messages = {},
} = {}) => {
  const dispatch = useDispatch();

  const changePasswordForm = useFormik({
    initialValues: {
      confirmPassword: '',
      newPassword: '',
      password: '',
    },
    validationSchema: changePasswordSchema(messages),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(changePasswordThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { changePasswordForm };
};
