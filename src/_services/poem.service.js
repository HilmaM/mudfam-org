import config from 'config';
import { noAuthWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}/poems`;

export const poemService = {
  getAll,
  getById,
  upload,
  create,
  update,
  delete: _delete
};

function upload(params) {
  return noAuthWrapper.post(`${baseUrl}/upload`, params);
}

function getAll() { 
  return noAuthWrapper.get(baseUrl);
}

function getById(id) {
  return noAuthWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return noAuthWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
  return noAuthWrapper.put(`${baseUrl}/${id}`, params)
    .then(poem => {
      return poem;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}