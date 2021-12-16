import axios from 'axios';
import Cookies from 'universal-cookie/es6';

const apiClient = (withBearer = false) => {
    const _url = process.env.REACT_APP_API_BASE_URL;
    const _tkn = cksClient().get('_authToken')
    const options = {
        baseURL: _url,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 50000,
    }

    if (withBearer) {
        options.headers = {
            ...options.headers,
            'Authorization': `${_tkn}`,
        }
    }

    const client = axios.create(options)
    client.interceptors.request.use(
        requestConfig => requestConfig,
        requestError => {
            return requestError;
        },
    )

    client.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return error;
        }
    )

    return client
}

const cksClient = () => {
    const cksApp = new Cookies();
    return cksApp;
}

const getToken = () => {
    return cksClient().get('_authToken') || null;
}

export {
    apiClient,
    cksClient,
    getToken
}