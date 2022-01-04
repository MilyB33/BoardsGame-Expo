import { Client, Options, OptionsWithBody } from '../types/types';

// This client probably is overkill, but I wanted to make it :)
// Probably should be a class
const CustomClient = (URL: string): Client => ({
  BaseURL: URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  headers: {
    post: {},
    get: {},
    delete: {},
    patch: {},
    all: {},
  },

  returnHeaders: function (method: string) {
    return {
      ...this.headers[method],
      ...this.defaultHeaders,
      ...this.headers.all,
    };
  },

  post: async function (
    endpoint: string,
    options: OptionsWithBody = { body: {} }
  ) {
    return await fetch(`${this.BaseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.returnHeaders('post'),
        ...(options.headers || {}),
      },
      body: JSON.stringify(options.body),
    });
  },
  get: async function (endpoint: string, options: Options = {}) {
    return await fetch(`${this.BaseURL}/${endpoint}`, {
      method: 'GET',
      headers: {
        ...this.returnHeaders('get'),
        ...(options.headers || {}),
      },
    });
  },
  delete: async function (endpoint: string, options: Options = {}) {
    return await fetch(`${this.BaseURL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.returnHeaders('delete'),
        ...(options.headers || {}),
      },
    });
  },
  patch: async function (
    endpoint: string,
    options: OptionsWithBody = { body: {} }
  ) {
    return await fetch(`${this.BaseURL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        ...this.returnHeaders('patch'),
        ...(options.headers || {}),
      },
      body: JSON.stringify(options.body),
    });
  },
});

export default CustomClient;
