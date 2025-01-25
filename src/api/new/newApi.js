import { http } from '../../helpers/http';

export default {
  list: (status) => http({
    url: `${process.env.URL_API}/api/new/list/${status}`,
    method: 'GET',
  }),
  listReds: (data) => http({
    url: `${process.env.URL_API}/api/new/list-reds/${data.city}/${data.user}`,
    method: 'GET',
  }),
  get: (id) => http({
    url: `${process.env.URL_API}/api/new/get/${id}`,
    method: 'GET',
  }),
  save: (data) => http({
    url: `${process.env.URL_API}/api/new/create`,
    method: 'POST',
    data,
  }),
  update: (data) => http({
    url: `${process.env.URL_API}/api/new/update/${data.id}`,
    method: 'PUT',
    data,
  }),
  updateStatus: (data) => http({
    url: `${process.env.URL_API}/api/new/update-status/${data.id}`,
    method: 'PUT',
    data,
  }),
  completeData: (data) => http({
    url: `${process.env.URL_API}/api/new/complete-data/${data.id}`,
    method: 'PUT',
    data,
  }),
  delete: (id) => http({
    url: `${process.env.URL_API}/api/new/delete/${id}`,
    method: 'DELETE',
  }),
  getByPhone: (phone) => http({
    url: `${process.env.URL_API}/api/new/get-by-phone/${phone}`,
    method: 'GET',
  }),
};
