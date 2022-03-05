import { fetchWrapper } from '@/_helpers';
import { server } from '../cfg';

const baseUrl = `${server.url}/comments`;

export const commentService = {
  getAll,
  getById,
  comment,
  create,
  update,
  delete: _delete
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function comment(id, params) {
  return fetchWrapper.post(`${baseUrl}/${id}/comment`, params);
}

function create(id, params) {
  return fetchWrapper.post(`${baseUrl}/${id}/comment`, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params)
    .then(comment => {
      return comment;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}