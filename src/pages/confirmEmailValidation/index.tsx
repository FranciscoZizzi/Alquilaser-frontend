import React, { useEffect, useState } from "react";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {bool} from "prop-types";
import {useNavigate, useParams} from "react-router-dom";


const ConfirmEmailValidation = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [alreadyVal, setAlreadyVal] = useState<boolean>(false)
    const {id, token} = useParams()

    const handleSubmit = async () => {
        try {
            const userRes = await axios.get(`http://localhost:3001/api/users/get/${id}`)
            if (userRes.data.email_validated) {
                setAlreadyVal(true)
            } else {
                const res = await axios.put(`http://localhost:3001/api/users/confirm_email_validation/${id}/${token}`, {user_id: id})
                if(res.data.success){
                    setValidated(true)
                    navigate("/")
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
    // const handleExpiration = () => {
    //     setExpired(true)
    // }
    //setTimeout(handleExpiration, 50000)
    //The token handles the expiration (?)

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
                            {!alreadyVal ?
                                <p>Email validated!</p>
                                :
                                <p>Email already validated!</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default ConfirmEmailValidation