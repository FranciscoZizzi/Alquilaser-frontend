import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

type RouteGuardProps = RouteProps & {
    component: React.ComponentType<any>;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ component: Component, ...rest }) => {

    function hasJWT() {
        return !!localStorage.getItem("token");
    }

    return (
        <Route
            {...rest}
            element={hasJWT() ? <Component {...rest}/> : <Navigate to="/login" />}
        />
    );
};

export default RouteGuard;
