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

const MainRouter = () => {
    return (
        <React.Suspense fallback={<span>Mengambil data ...</span>}>
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
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default MainRouter;