import React, {useEffect, useState} from "react"
import './headerStyle.css'
import {createSearchParams, useNavigate} from "react-router-dom";
import IconButton from "../iconButton/IconButton";
import ImageButton from "../imageButton/ImageButton";
import {BackArrowIcon} from "../icons/BackArrowIcon";
import SearchBar from "../searchBar/SearchBar";
import axios from "axios";
import {getSearchURL} from "../../utils/url";
import { UserIcon } from "../icons/UserIcon";

const Header = ({showBackButton, showSearchBar, showProfileIcon}:{
    showBackButton: boolean,
    showSearchBar: boolean,
    showProfileIcon: boolean,
}) => {
    const [searchTerm, setValue] = useState<string>("");
    const [imageUrl, setImageUrl] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    let navigate = useNavigate();
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        navigate(-1)
    }

    const handleChange = (event: any) => {
        setValue(event.currentTarget.value);
    }

    function hasJWT() {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No JWT token available');
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                    const res = await axios.get("http://localhost:3001/api/users/profile", config);
                if (!res.data || !res.data.data) {
                    throw new Error('No user profile data available');
                }
                setIsLoggedIn(true);

                const { profile_pic } = res.data.data;

                if (profile_pic && profile_pic.data) {
                    const buffer = new ArrayBuffer(profile_pic.data.length);
                    const view = new Uint8Array(buffer);
                    for (let i = 0; i < profile_pic.data.length; i++) {
                        view[i] = profile_pic.data[i];
                    }
                    const blob = new Blob([buffer], { type: 'image/png' }); // Assuming the image is PNG

                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrl(imageUrl);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleKeyPress = async (keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
        if(keyEvent.key === 'Enter') {
            const res = await axios.post(getSearchURL(), {searchTerm});
            navigate({
                pathname: "/search-results",
                search: `?${createSearchParams({
                    searchTerm: searchTerm
                })}`
            });
            window.location.reload();
        }
    }

    const handleProfileClick = () => {
        let path;
        if (isLoggedIn) {
            path = '/profile';
        } else {
            path = '/login';
        }
        navigate(path);
    }


    return(
        <div className="header">
            <div className="back-button">
                {showBackButton ? <IconButton icon={<BackArrowIcon fill={"white"} width={'50'} height={'50'}/>} onClick={handleBackButtonClick}/> : null}
            </div>
            <div className="search-bar">
                {showSearchBar ? <SearchBar value={searchTerm} onChange={handleChange} onKeyUp={handleKeyPress}/> : null}
            </div>
            <div className="profile-icon">
                {showProfileIcon ?
                    (isLoggedIn ? <ImageButton onClick={handleProfileClick} imageURL={imageUrl || 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'}/> :
                        <IconButton onClick={handleProfileClick} icon={<UserIcon fill={"white"} height={"50"} width={"50"}/>}/>) : null}
            </div>

        </div>
    )
}

export default Header;