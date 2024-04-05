import React, {useState} from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //



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
                    Login
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    <TextField value={email} placeholder={"Email"} onChange={setEmail}/>
                    <PasswordField value={password} placeholder={"Password"} onChange={setPassword}/>
                    <Button>Login</Button>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px', // Adds some space between the links
                    }}>
                    <span>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                        <span>
                        or
                    </span>
                        <span>
                    <Link to="/">Continue without signing in</Link>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage