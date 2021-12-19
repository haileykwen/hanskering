import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    Outlet
  } from "react-router-dom";
import { getToken } from "../services/Core";
import { ROUTE } from "../services/Url";

const PrivateOutlet = () => {
    const auth = getToken();
    return auth && auth !== 'null' ? <Outlet /> : <Navigate to={ROUTE.AUTH_SIGNIN} />;
}

const PublicOutlet = () => {
    const auth = getToken();
    return !auth || auth === 'null' ? <Outlet /> : <Navigate to='/' />;
}

const Home                  = React.lazy(() => import('../pages/Home'));
const Signin                = React.lazy(() => import('../pages/Signin'));
const Signup                = React.lazy(() => import('../pages/Signup'));
const ProductDetail         = React.lazy(() => import('../pages/ProductDetail'));
const Cart                  = React.lazy(() => import('../pages/Cart'));
const OrderPreparation      = React.lazy(() => import('../pages/OrderPreparation'));
const ProfileSetting        = React.lazy(() => import('../pages/ProfileSetting'));
const ProfileAddress        = React.lazy(() => import('../pages/ProfileAddress'));
const ProfilePhone          = React.lazy(() => import('../pages/ProfilePhone'));
const MyOrder               = React.lazy(() => import('../pages/MyOrder'));
const OrderDetail           = React.lazy(() => import('../pages/OrderDetail'));

const FallbackLoader = () => {
    return (
        <Center h='100vh' color='black'>
            <Spinner />
        </Center>
    )
}

const MainRouter = () => {
    return (
        <React.Suspense fallback={<FallbackLoader />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateOutlet />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route path={ROUTE.AUTH_SIGNIN} element={<PublicOutlet />}>
                        <Route path={ROUTE.AUTH_SIGNIN} element={<Signin />} />
                    </Route>

                    <Route path={ROUTE.AUTH_SIGNUP} element={<PublicOutlet />}>
                        <Route path={ROUTE.AUTH_SIGNUP} element={<Signup />} />
                    </Route>

                    <Route path={ROUTE.PRODUCT_DETAIL} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PRODUCT_DETAIL} element={<ProductDetail />} />
                    </Route>

                    <Route path={ROUTE.PROFILE_CART} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PROFILE_CART} element={<Cart />} />
                    </Route>

                    <Route path={ROUTE.ORDER_PREPARATION} element={<PrivateOutlet />}>
                        <Route path={ROUTE.ORDER_PREPARATION} element={<OrderPreparation />} />
                    </Route>

                    <Route path={ROUTE.PROFILE_SETTING} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PROFILE_SETTING} element={<ProfileSetting />} />
                    </Route>

                    <Route path={ROUTE.PROFILE_ADDRESS} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PROFILE_ADDRESS} element={<ProfileAddress />} />
                    </Route>

                    <Route path={ROUTE.PROFILE_PHONE} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PROFILE_PHONE} element={<ProfilePhone />} />
                    </Route>

                    <Route path={ROUTE.PROFILE_ORDER} element={<PrivateOutlet />}>
                        <Route path={ROUTE.PROFILE_ORDER} element={<MyOrder />} />
                    </Route>

                    <Route path={ROUTE.ORDER_DETAIL} element={<PrivateOutlet />}>
                        <Route path={ROUTE.ORDER_DETAIL} element={<OrderDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default MainRouter;