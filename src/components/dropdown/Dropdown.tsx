import React, {useEffect, useState} from 'react';
import {type} from "node:os";
import './dropDownStyle.css';

type DropDownProps = {
    options: any[],
    showDropDown: boolean;
    toggleDropDown: Function;
    onChange: (event: any) => void
}

const Dropdown: React.FC<DropDownProps> = ({   options,
                                               onChange,
}: DropDownProps): React.JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    useEffect(() => {
        setShowDropDown(showDropDown)
    }, [showDropDown]);

    let optionComponents: any[] = [];
    options.forEach((option: string) => optionComponents.push(<option>{option}</option>))

    const onClickHandler = (value:any) =>{
        onChange(value)
    }
    return (
        <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
            {options.map(
                (value: any, index): React.JSX.Element => {
                    return (
                        <p
                            key={index}
                            onClick={(): void =>{
                                onClickHandler(value)
                        }}
                        >
                            {value}
                        </p>
                    )
                }
            )}
        </div>
    )
}

export default Dropdown;