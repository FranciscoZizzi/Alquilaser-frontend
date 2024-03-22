import React, {useState} from "react";
import { SearchIcon } from "../icons/SearchIcon";
import {StyledSearchBar} from "./StyledSearchBar";

const SearchBar = ({value, onChange}: {
    value: string,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}) => {
    return (
        <StyledSearchBar>
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
        </StyledSearchBar>
    );
};

export default SearchBar;
