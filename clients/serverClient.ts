import { EventPayload, LoginCredentials } from '../types/types';
import CustomClient from './CustomClient';

class ClientBase {
  private BaseURL = 'https://boards-game-server.herokuapp.com';
  private LocalURL = 'http://192.168.0.12:3000';
  client = CustomClient(this.LocalURL);

  setToken = (token: string) => {
    this.client.headers.all['Authorization'] = `Bearer ${token}`;
  };

  removeToken = () => {
    delete this.client.headers.all['Authorization'];
  };

  setHeader = (method: string, header: string, value: string) => {
    this.client.headers[method.toLowerCase()][header] = value;
  };

  removeHeader = (method: string, header: string) => {
    delete this.client.headers[method.toLowerCase()][header];
  };
}

class ServerClient extends ClientBase {
  // LOGIN / REGISTER
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

  // ================================

  // EVENTS

  // ================================

  // Getting events

  getAllEvents = async (offset?: number, limit?: number) => {
    try {
      const response = await this.client.get(
        `events/all?offset=${offset}&limit=${limit}`
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

  // ================================

  // Event actions

  signUserForEvent = async (eventId: string, userId: string) => {
    try {
      const response = await this.client.post(
        `events/${userId}/${eventId}/sign`
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

  // ================================

  // USERS

  deleteAccount = async (userId: string) => {
    try {
      const response = await this.client.delete(`users/${userId}`);

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

  updatePassword = async (
    userId: string,
    data: {
      oldPassword: string;
      newPassword: string;
    }
  ) => {
    try {
      const response = await this.client.patch(
        `users/${userId}/password`,
        {
          body: { data },
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
