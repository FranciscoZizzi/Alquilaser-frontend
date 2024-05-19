import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import TextField from "../../components/textField/TextField";
import axios from "axios";
import Button from "../../components/button/Button";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sentEmail, setSentEmail] = useState(false)

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/users/forgot_password", { email });
            setSentEmail(true)
        } catch(e: any) {
            setEmailError(e.response.data.emailError);
            setErrorMessage(e.response.data.message);
        }
    };

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
                width: 360
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                    Forgot password
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    {sentEmail ? (
                        <p>Email has been sent</p>
                    ):(
                        <div>
                            <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                            <Button onClick={handleSubmit}>Send recovery email</Button>
                        </div>
                    )}

                    <div style={{
                        marginTop: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}>
                        <p style={{color: 'red'}}>{errorMessage}</p>
                        <span>
                            Don't have an account? <Link to="/register">Register</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;
