import config from 'config';
import { noAuthWrapper, history } from '@/_helpers';

const baseUrl = `${config.apiUrl}/news`;

export const newsService = {
  saveNews,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function saveNews(params) {
  return noAuthWrapper.post(`${baseUrl}/savenews`, params);
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
    .then(article => {
      return article;
    });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return noAuthWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
      return x;
    });
}
