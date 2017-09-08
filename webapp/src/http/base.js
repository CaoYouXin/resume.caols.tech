import { getToken } from '../utils';

const logError = (ret) => {
  if (ret.code === 50001) {
    return Promise.reject({ toLogin: true });
  }

  if (ret.code !== 20000) {
    return Promise.reject(ret.body);
  }

  return Promise.resolve(ret.body);
}

const getHeaders = (headers) => {
  return new Headers(Object.assign({
    "infinitely-serve-token": getToken()
  }, headers));
}

const get = (url, headers, exceptions) => {
  var myInit = {
    method: 'GET',
    headers: getHeaders(headers),
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(function (response) {
    return response.json().then(exceptions || logError);
  });
}

const post = (url, params, headers, exceptions) => {
  var myInit = {
    method: 'POST',
    headers: getHeaders(Object.assign({
      "Content-Type": "application/json"
    }, headers)),
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(params)
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(function (response) {
    return response.json().then(exceptions || logError);
  });
}

export { get, post };