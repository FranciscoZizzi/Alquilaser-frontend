import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import TextField from "../../components/textField/TextField";
import axios from "axios";
import Button from "../../components/button/Button";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {id,token} = useParams()

    const handleSubmit = async () => {
        try {
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
                    <TextField value={password} placeholder={"New password"} onChange={setPassword}/>
                    <TextField value={confirmPassword} placeholder={"Confirm new password"} onChange={setConfirmPassword}/>
                    <Button onClick={handleSubmit}>Change password</Button>
                    <div style={{
                        marginTop: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}>
                        {/*<p style={{color: 'red'}}>{errorMessage}</p>*/}
                        <span>
                            Don't have an account? <Link to="/register">Register</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;
