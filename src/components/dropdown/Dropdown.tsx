import React, {useEffect, useState} from 'react';
import {type} from "node:os";
import './dropDownStyle.css';

type DropDownProps = {
    options: any[],
    value: any,
    showDropDown: boolean;
    toggleDropDown: Function;
    onChange: (event: any) => void
}

const Dropdown: React.FC<DropDownProps> = ({   options,
                                               onChange,
}: DropDownProps): React.JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const handleChange = (e: any) => {
        onChange(e.target.value);
    }
    useEffect(() => {
        setShowDropDown(showDropDown)
    }, [showDropDown]);

    let optionComponents: any[] = [];
    options.forEach((option: string) => optionComponents.push(<option>{option}</option>))

    return (
        <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
            {options.map(
                (value: any, index): React.JSX.Element => {
                    return (
                        <p
                            key={index}
                            onClick={(): void =>{
                                handleChange(value)
                        }}
                        >
                            {value}
                        </p>
                    )
                }
            )
            }
            {/*<select style={{*/}
            {/*    width: 'calc(100% - 0.4rem - 4px)',*/}
            {/*    padding: '1rem',*/}
            {/*    position: 'relative',*/}
            {/*    borderWidth: '2px',*/}
            {/*    borderColor: '#0167f8',*/}
            {/*    borderRadius: '0.375rem'*/}
            {/*}} value={value} onChange={handleChange}>*/}
            {/*    {optionComponents}*/}
            {/*</select>*/}
        </div>
    )
}

export default Dropdown;