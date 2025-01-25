import { http } from '../../helpers/http';

export default {
  list: (data) => http({
    url: `${process.env.URL_API}/api/report`,
    method: 'GET',
    data,
  }),
  executeReport: (id) => http({
    url: `${process.env.URL_API}/api/report/${id}`,
    method: 'GET',
  }),
};
