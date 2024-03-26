import React, {useState} from 'react';
import {StyledTextField} from "./StyledTextField";

const TextField = ({value, placeholder, supportingText, isError}:{value?: string, placeholder: string, supportingText?: string, isError?: Boolean}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const [actualPlaceholder, setActualPlaceholder] = useState(placeholder);
    const handleFocus = () => {
        setIsFocused(true);
        setActualPlaceholder('')
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsFilled(value !== '');
        setActualPlaceholder(placeholder)
    };

    return (
        <div>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                borderStyle: 'solid',
                width: '100%',
                padding: '1rem',
                position: 'relative',
                borderWidth: '2px',
                height: 56,
                borderColor: isFocused ? '#1D4ED8' : (isError ? 'red' : '#D1D5DB'),
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',


            }}>
                <input
                    value={value}
                    placeholder={actualPlaceholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setIsFilled(e.target.value !== '')}
                    style={{
                        borderColor: 'transparent',
                        backgroundColor: 'white',
                        outline: 'none',
                        width: '100%',
                        fontSize: '16px',
                        margin: 0, // Add margin: 0 to remove default margin
                        padding: '0.5rem', // Adjust padding as needed
                        boxSizing: 'border-box', // Ensure padding and border are included in element's total width and height
                    }}
                />

                <label style={{
                    borderRadius: '0.5rem',
                    position: 'absolute',
                    left: '0.75rem',
                    top: '-0.75rem',
                    backgroundColor: '#F3F4F6',
                    padding: '0.1rem 0.2rem',
                    transition: 'all 0.25s ease',
                    opacity: (isFocused || isFilled) ? '100%' : '0',
                }}>
                    {placeholder}
                </label>
            </div>
            <p style={{
                marginLeft: '1rem',
                color: '#718096',
                opacity: isFocused ? '1' : '0',
            }}>
                {supportingText}
            </p>
        </div>
    )

}

export default TextField