import { apiClient } from "../Core";
import { API } from "../Url";

const post_signup = (data, callbkSucccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNUP, data).then(resp => {
        if (resp.ok && resp.status === 200) {
            callbkSucccess && callbkSucccess(resp)
        } else {
            console.log(`Post login user failed: ${resp.problem}`)
            callbkError && callbkError(resp)
        }
    })
}

const post_signin = (data, callbkSucccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNIN, data).then(resp => {
        if (resp.ok && resp.status === 200) {
            callbkSucccess && callbkSucccess(resp)
        } else {
            console.log(`Post login user failed: ${resp.problem}`)
            callbkError && callbkError(resp)
        }
    })
}

const get_signout = (data, callbkSucccess, callbkError) => {
    apiClient().post(API.AUTH_SIGNOUT, data).then(resp => {
        if (resp.ok && resp.status === 200) {
            callbkSucccess && callbkSucccess(resp)
        } else {
            console.log(`Post login user failed: ${resp.problem}`)
            callbkError && callbkError(resp)
        }
    })
}

export {
    post_signup,
    post_signin,
    get_signout
}