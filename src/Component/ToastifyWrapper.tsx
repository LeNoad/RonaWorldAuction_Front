import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toastify 인스턴스 생성
const toastifyInstance = toast;
/* 닫히는 시간 1초 설정 */
const autoClose = 1000;
/* ToastOptions 설정 */
const commonOptions:ToastOptions = {
    position: 'top-center',
    autoClose: autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: false,
    theme: 'light',
};

// Wrapper 함수 생성
export const ToastifyWrapper = {
    info: (message: string) => {
        toastifyInstance.info(message, commonOptions);
    },
    error: (message: string) => {
        toastifyInstance.error(message, commonOptions);
    }
};
export default ToastifyWrapper;