import config from 'config';
import { noAuthWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/subscribers`;

export const subscribeService = {
  getAll,
  getById,
  subscribe,
  delete: _delete
};

function getAll() {
  return noAuthWrapper.get(baseUrl);
}

function getById(id) {
  return noAuthWrapper.get(`${baseUrl}/${id}`);
}

function subscribe(params) {
  return noAuthWrapper.post(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}