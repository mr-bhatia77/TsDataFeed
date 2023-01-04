
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://3.216.17.14:8080/tsdata/'
});



export default AxiosInstance