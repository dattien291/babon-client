import { selectUserInfo } from '@/kytesoft-client/store/app/selectors';
import { getMeThunk } from '@/kytesoft-client/store/app/thunks';
import { updateUserInfoThunk } from '@/kytesoft-client/store/user/thunks';
import { useFormik } from 'formik';
import { get, isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const useUser = ({ messages = {} } = {}) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);

  const userForm = useFormik({
    initialValues: {
      avatar: '',
      background: '',
      birthday: '',
      firstName: '',
      gender: 'other',
      lastName: '',
    },
    validationSchema: Yup.object().shape({
      avatar: Yup.string(),
      background: Yup.string(),
      birthday: Yup.string().required(get(messages, 'birthday.required')),
      firstName: Yup.string().required(get(messages, 'firstName.required')),
      lastName: Yup.string().required(get(messages, 'lastName.required')),
      gender: Yup.string()
        .required(get(messages, 'gender.required'))
        .oneOf(['male', 'female', 'other']),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(updateUserInfoThunk(values));
        await dispatch(getMeThunk());
      } catch (error) {}
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (isEmpty(user)) return;
    userForm.setValues(user);
  }, [user, userForm]);

  return {
    user,
    userForm,
  };
};
