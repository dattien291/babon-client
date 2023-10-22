import cookies from 'js-cookie';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

const getAccessTokenInfo = () => cookies.get(ACCESS_TOKEN || '');
const getRefreshTokenInfo = () => cookies.get(REFRESH_TOKEN || '');

const setTokens = ({ accessToken, refreshToken }: { accessToken: any; refreshToken: any }) => {
  cookies.set(ACCESS_TOKEN, accessToken.token, {
    expires: new Date(accessToken.expiredAt),
  });

  cookies.set(REFRESH_TOKEN, refreshToken.token);
};

const removeTokens = () => {
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(REFRESH_TOKEN);
};

export const cookieStorage = {
  getAccessTokenInfo,
  getRefreshTokenInfo,
  setTokens,
  removeTokens,
};
