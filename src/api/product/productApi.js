import { http } from '../../helpers/http';

export default {
  fetchProducts: () => http({
    url: `${process.env.URL_API}/api/product`,
    method: 'GET',
  }),
  addProduct: (data) => http({
    url: `${process.env.URL_API}/api/product`,
    method: 'POST',
    data,
  }),
  updateProduct: (data) => http({
    url: `${process.env.URL_API}/api/product/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteProduct: (id) => http({
    url: `${process.env.URL_API}/api/product/${id}`,
    method: 'DELETE',
  }),
};
