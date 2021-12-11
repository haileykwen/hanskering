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

export {
    get_productAll
}