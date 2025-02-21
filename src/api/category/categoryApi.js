import { http } from '../../helpers/http';

export default {
  fetchCategories: () => http({
    url: `${process.env.URL_API}/api/category`,
    method: 'GET',
  }),
  addCategory: (data) => http({
    url: `${process.env.URL_API}/api/category`,
    method: 'POST',
    data,
  }),
  updateCategory: (data) => http({
    url: `${process.env.URL_API}/api/category/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteCategory: (id) => http({
    url: `${process.env.URL_API}/api/category/${id}`,
    method: 'DELETE',
  }),
};
