import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

const BaseButton = css`
  color: white;
  border: none;
  width: 100%;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  ${BaseButton};
  background-color: #0167f8;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  ${BaseButton};
  background-color: #021452;

  &:hover {
    background-color: #495057;
  }
`;

const DisabledButton = styled.button`
    ${BaseButton};
    background-color: gray;
    cursor: not-allowed;

    &:hover {
        background-color: dimgrey;
    }
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'disabled';
}

const Button: React.FC<ButtonProps> = ({ variant, ...rest }) => {
    switch (variant) {
        case 'primary':
            return <PrimaryButton {...rest} />;
        case 'secondary':
            return <SecondaryButton {...rest} />;
        case 'disabled':
            return <DisabledButton {...rest} />;
        default:
            return <PrimaryButton {...rest} />;
    }
}

export default Button;
