import React, {useState} from "react";
import TextField from "../../components/textField/TextField";

const RegisterPage = () => {

    return (
        <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                height: 700,
                width: 360
            }}>
                <h1>
                    Register
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    <TextField placeholder={"Username"}/>
                    <TextField placeholder={"Email"}/>
                    <TextField placeholder={"Password"}/>
                    <TextField placeholder={"Confirm password"}/>
                    <TextField placeholder={"Phone number"}/>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage