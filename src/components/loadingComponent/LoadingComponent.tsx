import React from "react";
import {SpinningCircles} from 'react-loading-icons'
import {theme} from "../../utils/theme";
const LoadingComponent = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0, left: 0,
            zIndex: 9999,
            borderRadius: 25, background: theme.primary300,
            flexDirection: "column",
            padding: "2.5%",
        }}>
            <SpinningCircles fill={theme.primary700} speed={.75}/>
            <p>Loading...</p>
        </div>
    );
};


export default LoadingComponent;