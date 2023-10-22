import { GroupInput } from '@components/compound';
import { Button, KaImage } from '@components/primitive';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useLogin } from '@/kytesoft-client/features';
import { useEffect } from 'react';
import { error } from 'console';

const Login = () => {
  const router = useRouter();

  const {
    loginForm: { values, errors, touched, setFieldValue, setFieldTouched, handleSubmit },
  } = useLogin({
    messages: {
      username: {
        required: 'Tài khoản không được để trống',
      },
      password: {
        required: 'Mật khẩu không được để trống',
      },
    },
    onError: () => {
      toast.error('Đăng nhập thất bại');

      return null;
    },
    onSuccess: () => {
      toast.success('Đăng nhập thành công');

      return null;
    },
  });

  useEffect(() => {
    if (errors.username) toast.error(errors?.username);
    if (errors.password) toast.error(errors?.password);
  }, [errors]);

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  return (
    <div className="ks-login">
      <div className="background" />

      <form className="login-form" onSubmit={handleSubmit}>
        <KaImage src="/images/logo-gradient.svg" alt="" className="logo" objectFit="contain" />

        <GroupInput
          type="text"
          className="input"
          placeholder="Username..."
          onChange={handleChange}
          value={values.username}
          name="username"
          error={errors.username}
        />
        <GroupInput
          type="password"
          className="input"
          placeholder="Password..."
          onChange={handleChange}
          value={values.password}
          name="password"
          error={errors.password}
        />

        <Button fullWidth className="button" type="submit" variant="contained">
          Log in
        </Button>

        <Button fullWidth className="button -gray" type="submit" variant="contained">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
