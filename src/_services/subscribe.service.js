import config from 'config';
import { noAuthWrapper, history } from '@/_helpers';

const baseUrl = `${config.apiUrl}/subscribe`;

export const subscribeService = {
  saveEmail,
  getAll,
  getById,
  create,
  delete: _delete,
};

function saveEmail(params) {
  return noAuthWrapper.post(`${baseUrl}/saveemail`, params);
}

function getAll() {
  return noAuthWrapper.get(baseUrl);
}

function getById(id) {
  return noAuthWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return noAuthWrapper.post(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}
