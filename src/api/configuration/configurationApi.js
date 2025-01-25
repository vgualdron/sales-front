import { http } from '../../helpers/http';

export default {
  fetchConfigurations: () => http({
    url: `${process.env.URL_API}/api/configuration`,
    method: 'GET',
  }),
  addConfiguration: (data) => http({
    url: `${process.env.URL_API}/api/configuration`,
    method: 'POST',
    data,
  }),
  updateConfiguration: (data) => http({
    url: `${process.env.URL_API}/api/configuration/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteConfiguration: (id) => http({
    url: `${process.env.URL_API}/api/configuration/${id}`,
    method: 'DELETE',
  }),
};
