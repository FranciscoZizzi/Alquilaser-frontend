import React from 'react';
import styled, { css } from 'styled-components';

const BaseButton = css`
  color: white;
  border: none;
  width: 100%;
  border-radius: 100px;
  padding: 10px 0px;
  cursor: pointer;
  display: inline-block; 
  text-align: center;
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

interface ImageUploadButtonProps {
    setImage: (url: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ setImage }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setImage(fileUrl);
        }
    };

    return (
        <div>
            <FileInputLabel htmlFor="single-file-upload">Upload Image</FileInputLabel>
            <HiddenInput
                id="single-file-upload"
                type="file"
                onChange={handleChange}
                accept="image/*"
            />
        </div>
    );
};

export default ImageUploadButton;
