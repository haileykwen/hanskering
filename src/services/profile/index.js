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

const get_userData = (callbkSuccess, callbkError) => {
    apiClient(true).get(API.PROFILE_USER_DATA).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const get_province = (callbkSuccess, callbkError) => {
    apiClient().get(API.PROFILE_PROVINCE).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const get_city = (params, callbkSuccess, callbkError) => {
    apiClient().get(API.PROFILE_CITY, {params}).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const put_address = (params, callbkSuccess, callbkError) => {
    apiClient(true).put(API.PROFILE_ADDRESS, params).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const put_telepon = (params, callbkSuccess, callbkError) => {
    apiClient(true).put(API.PROFILE_PHONE, params).then(resp => {
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
    delete_cart,
    get_userData,
    get_province,
    get_city,
    put_address,
    put_telepon
}