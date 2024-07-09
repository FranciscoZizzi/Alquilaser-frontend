import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";

const StoreTokenPage = () => {
    const { token } = useParams();

    useEffect(() => {
        console.log(token)
        if (token) {
            // TODO check with backend if token at URL is valid
            localStorage.setItem("token", token);
            localStorage.setItem("isGoogleSession", "true");
            window.location.href = 'http://localhost:3002/'
        } else {
            console.error('No token found in the URL');
        }
    }, [token]);

    return (
        <LoadingComponent/>
    )
}

export default StoreTokenPage;