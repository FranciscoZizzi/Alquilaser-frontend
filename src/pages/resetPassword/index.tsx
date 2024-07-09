import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button";
import PasswordField from "../../components/textField/PasswordField";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {id,token} = useParams()
    const [hasReset, setHasReset] = useState(false)

    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [matchingPasswordError, setMatchingPasswordError] = useState(false)

    const handleSubmit = async () => {
        if(password != confirmPassword){
            setMatchingPasswordError(true)
            setPasswordErrorMessage("Passwords dont match")
            return
        }
        else if(!password){
            setPasswordErrorMessage('Password cannot be empty')
            return
        }
        else{
            setMatchingPasswordError(false)
        }
        try {
            setHasReset(true)
            const res = await axios.put(`http://localhost:3001/api/users/reset_password/${id}/${token}`, { password, confirmPassword });
            navigate('/login');
        } catch(e: any) {
            console.log(e)
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
                    Set new password
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    {hasReset ? (
                        <p>Password has been reset</p>
                    ) : (
                        <div>
                            <PasswordField value={password} placeholder={"New password"} onChange={setPassword} isError={matchingPasswordError || (passwordErrorMessage != '')}/>
                            <PasswordField value={confirmPassword} placeholder={"Confirm new password"} onChange={setConfirmPassword} isError={matchingPasswordError}/>
                            <p style={{color: 'red'}}>{passwordErrorMessage}</p>
                            <Button onClick={handleSubmit}>Change password</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;
