export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
<<<<<<< HEAD
}

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url)
=======
};

function get(url) {
  const requestOptions = {
      method: 'GET'
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
<<<<<<< HEAD
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body)
=======
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
<<<<<<< HEAD
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body)
=======
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  };
  return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
<<<<<<< HEAD
    method: 'DELETE',
    headers: authHeader(url)
=======
      method: 'DELETE'
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

<<<<<<< HEAD
function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = accountService.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(config.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    
    if (!response.ok) {
      if ([401, 403].includes(response.status) && accountService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        accountService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
=======
function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  });
}