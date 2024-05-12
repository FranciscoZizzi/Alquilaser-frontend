import React, {useState} from 'react';

const Dropdown = ({options, onChange, value}: {
    options: any[],
    value: any,
    onChange: (event: any) => void
}) => {

    const handleChange = (e: any) => {
        onChange(e.target.value);
    }

    let optionComponents: any[] = [];
    options.forEach((option: string) => optionComponents.push(<option>{option}</option>))

    return (
        <div>
            <select style={{
                width: 'calc(100% - 0.4rem - 4px)',
                padding: '1rem',
                position: 'relative',
                borderWidth: '2px',
                borderColor: '#0167f8',
                borderRadius: '0.375rem'
            }} value={value} onChange={handleChange}>
                {optionComponents}
            </select>
        </div>
    )
}

export default Dropdown;