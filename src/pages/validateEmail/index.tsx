import React, { useEffect, useState } from "react";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {bool} from "prop-types";
import {useNavigate, useParams} from "react-router-dom";


const ValidateEmail = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [alreadyVal, setAlreadyVal] = useState<boolean>(false)
    const [expired, setExpired] = useState<boolean>(false)
    const queryString = window.location.search;
    const urlParams : URLSearchParams = new URLSearchParams(queryString);

    const handleSubmit = async () => {
        try {
            const userId = parseInt(urlParams.get('userId')?? '0')
            const userRes = await axios.get(`http://localhost:3001/api/users/get/${userId}`)
            if (userRes.data.email_validated) {
                setAlreadyVal(true)
            } else {
                const res = await axios.put("http://localhost:3001/api/users/validate_user_email", {user_id: userId})
                if(res.data.success){
                    setValidated(true)
                }
            }
        } catch(e: any) {
            console.log(e)
        }
    };
    const handleClick = () => {
        setValidated(true);
        handleSubmit()
    }
    const handleExpiration = () => {
        setExpired(true)
    }

    setTimeout(handleExpiration, 50000)

    return (
        <div style = {{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            {!expired ?
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
                            {!alreadyVal ?
                                <><p>Email validated!</p><p>You can close this tab now</p></>
                                :
                                <p>Email already validated!</p>
                            }
                        </div>
                    }
                </div>
            </div>
                :
                <div>
                    <h1 style={{
                        color: '#021452'
                    }}>
                        Validation expired!
                    </h1>
                </div>
            }
        </div>
    )
}
export default ValidateEmail