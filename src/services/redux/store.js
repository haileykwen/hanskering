import { createStore } from "redux";

const initialState = {
    userData: null,
    orderData: null
}

const reducer = (state = initialState, action) => {
    if (action.type === 'UPDATE_USER_DATA') {
        return {
            ...state,
            userData: action.payload
        }
    }

    if (action.type === 'UPDATE_ORDER_DATA') {
        return {
            ...state,
            orderData: action.payload
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;