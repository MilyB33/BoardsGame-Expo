import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

const URL = 'http://192.168.0.12:8080';

class ServerClient {
  client = (() => ({
    BaseURL: URL,
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    post: async function (endpoint: string, body: any) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
        },
        body: JSON.stringify(body),
      });
    },
    get: async function (endpoint: string) {
      return await fetch(`${this.BaseURL}/${endpoint}`, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
        },
      });
    },
  }))();

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
      const response = await this.client.get('event/all');

      const json = await response.json();

      if (response.status === 200) {
        return json.events;
      } else throw new Error(json.message);
    } catch (err) {
      return [];
    }
  };
}

export default new ServerClient();
