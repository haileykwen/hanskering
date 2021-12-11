import { apiClient } from "../Core";
import { API } from "../Url";

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

const get_signout = (data, callbkSuccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNOUT, data).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

export {
    post_signup,
    post_signin,
    get_signout
}