import React, {useState} from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import axios from "axios";
import {createSearchParams, useNavigate} from "react-router-dom";
import ImageButton from "../../components/imageButton/ImageButton";

const HomePage = () => {

    const [searchTerm, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    let navigate = useNavigate();
    const handleKeyPress = async (keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
        if(keyEvent.key === 'Enter') {
            const res = await axios.post("http://localhost:3001/api/search", {searchTerm});
            navigate({
                pathname: "search-results",
                search: `?${createSearchParams({
                    searchTerm: searchTerm
                })}`
            });
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // TODO take user to profile page
    }

    return (
        <div>
        <div style={{
            height:80,
            backgroundColor:"lightgray",
            display:"flex",
            justifyContent:"right",
        }}>
            <div style={{marginTop:2, marginBottom:2}}>
                <ImageButton imageURL={"PLACE_USER_PIC_URL"}/>
            </div>
        </div>
        <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                marginTop:'25%',
                height: 700,
                width: 360
            }}>
                <SearchBar value={searchTerm} onChange={handleChange} onKeyUp={handleKeyPress}></SearchBar>
            </div>
        </div>
        </div>
    );
}

export default HomePage;