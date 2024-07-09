import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PhoneNumberField from "../../components/phoneNumberField/PhoneNumberField";
import Button from "../../components/button/Button";
import TextField from "../../components/textField/TextField";

const CompleteGoogleLoginPage = () => {
    const { token } = useParams();

    const [numberError, setNumberError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            if (!token) {
                throw new Error('No JWT token available');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.put("http://localhost:3001/api/users/add_phone_number", {phoneNumber}, config);
            navigate("/")
        } catch(e: any) {
            setNumberError(e.response.data.numberError);
        }
    }

    useEffect(() => {
        console.log(token)
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("isGoogleSession", "true");
        } else {
            console.error('No token found in the URL');
        }
    }, [token]);

    return (
    <div style = {{
        backgroundColor: '#e0f0fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}>
        <div style={{
            height: 700,
            width: 360,
            marginTop: '120px'
        }}>
            <h2 style={{
                color: '#021452'
            }}>
                Complete your registration
            </h2>
            <div style={{
                fontSize: '16px',
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <PhoneNumberField value={phoneNumber} placeholder="Enter your phone number" onChange={setPhoneNumber}/>
                </div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    </div>
    )
}

export default CompleteGoogleLoginPage;