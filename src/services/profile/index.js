import { apiClient } from "../Core";
import { API } from "../Url";

const put_cart = (data, callbkSuccess, callbkError) => {
    apiClient(true).put(API.PROFILE_CART, data).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const get_cart = (callbkSuccess, callbkError) => {
    apiClient(true).get(API.PROFILE_CART).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const delete_cart = (params, callbkSuccess, callbkError) => {
    apiClient(true).delete(API.PROFILE_CART, {params}).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

export {
    put_cart,
    get_cart,
    delete_cart
}