export const API = {
    AUTH_SIGNUP         : "/api/user/auth/signup",
    AUTH_SIGNIN         : "/api/user/auth/signin",
    AUTH_SIGNOUT        : "/api/user/auth/signout",

    PRODUCT_ALL         : "/api/product/view-all",
    PRODUCT_PAGINATION  : "/api/product/pagination",
    PRODUCT_VIEW        : "/api/product/view",

    PROFILE_CART        : "/api/user/profile/cart",
    PROFILE_USER_DATA   : "/api/user/profile",
    PROFILE_PROVINCE    : "/api/user/profile/province",
    PROFILE_CITY        : "/api/user/profile/city",
    PROFILE_ADDRESS     : "/api/user/profile/address",
    PROFILE_PHONE       : "/api/user/profile/phone",

    ORDER_ONGKIR        : "/api/order/ongkir",
    ORDER_CREATE        : "/api/order",
    ORDER_USER          : "/api/order/user",
    ORDER_DETAIL        : "/api/order",
}

export const ROUTE = {
    AUTH_SIGNUP         : "/auth/signup",
    AUTH_SIGNIN         : "/auth/signin",
    
    PRODUCT_DETAIL      : "/product/detail/:slug",
    PROFILE_CART        : "/profile/cart",
    PROFILE_SETTING     : "/profile/setting",
    PROFILE_ADDRESS     : "/profile/address",
    PROFILE_PHONE       : "/profile/phone",
    PROFILE_ORDER       : "/profile/order",

    ORDER_PREPARATION   : "/order/preparation",
    ORDER_DETAIL        : "/order/detail/:slug"
}