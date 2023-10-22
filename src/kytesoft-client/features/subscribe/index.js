import { subscribeThunk } from '@/kytesoft-client/store/app/thunks';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const useSubscribe = ({
  onSuccess = () => null,
  onError = () => null,
  messages = {},
} = {}) => {
  const dispatch = useDispatch();

  const subscribeForm = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(get(messages, 'email.email'))
        .required(get(messages, 'email.required')),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(subscribeThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { subscribeForm };
};
