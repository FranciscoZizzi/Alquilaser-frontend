import React, {useEffect, useState} from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import IconButton from "../../components/iconButton/IconButton";
import {SearchIcon} from "../../components/icons/SearchIcon";
import PhoneNumberField from "../../components/phoneNumberField/PhoneNumberField";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userCreated, setUserCreated] = useState<boolean>(false)
    const [sentEmail , setSentEmail] = useState<boolean>(false)
    const [currentUserId, setStateUserId] = useState<number>(0)
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/users/register", {name: username, email, password, confirmPassword, phoneNumber});
            localStorage.setItem("token", res.data.data.token);// Queda guardado en localstorage, se puede acceder desde toda la app
            setStateUserId(res.data.data.userId)
            setUserCreated(true)
            try {
                setSentEmail(true)
                await sendEmail(res.data.data.userId)
                window.location.reload()
            } catch (e: any){
                console.log(e)
            }
        } catch(e: any) {
            setUsernameError(e.response.data.usernameError);
            setEmailError(e.response.data.emailError);
            setPasswordError(e.response.data.passwordError)
            setNumberError(e.response.data.numberError);
            setErrorMessage(e.response.data.message);
        }
    }
    const sendEmail = async (id : any)=> {
        await axios.post(`http://localhost:3001/api/users/validate_email/${id}`, {email})
    }
    const handleClick = async () => {
        await sendEmail(currentUserId)
        setSentEmail(true)
    }

    let intervalId: NodeJS.Timeout | undefined;

    const  checkValidatedEmail  = async(timeOutDuration: number | undefined) => {
        clearInterval(intervalId);
        intervalId = setInterval(async () => {
            try {
                if (sentEmail && currentUserId !== 0) {
                    if (currentUserId) {
                        const user = await axios.get(`http://localhost:3001/api/users/get/${currentUserId}`)
                        if (user.data.email_validated) {
                            navigate("/")
                            clearInterval(intervalId)
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }, 5000);
        setTimeout(() => {
            clearInterval(intervalId)
        }, timeOutDuration)
    }
    checkValidatedEmail(200000).then(r =>
        setSentEmail(false)
    )

    return (
        <div style={{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontSize: '16px'
        }}> {!userCreated ?
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
                <TextField value={username} placeholder={"Username"} onChange={setUsername} isError={usernameError}/>
                <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                <PasswordField value={password} placeholder={"Password"} onChange={setPassword} isError={passwordError}/>
                <PasswordField value={confirmPassword} placeholder={"Confirm password"} onChange={setConfirmPassword} isError={passwordError}/>
                <PhoneNumberField value={phoneNumber} placeholder={"Phone number"}  onChange={setPhoneNumber} isError={numberError}/>
                <Button onClick={handleSubmit}>Create account</Button>
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <p style={{color: 'red'}}>{errorMessage}</p>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                    </div>
            </div>:
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                gap: "1px"
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                    Validation email has been sent to:
                </h1>
                <p style={{
                    fontSize: '20px'
                }}>
                    {email}
                </p>
                <p style={{
                    fontSize: '16px'
                }}>
                    If you did not receive the validation email, click here to resend it.
                </p>
                <Button onClick={handleClick}>
                    Resend Email
                </Button>
            </div>
        }

        </div>
    )
}

export default RegisterPage