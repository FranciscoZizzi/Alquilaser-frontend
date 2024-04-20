import React, { useState } from 'react';

interface ExtendedTextFieldProps {
    value: string;
    placeholder: string;
    supportingText?: string;
    isError?: Boolean;
    onChange: (e: string) => void;
    height?: string;
}

const ExtendedTextField: React.FC<ExtendedTextFieldProps> = ({
                                                                 value,
                                                                 placeholder,
                                                                 supportingText,
                                                                 isError,
                                                                 onChange,
                                                                 height
                                                             }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                borderStyle: 'solid',
                width: 'calc(100% - 0.4rem - 4px)',
                padding: '0.2rem',
                position: 'relative',
                borderWidth: '2px',
                height: height || 'auto',  // Set a default height or use the height prop
                borderColor: isFocused ? '#1D4ED8' : (isError ? 'red' : '#D1D5DB'),
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'flex-start' // Changed from center to flex-start to align text at the top
            }}>
                <textarea
                    value={value}
                    placeholder={isFocused ? '' : placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        borderColor: 'transparent',
                        backgroundColor: 'white',
                        outline: 'none',
                        width: '100%',  // Full width to fill container
                        fontSize: '16px',
                        margin: 0,
                        padding: '0.5rem',
                        boxSizing: 'border-box',
                        height: height || '100px',  // Default height or use the height prop
                        resize: 'none' // Prevent resizing the textarea
                    }}
                />
            </div>
            <p style={{
                marginLeft: '1rem',
                marginBottom: '4px',
                marginTop: '2px',
                color: 'black',
                opacity: isFocused || value ? '1' : '0',
            }}>
                {supportingText}
            </p>
        </div>
    );
};

export default ExtendedTextField;
