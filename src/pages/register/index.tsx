import React, { useState } from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";


const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    //
    const handleSubmit =  async () => {
        const res = await axios.post("http://localhost:3001/api/users/register", {name: username, email, password, confirmPassword, phoneNumber})
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

                <TextField value={username} placeholder={"Username"} onChange={setUsername}/>
                <TextField value={email} placeholder={"Email"} onChange={setEmail}/>
                <PasswordField value={password} placeholder={"Password"} onChange={setPassword}/>
                <PasswordField value={confirmPassword} placeholder={"Confirm password"} onChange={setConfirmPassword} />
                <TextField value={phoneNumber} placeholder={"Phone number"}  onChange={setPhoneNumber}/>
                <Button onClick={handleSubmit}>Create account</Button>
            </div>
        </div>
    )
}

export default RegisterPage