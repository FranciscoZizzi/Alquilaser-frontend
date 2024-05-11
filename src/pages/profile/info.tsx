import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Listing from "../../components/listing/Listing";
import ListingHistory from "../../components/listing/ListingHistory";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import AddNewListingPopUp from "../../components/popUp/AddNewListingPopUp";
import { theme } from '../../utils/theme';
import ImageUploadButton from "../../components/imageUploadButton/ImageUploadButton";
import Header from "../../components/header/Header";
import axios from "axios";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import PhoneNumberField from "../../components/phoneNumberField/PhoneNumberField";

const ProfileInfoPage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ name: '', phone: '', email: '', profilePic: null});
    const [imageUrl, setImageUrl] = useState('');
    const [editMode, setEditMode] = useState(false)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleEditProfile = () => {
        setEditMode(!editMode)
    };

    const handleSaveChanges = () => {

    }

    const handleImageUpload = async (imageUrl: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No JWT token available');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            const blob = await fetch(imageUrl).then((response) => response.blob());
            const formData = new FormData();
            const extension = blob.type.split('/')[1];
            const fileName = `profile_pic.${extension}`;
            const file = new File([blob], fileName);
            formData.append('profile_pic', file, fileName);

            const res = await axios.put('http://localhost:3001/api/users/profile', formData, config);
            console.log('Response from server:', res.data);
            window.location.reload()
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    const bufferToUrl = (image: any) => {
        const buffer = new ArrayBuffer(image.data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < image.data.length; i++) {
            view[i] = image.data[i];
        }
        const blob = new Blob([buffer], { type: 'image/png' });
        return URL.createObjectURL(blob);
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
                const { name, profile_pic, phone, email } = res.data.data;
                setUserData({ name, phone, email, profilePic: profile_pic });

                if (profile_pic && profile_pic.data) {
                    setImageUrl(bufferToUrl(profile_pic));
                }

            } catch (error) {
                navigate('/login');
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
            <Header showSearchBar={false} showProfileIcon={true} showBackButton={true} />
            <div style={{ borderRadius: 25, background: theme.primary300, display: "flex", flexDirection: "row", marginTop: 53, marginLeft: "8%", width: "80%", padding: "2.5%" }}>
                <div style={{
                    width: 320,
                    display: 'flex',
                    flexDirection: "column",
                    gap: 10
                }}>
                    <Avatar name={userData.name} size="320" src={imageUrl} />
                    <ImageUploadButton setImage={handleImageUpload} />
                    <Button variant={"secondary"} onClick={handleEditProfile}>Edit Profile</Button>
                </div>
                <div className="info" style={{ marginLeft: 30 }}>
                    <div>
                        <h1>Name:</h1>

                        <h2>{userData.name}</h2>
                    </div>
                    <div>
                        <h1>Phone number:</h1>
                        <h2>{userData.phone}</h2>
                    </div>
                    <div>
                        <h1>Email:</h1>
                        <h2>{userData.email}</h2>
                    </div>
                    <TextField value={username} placeholder={"Username"} onChange={setUsername} isError={usernameError}/>
                    <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                    <PasswordField value={password} placeholder={"Password"} onChange={setPassword} isError={passwordError}/>
                    <PasswordField value={confirmPassword} placeholder={"Confirm password"} onChange={setConfirmPassword} isError={passwordError}/>
                    <PhoneNumberField value={phoneNumber} placeholder={"Phone number"}  onChange={setPhoneNumber} isError={numberError}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfoPage;
