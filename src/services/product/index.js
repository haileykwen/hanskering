import { apiClient } from "../Core";
import { API } from "../Url";

const get_productAll = (callbkSuccess, callbkError) => {
    apiClient(true).get(API.PRODUCT_ALL).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const get_productWithPagination = (params, callbkSuccess, callbkError) => {
    apiClient(true).get(API.PRODUCT_PAGINATION, {params}).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

const get_product = (params, callbkSuccess, callbkError) => {
    apiClient(true).get(API.PRODUCT_VIEW, {params}).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

export {
    get_productAll,
    get_productWithPagination,
    get_product
}