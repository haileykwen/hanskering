import axios from 'axios';

const apiClient = () => {
    const _url = process.env.REACT_APP_API_BASE_URL
    const options = {
        baseURL: _url,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 50000,
    }

    const client = axios.create(options)
    client.interceptors.request.use(
        requestConfig => requestConfig,
        requestError => {
            return Promise.reject(requestError)
        },
    )

    client.interceptors.response.use(
        response => Promise.resolve(response),
        error => {
            if (error.response) {
                const { status } = error.response

                if (status === 403) {
                    console.log('Global api check - Forbidden Access')
                }
            }

            return Promise.reject(error)
        }
    )

    return client
}

export {
    apiClient
}