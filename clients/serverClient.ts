interface LoginCredentials {
  username: string;
  password: string;
}

type Header = {
  [key: string]: string;
};

interface Client {
  BaseURL: string;
  post(endpoint: string, body?: any): Promise<any>;
  get(endpoint: string): Promise<any>;
  delete(endpoint: string): Promise<any>;
  defaultHeaders: Header;
  headers: Header;
}

const URL = 'http://192.168.0.12:8080';

class ServerClient {
  private client = ((): Client => ({
    BaseURL: URL,
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    headers: {},
    post: async function (endpoint: string, body?: any) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          ...this.headers,
        },
        body: JSON.stringify(body),
      });
    },
    get: async function (endpoint: string) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
          ...this.headers,
        },
      });
    },
    delete: async function (endpoint: string) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          ...this.defaultHeaders,
          ...this.headers,
        },
      });
    },
  }))();

  setToken = (token: string) => {
    this.client.headers['Authorization'] = `Bearer ${token}`;
  };

  removeToken = () => {
    delete this.client.headers['Authorization'];
  };

  loginUser = async (data: LoginCredentials) => {
    try {
      const response = await this.client.post('login', data);

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          data: json,
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
      const response = await this.client.post('register', data);

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          data: json,
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
        return json.events;
      } else throw new Error(json.message);
    } catch (err) {
      return [];
    }
  };

  signUserForEvent = async (eventId: string, userId: string) => {
    try {
      const response = await this.client.post(
        `events/${userId}/${eventId}/sign`
      );

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          data: json.events,
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
          data: json.events,
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
        return json.events;
      } else throw new Error(json.message);
    } catch (err) {
      return [];
    }
  };

  getUserSignedEvents = async (userId: string) => {
    try {
      const response = await this.client.get(
        `events/${userId}/signed/all`
      );

      const json = await response.json();

      if (response.status === 200) {
        return json.events;
      } else throw new Error(json.message);
    } catch (err) {
      return [];
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
          data: json.event,
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
