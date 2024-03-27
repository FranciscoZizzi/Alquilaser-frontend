import React, { useState } from "react";
import TextField from "../../components/textField/TextField";
import Button from "../../components/button/Button";

const RegisterPage = () => {

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
                <TextField placeholder={"Username"} />
                <TextField placeholder={"Email"} />
                <TextField placeholder={"Password"}/>
                <TextField placeholder={"Confirm password"} />
                <TextField placeholder={"Phone number"} />
                <Button>Create account</Button>
            </div>
        </div>
    )
}

export default RegisterPage
