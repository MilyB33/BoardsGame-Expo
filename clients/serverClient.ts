import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

class ServerClient {
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
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };
}

export default new ServerClient();
