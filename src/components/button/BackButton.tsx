import React from 'react';
import {FaArrowLeft} from "react-icons/fa6";

const BackButton = ({onClick}: {onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) => {
    return(
        <div>
            <button onClick={onClick} style={{
                backgroundColor:"transparent",
                borderColor:"transparent",
                cursor:"pointer",
                padding:'0 0 0 0'
            }}>
                <FaArrowLeft size="50" color="white"/>
            </button>
        </div>
    );
}

export default BackButton;