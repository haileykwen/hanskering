import { apiClient } from "../Core";
import { API } from "../Url";

const get_ongkir = (params, callbkSuccess, callbkError) => {
    apiClient(true).get(API.ORDER_ONGKIR, {params}).then(resp => {
        if (resp && resp.status === 200) {
            callbkSuccess && callbkSuccess(resp);
        } else {
            callbkError && callbkError(resp);
        }
    });
}

export {
    get_ongkir
}