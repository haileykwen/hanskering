import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../services/Core";
import { ROUTE } from "../services/Url";

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: ROUTE.AUTH_SIGNIN, state: { from: props.location } }} /> }
        />
    )
}

export default PrivateRoute