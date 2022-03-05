import { fetchWrapper } from '@/_helpers';
import { server } from '../cfg';

const baseUrl = `${server.url}/likes`;

export const likeService = {
  like,
  getAll,
  getById
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function like(params) {
  return fetchWrapper.post(`${baseUrl}`, params);
}
