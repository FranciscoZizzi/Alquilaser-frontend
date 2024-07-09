import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import axios from "axios";
import TextField from "../../components/textField/TextField";
import {Link, useNavigate} from "react-router-dom";

const ValidateEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sentEmail, setSentEmail] = useState(false)
    const [currentUserId, setUserId] = useState<number>(0)

    const handleSubmit = async () => {
        try {
            setSentEmail(true)
            const res = await axios.post("http://localhost:3001/api/users/validate_email", { email });
            setUserId(res.data.userId)
        } catch(e: any) {
            setEmailError(e.response.data.emailError);
            setErrorMessage(e.response.data.message);
        }
    };

    // let intervalId: NodeJS.Timeout | undefined;
    //
    // const  checkValidatedEmail  = async(timeOutDuration: number | undefined) => {
    //     clearInterval(intervalId);
    //     intervalId = setInterval(async () => {
    //         try {
    //             if (sentEmail && currentUserId !== 0) {
    //                 if (currentUserId) {
    //                     const user = await axios.get(`http://localhost:3001/api/users/get/${currentUserId}`)
    //                     if (user.data.email_validated) {
    //                         navigate("/")
    //                         clearInterval(intervalId)
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }, 5000);
    //     setTimeout(() => {
    //         clearInterval(intervalId)
    //     }, timeOutDuration)
    // }
    // checkValidatedEmail(200000).then(r =>
    //     setSentEmail(false)
    // )

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
                    Validate your Email
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    {sentEmail ? (
                        <div>
                            Email has been sent to : {email}
                            <div>
                                <p style={{
                                    fontSize: '16px'
                                }}>
                                    If you did not receive the validation email, click here to resend it.
                                </p>
                                <Button onClick={handleSubmit}>
                                    Resend Email
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                            <Button onClick={handleSubmit}>Send validation email</Button>
                        </div>
                    )}

                    <div style={{
                        marginTop: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}>
                        <p style={{color: 'red'}}>{errorMessage}</p>
                        <span>
                            Don't have an account? <Link to="/register">Register</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidateEmail