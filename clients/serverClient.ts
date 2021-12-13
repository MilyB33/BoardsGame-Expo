import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

class ServerClient {
  client = axios.create({
    baseURL: 'http://192.168.0.12:8080/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  loginUser = async (data: LoginCredentials) => {
    try {
      const jsonData = JSON.stringify(data);

      const response = await fetch('http://192.168.0.12:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });

      const json = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          data: json,
        };
      } else throw new Error(json.message);

      // const response = await this.client.post('/login', jsonData);
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };
}

export default new ServerClient();
