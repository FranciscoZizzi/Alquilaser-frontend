import React, {useState} from "react";
import TextField from "../../components/textField/TextField";
import Button from "../../components/button/Button";

const LoginPage = () => {

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
                    {/*<TextField placeholder={"Email"}/>*/}
                    {/*<TextField placeholder={"Password"}/>*/}
                    <Button>Login</Button>

                </div>

            </div>
        </div>
    )
}

export default LoginPage