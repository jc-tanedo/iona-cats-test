import axios from 'axios';
import appConfig from '../config';

axios.interceptors.request.use(config => {
    if (appConfig.CAT_API_KEY) {
        config.headers = {
            ...(config.headers || {}),
            'x-api-key': appConfig.CAT_API_KEY
        };
    }

    return config;
});
