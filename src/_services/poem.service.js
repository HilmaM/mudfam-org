import { fetchWrapper } from '../_helpers';
import { server } from '../cfg';

const baseUrl = `${server.url}/poems`;
const uploadImgUrl = `${server.url}`;

export const poemService = {
  getAll,
  getById,
  upload,
  create,
  update,
  imgUrl,
  delete: _delete
};

function upload(params) {
  return fetchWrapper.post(`${baseUrl}/upload`, params);
}

function getAll() { 
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params)
    .then(poem => {
      return poem;
    });
}

function imgUrl() {
  return fetchWrapper.get(`${uploadImgUrl}`);
};

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}