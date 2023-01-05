
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://analytics.crohnscolitisfoundation.org/tsdata'
});



export default AxiosInstance