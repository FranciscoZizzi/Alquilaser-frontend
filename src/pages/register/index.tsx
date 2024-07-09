import React, {useEffect, useState} from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import IconButton from "../../components/iconButton/IconButton";
import {SearchIcon} from "../../components/icons/SearchIcon";
import PhoneNumberField from "../../components/phoneNumberField/PhoneNumberField";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            if(localStorage.getItem("isGoogleSession") != null){
                localStorage.removeItem("isGoogleSession");
            }
            const res = await axios.post("http://localhost:3001/api/users/register", {name: username, email, password, confirmPassword, phoneNumber});
            localStorage.setItem("token", res.data.data.token);// Queda guardado en localstorage, se puede acceder desde toda la app
            navigate("/validate_email")
        } catch(e: any) {
            setUsernameError(e.response.data.usernameError);
            setEmailError(e.response.data.emailError);
            setPasswordError(e.response.data.passwordError)
            setNumberError(e.response.data.numberError);
            setErrorMessage(e.response.data.message);
        }
    }

    return (
        <div style={{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontSize: '16px'
        }}>
            <div style={{
                height: 700,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                    Register
                </h1>
                <TextField value={username} placeholder={"Username"} onChange={setUsername} isError={usernameError}/>
                <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                <PasswordField value={password} placeholder={"Password"} onChange={setPassword} isError={passwordError}/>
                <PasswordField value={confirmPassword} placeholder={"Confirm password"} onChange={setConfirmPassword} isError={passwordError}/>
                <PhoneNumberField value={phoneNumber} placeholder={"Phone number"}  onChange={setPhoneNumber} isError={numberError}/>
                <Button onClick={handleSubmit}>Create account</Button>
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p style={{color: 'red'}}>{errorMessage}</p>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                    </div>
            </div>
        </div>
    )
}

export default RegisterPage