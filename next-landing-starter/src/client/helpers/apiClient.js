import qs from 'querystring';
import config from '~/config';
import ApiError from './apiError';

export function buildUrl(path, queryStringObject) {
  let url = `${config.apiUrl}${path}`;
  if (queryStringObject) {
    url += `?${qs.stringify(queryStringObject)}`;
  }
  return url;
}

const getJsonHeaders = () => ({
  Accept: 'application/json',
});

const postJsonHeaders = () => ({
  ...getJsonHeaders(),
  'Content-Type': 'application/json',
});

const throwApiError = (data, { status }) => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

const responseHandler = async (response) => {
  if (response.status >= 500) {
    const text = await response.text();
    return throwApiError({ serverError: text }, response);
  }

  if (response.status >= 400) {
    const isJSON = response.headers.get('Content-Type').includes('application/json');

    if (isJSON) {
      const data = await response.json();
      return throwApiError({ ...data }, response);
    }

    const text = await response.text();
    return throwApiError({ serverError: text }, response);
  }

  return response.json();
};

export async function get(path, queryStringObject) {
  const response = await fetch(buildUrl(path, queryStringObject), {
    headers: getJsonHeaders(),
    credentials: 'include',
  });

  return responseHandler(response);
}

export async function put(path, body, queryStringObject) {
  const response = await fetch(buildUrl(path, queryStringObject), {
    method: 'PUT',
    headers: postJsonHeaders(),
    credentials: 'include',
    body: JSON.stringify(body),
  });

  return responseHandler(response);
}

export async function post(path, body, queryStringObject) {
  const response = await fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return responseHandler(response);
}

export async function file(path, body, queryStringObject) {
  const response = await fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    credentials: 'include',
    body,
  });

  return responseHandler(response);
}
