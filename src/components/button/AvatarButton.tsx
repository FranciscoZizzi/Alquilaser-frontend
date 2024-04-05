import React from 'react';
import Avatar from 'react-avatar';

const AvatarButton = ({name, src, onClick}: {name: string, src: string, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) => {
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