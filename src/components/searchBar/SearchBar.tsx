import React, {useState} from "react";
import { SearchIcon } from "../icons/SearchIcon";

const SearchBar = ({value, onChange}: {
    value: string,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '1.5rem',
            borderWidth: '1px',
            borderColor: 'black',
            width: '100%',
            height: '3.5rem',
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0,
            alignSelf: 'stretch',
            backgroundColor: '#f3f4f6',
            paddingRight: '0.5rem'
        }}>
            <div style={{ padding: '0.5rem' }}>
                <SearchIcon fill={'#4E4E4E'} />
            </div>
            <input
                value={value}
                onChange={onChange}
                placeholder={'Where to?'}
                style={{
                    borderColor: 'transparent',
                    backgroundColor: '#f3f4f6',
                    width: '100%',

                }}
            />
        </div>
    );
};

export default SearchBar;
