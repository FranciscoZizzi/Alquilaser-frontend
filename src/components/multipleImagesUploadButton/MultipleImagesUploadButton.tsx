import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface MultiImageUploadButtonProps {
    setImages: (urls: string[]) => void;
    buttonText?: string;
    style?: React.CSSProperties;
}

const BaseButton = css`
  color: white;
  border: none;
  border-radius: 100px;
  padding: 15px 0px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  width: 100%;
  background-color: #021452;
  &:hover {
    background-color: #495057;
  }
`;

const FileInputLabel = styled.label`
  ${BaseButton}
`;

const HiddenInput = styled.input`
  display: none;
`;

const MultiImageUploadButton: React.FC<MultiImageUploadButtonProps> = ({ setImages, buttonText = 'Upload Images', style }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(fileUrls);
        }
    };

    return (
        <div style={style}>
            <FileInputLabel htmlFor="multi-file-upload">{buttonText}</FileInputLabel>
            <HiddenInput
                id="multi-file-upload"
                type="file"
                multiple={true}
                onChange={handleChange}
                accept="image/*"
            />
        </div>
    );
};


export default MultiImageUploadButton;
