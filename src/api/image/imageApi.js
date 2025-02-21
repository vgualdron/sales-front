import { http } from '../../helpers/http';

export default {
  addImage: (data) => http({
    url: `${process.env.URL_API}/api/image`,
    method: 'POST',
    data,
  }),
  updateImage: (data) => http({
    url: `${process.env.URL_API}/api/image/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteImage: (id) => http({
    url: `${process.env.URL_API}/api/image/${id}`,
    method: 'DELETE',
  }),
};
