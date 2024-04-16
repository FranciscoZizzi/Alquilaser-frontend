import React, {useState} from "react";
import AvatarButton from "../../components/button/AvatarButton";
import SearchBar from "../../components/searchBar/SearchBar";
import Popup from "reactjs-popup";
import PopUp from "../../components/popUp/addNewListingPopUp";
import axios from "axios";
import ResultPage from "../result";
import {createSearchParams, useNavigate} from "react-router-dom";

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
                <AvatarButton name={"Jeremy Elbertson"} src={"https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"}></AvatarButton>
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