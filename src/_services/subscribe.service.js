import config from 'config';
<<<<<<< HEAD
import { noAuthWrapper } from '@/_helpers';
=======
import { fetchWrapper } from '../_helpers';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

const baseUrl = `${config.apiUrl}/subscribers`;

export const subscribeService = {
  getAll,
  getById,
  subscribe,
  delete: _delete
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function subscribe(params) {
<<<<<<< HEAD
  return noAuthWrapper.post(baseUrl, params);
=======
  return fetchWrapper.post(baseUrl, params);
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}