import React, {useEffect, useState} from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import {createSearchParams, useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";

const HomePage = () => {

    const [searchTerm, setValue] = useState<string>("");
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    let navigate = useNavigate();
    const handleKeyPress = async (keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
        if(keyEvent.key === 'Enter') {
            navigate({
                pathname: "search-results",
                search: `?${createSearchParams({
                    searchTerm: searchTerm
                })}`
            });
        }
    }

    return (

        <div>
            <Header showBackButton={false} showProfileIcon={true} showSearchBar={false}/>
            <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // height: '100vh'
        }}>
            <div style={{
                marginTop:'15%',
                // height: 700,
                width: 360
            }}>
                <SearchBar value={searchTerm} onChange={handleChange} onKeyUp={handleKeyPress}></SearchBar>
            </div>
        </div>
        </div>
    );
}

export default HomePage;