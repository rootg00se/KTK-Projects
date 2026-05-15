import axios from "axios";

export const $api = axios.create({
    withCredentials: true,
});

$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            return Promise.resolve({ data: null });
        }
        return Promise.reject(error);
    },
);
