import {get} from '@sa/utils/axios';

export const getStaff = () => {
  get('/staff').then(res => {
    return res.data;
  });
};

export const addToStaff = (data) => {
  post('/staff', data).then(res => {
    return res.data;
  });
};