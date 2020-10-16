import config from 'config';
import { noAuthWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/comments`;

export const commentService = {
  getAll,
  getById,
  comment,
  create,
  update,
  delete: _delete
};

function getAll() {
  return noAuthWrapper.get(baseUrl);
}

function getById(id) {
  return noAuthWrapper.get(`${baseUrl}/${id}`);
}

function comment(params) {
  return noAuthWrapper.post(`${baseUrl}/comment`, params);
}

function create(params) {
  return noAuthWrapper.post(baseUrl, params);
}

function update(id, params) {
  return noAuthWrapper.put(`${baseUrl}/${id}`, params)
    .then(comment => {
      return comment;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}