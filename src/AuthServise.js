import axios from 'axios';


const API_URL = 'https://localhost:8080/api/refresh/';

class AuthService {

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href='/';
    }

    getUser() {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {


            return axios
                .get(`http://localhost:8080/api/user/get-me`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,

                    }
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    console.log('Failed to get user:', error);
                    throw error;
                });
        }

        return Promise.reject(new Error('Access token not found.'));
    }
    refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');

        // Check if the access token is expired
        if (accessToken) {
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = new Date().getTime();

            if (expirationTime < currentTime) {
                // Access token has expired, refresh it
                return axios
                    .post(`${API_URL}`, { refreshToken })
                    .then((response) => {
                        if (response.data.access) {
                            localStorage.setItem('access_token', response.data.access);
                            return response.data.access;
                        } else {
                            throw new Error('Failed to refresh access token.');
                        }
                    })
                    .catch((error) => {
                        // Handle token refresh failure
                        console.log('Failed to refresh token:', error);
                        this.logout(); // Optionally log out the user or perform any other actions
                        throw error; // Rethrow the error to be caught by the caller
                    });
            }
        }

        // Access token is not expired or not available, return the current access token
        return Promise.resolve(accessToken);
    }
}

export default new AuthService();
