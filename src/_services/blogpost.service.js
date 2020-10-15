import config from 'config';
import { noAuthWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/blogposts`;

export const blogpostService = {
  makepost,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function makepost(params) {
  return noAuthWrapper.post(`${baseUrl}/makepost`, params);
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

function update(id, params) {
  return noAuthWrapper.put(`${baseUrl}/${id}`, params)
    .then(blog => {
      return blog;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}
