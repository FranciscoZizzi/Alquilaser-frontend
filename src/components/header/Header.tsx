import React, {useState} from "react"
import './headerStyle.css'
import {createSearchParams, useNavigate} from "react-router-dom";
import IconButton from "../iconButton/IconButton";
import ImageButton from "../imageButton/ImageButton";
import {BackArrowIcon} from "../icons/BackArrowIcon";
import SearchBar from "../searchBar/SearchBar";
import axios from "axios";
import {SearchIcon} from "../icons/SearchIcon";

const Header = ({showBackButton, showSearchBar, showProfileIcon}:{
    showBackButton: boolean,
    showSearchBar: boolean,
    showProfileIcon: boolean,
}) => {
    const [searchTerm, setValue] = useState<string>("");

    let navigate = useNavigate();
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        navigate(-1)
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

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

    const handleProfileClick = () => {
        let path = '/profile';
        navigate(path);
    }

    return(
        <div className="header">
            <div className="back-button">
                {showBackButton ? <IconButton icon={<BackArrowIcon fill={"white"} width={'50'} height={'50'}/>} onClick={handleBackButtonClick}/> : null}
            </div>
            <div className="search-bar">
                {showSearchBar ? <SearchBar value={"Search for parts"} onChange={handleChange} onKeyUp={handleKeyPress}/> : null}
            </div>
            <div className="profile-icon">
                {showProfileIcon ? <ImageButton onClick={handleProfileClick} imageURL={"https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"}/> : null}
            </div>
        </div>
    )
}

export default Header;