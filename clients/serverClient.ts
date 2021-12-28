import {
  EventPayload,
  Client,
  LoginCredentials,
  Options,
  OptionsWithBody,
} from '../types/types';

const URL = 'http://192.168.0.12:3000';

class ServerClient {
  private client = ((): Client => ({
    BaseURL: URL,
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    headers: {
      post: {},
      get: {},
      delete: {},
      patch: {},
      all: {
        ...this.client.defaultHeaders,
      },
    },

    returnHeaders: function (method: string) {
      return {
        ...this.headers[method],
        ...this.defaultHeaders,
      };
    },

    post: async function (
      endpoint: string,
      options: OptionsWithBody = { body: null }
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
      options: OptionsWithBody = { body: null }
    ) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          ...this.headers.patch,
          ...this.headers.all,
          ...(options.headers || {}),
        },
        body: JSON.stringify(options.body),
      });
    },
  }))();

  setToken = (token: string) => {
    this.client.headers.all['Authorization'] = `Bearer ${token}`;
  };

  removeToken = () => {
    delete this.client.headers.all['Authorization'];
  };

  setHeader = (method: string, header: string, value: string) => {
    this.client.headers[method][header] = value;
  };

  removeHeader = (method: string, header: string) => {
    delete this.client.headers[method][header];
  };

  loginUser = async (data: LoginCredentials) => {
    try {
      const response = await this.client.post('login', {
        body: data,
      });

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  registerUser = async (data: LoginCredentials) => {
    try {
      const response = await this.client.post('register', {
        body: data,
      });

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  getAllEvents = async () => {
    try {
      const response = await this.client.get('events/all');

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  signUserForEvent = async (eventId: string, userId: string) => {
    try {
      const response = await this.client.post(
        `events/${userId}/${eventId}/sign`,
        { body: null }
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  signOutUserFromEvent = async (eventId: string, userId: string) => {
    try {
      const response = await this.client.post(
        `events/${userId}/${eventId}/signOut`
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  getUserEvents = async (userId: string) => {
    try {
      const response = await this.client.get(`events/${userId}/all`);

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  getUserSignedEvents = async (userId: string) => {
    try {
      const response = await this.client.get(
        `events/${userId}/signed/all`
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  deleteUserEvent = async (eventId: string, userId: string) => {
    try {
      const response = await this.client.delete(
        `events/${userId}/${eventId}`
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  addEvent = async (event: EventPayload, userId: string) => {
    try {
      const response = await this.client.post(`events/${userId}`, {
        body: { event },
      });

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  editEvent = async (
    event: EventPayload,
    userId: string,
    eventId: string
  ) => {
    try {
      const response = await this.client.patch(
        `events/${userId}/${eventId}`,
        {
          body: { event },
        }
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          result: json.result,
        };
      } else throw new Error(json.message);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };
}

export default new ServerClient();
