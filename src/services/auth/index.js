import { useNavigate } from "react-router-dom";
import { apiClient, cksClient } from "../Core";
import { API, ROUTE } from "../Url";

const post_signup = (data, callbkSuccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNUP, data).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const post_signin = (data, callbkSuccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNIN, data).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const Get_signout = (data, callbkSuccess, callbkError) => {
    const Navigate = useNavigate();
    cksClient().set('_authToken', null, {
        path: '/',
        sameSite: 'lax'
    });
    Navigate(ROUTE.AUTH_SIGNIN);
}

export {
    post_signup,
    post_signin,
    Get_signout
}