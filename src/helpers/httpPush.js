import axios from 'axios';

export const httpPush = ({
  headers,
  url,
  method,
  data,
}) => {
  axios({
    url,
    method,
    data,
    headers,
  });
};

export default {};
