import React, { useEffect, useState } from "react";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {bool} from "prop-types";
import {useNavigate, useParams} from "react-router-dom";


const ValidateEmail = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const queryString = window.location.search;
    const urlParams : URLSearchParams = new URLSearchParams(queryString);

    const handleSubmit = async () => {
        try {
            const userId = parseInt(urlParams.get('userId')?? '0')
            console.log("aaaaa", userId)
            const res = await axios.put("http://localhost:3001/api/users/validate_user_email", {user_id: userId})
            if(res.data.success){
                setValidated(true)
            }
        } catch(e: any) {
            console.log(e)
        }
    };
    const handleClick = () => {
        setValidated(true);
        handleSubmit()
    }

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
                   Validate you email
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    {!validated ?
                        <Button onClick={handleClick}>Validate</Button>
                        :
                        <div style={{
                            fontSize: 16,
                            alignItems:"center"
                        }}>
                            <p>Email validated!</p>
                            <p>You can close this tab now</p>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}
export default ValidateEmail