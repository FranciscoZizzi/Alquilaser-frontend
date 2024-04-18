import React, {ButtonHTMLAttributes} from 'react'
import {ButtonProps} from "../button/Button";

export interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    imageURL: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({imageURL, ...rest}:{imageURL: string}) => {
    return (
        <button {...rest} style={{
            display: 'inline-block',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
        }}>
            <img src={imageURL} style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%'
            }} />
        </button>
    );
};

export default ImageButton