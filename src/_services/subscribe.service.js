import { fetchWrapper } from '@/_helpers';
import { server } from '../cfg';

const baseUrl = `${server.url}/subscribers`;

export const subscribeService = {
  subscribe,
  getAll,
  getById,
  delete: _delete
};

function subscribe(params) {
  return fetchWrapper.post(`${baseUrl}/saveemail`, params);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}