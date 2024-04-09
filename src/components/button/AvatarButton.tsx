import React from 'react';
import Avatar from 'react-avatar';
import {useNavigate} from "react-router-dom";

const AvatarButton = ({name, src}: {name: string, src: string}) => {

    let navigate = useNavigate();
    const onClick = () => {
        let path = '/profile';
        navigate(path);
    }

    return(
        <div>
            <button onClick={onClick} style={{
                backgroundColor:"transparent",
                borderColor:"transparent",
                cursor:"pointer"
            }}>
                <Avatar name={name} src={src} round={true} size={"70"}/>
            </button>
        </div>
    );
}

export default AvatarButton;