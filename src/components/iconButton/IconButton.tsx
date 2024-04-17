import React, { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactElement;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
    return (
        <button {...rest} style={{ borderColor: "red"}}>
            {icon}
        </button>
    );
};

export default IconButton;
