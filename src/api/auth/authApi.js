import { http } from '../../helpers/http';

export default {
  session: () => http({
    url: `${process.env.URL_API}/api/session/status`,
    method: 'GET',
  }),
  signin: (data) => http({
    url: `${process.env.URL_API}/api/auth/login`,
    method: 'POST',
    data,
  }),
  signout: (data) => http({
    url: `${process.env.URL_API}/api/auth/logout`,
    method: 'POST',
    data,
  }),
};
