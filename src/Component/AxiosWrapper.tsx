import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import ToastifyWrapper from "./ToastifyWrapper";
import { useSelector } from "react-redux";
import { store } from '../Redux/Store/store';

const api_ip = process.env.REACT_APP_API_IP;
const currentState = store.getState();
const jwtTokenDto:any = currentState.jwtTokenDto;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: api_ip
});

axiosInstance.interceptors.request.use((config:any) => {
    if (jwtTokenDto?.accessToken) {
        config.headers['Authorization'] = `Bearer ${jwtTokenDto.accessToken}`;
    }
     return config;
    }, (error) => {
        return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => handleSuccess(response),
    (error: AxiosError) => handleError(error)
);

/* 성공 했을때 response를 리턴 따라서 resultDto 만 빼서 내보내도록 */
function handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
}

/* 에러 핸들링 처리 */
function handleError(error: AxiosError): Promise<AxiosError> {
    //console.log('Request Failed:', error.config);

    if (error.response) {
        // console.log('Status:', error.response.status);
        //console.log('Data:', error.response.data);
        // console.log('Headers:', error.response.headers);
        ToastifyWrapper.error(`${error.response.status}: ${error.message}`);
    } else {
        // console.log('Error Message:', error.message);
        ToastifyWrapper.error(`에러: ${error.message}`);
    }
    return Promise.reject(error);
}

export const AxiosWrapper = {
    get: (url: string) => axiosInstance.get(url),
    post: (url: string, body?: any) => axiosInstance.post(url, body),
    put: (url: string, body?: any) => axiosInstance.put(url, body),
    delete: (url: string) => axiosInstance.delete(url),
};
export default AxiosWrapper;