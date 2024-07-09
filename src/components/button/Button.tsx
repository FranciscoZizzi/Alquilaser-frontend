import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

const BaseButton = css`
  display: flex; // Enable flexbox layout
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  color: white;
  border: none;
  width: 100%;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
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

const EmptyButton = styled.button`
  ${BaseButton};
  background-color: transparent;
  color: black;
  border: solid;

  &:hover {
    background-color: darkgray;
    border-color: dimgrey;
    color:white;
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
    variant?: 'primary' | 'secondary' | 'empty' | 'disabled';
}

const Button: React.FC<ButtonProps> = ({ variant, ...rest }) => {
    switch (variant) {
        case 'primary':
            return <PrimaryButton {...rest} />;
        case 'secondary':
            return <SecondaryButton {...rest} />;
        case 'empty':
            return <EmptyButton {...rest} />;
        case 'disabled':
            return <DisabledButton {...rest} />;
        default:
            return <PrimaryButton {...rest} />;
    }
}

export default Button;
