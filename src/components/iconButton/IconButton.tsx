import React, { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactElement;
    borderColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, borderColor, ...rest }) => {
    const buttonStyle: React.CSSProperties = {
        backgroundColor: "transparent",
        borderRadius: 100,
        borderWidth: 4,
        outline: "none",
        borderColor: borderColor || "transparent"
    };

    return (
        <button {...rest} style={buttonStyle}>
            {icon}
        </button>
    );
};

export default IconButton;
