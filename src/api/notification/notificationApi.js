import { httpPush } from '../../helpers/httpPush';

export default {
  send: (data) => httpPush({
    headers: {
      Authorization: 'Basic NGUyMTFjNDktMTg2Ny00Mzc0LThkMGMtMDY2N2Y4MmFjMGFk',
      'Content-Type': 'application/json',
    },
    url: 'https://onesignal.com/api/v1/notifications',
    method: 'POST',
    data,
  }),
};
