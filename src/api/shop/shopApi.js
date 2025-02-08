import { http } from '../../helpers/http';

export default {
  fetchShops: () => http({
    url: `${process.env.URL_API}/api/shop`,
    method: 'GET',
  }),
};
