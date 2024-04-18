import React, {useState} from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/users/login", {email, password});
            localStorage.setItem("user", res.data.data); // Queda guardado en localstorage, se puede acceder desde toda la app
            // Mandar header
        } catch(e) {
            alert(e);
        }
    }
    // let navigate = useNavigate();
    // const goToRegister = () => {
    //     let path = '/register';
    //     navigate(path);
    // }

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
                    <Button onClick={handleSubmit}>Login</Button>
                    <div style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px', // Adds some space between the links
                    }}>

                    <span>
                        {/*TODO use navigate*/}
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