import { createContactThunk } from '@/kytesoft-client/store/app/thunks';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const contactSchema = (messages = {}) =>
  Yup.object().shape({
    name: Yup.string().required(get(messages, 'name.required')),
    phone: Yup.string().required(get(messages, 'phone.required')),
    email: Yup.string().email().required(get(messages, 'email.required')),
    message: Yup.string().required(get(messages, 'message.required')),
  });

export const useContacts = ({
  onSuccess = () => null,
  onError = () => null,
  messages = {},
} = {}) => {
  const dispatch = useDispatch();

  const contactForm = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema: contactSchema(messages),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(createContactThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { contactForm };
};
