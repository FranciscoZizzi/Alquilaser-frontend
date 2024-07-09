import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css';
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";

const ChangePasswordPopUp = () => {

    const [open, setOpen] = useState(false);
    const [prevPassword, setPrevPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [prevPasswordError, setPrevPasswordError] = useState(false)
    const [matchingPasswordError, setMatchingPasswordError] = useState(false)
    const [passErrMessage, setPassErrMessage] = useState('')

    const [prevPassErrMessage, setPrevPassErrMessage] = useState('')
    const [matchingPassErrMessage, setMatchingPassErrMessage] = useState('')

    const handleSubmit = async () => {
        try {
            if(!password){
                setPassErrMessage("Password cannot be emtpy")
                return
            }
            else{
                setPassErrMessage('')
            }

            let token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:3001/api/users/change_password`, {
                prevPassword,
                password,
                confirmPassword
            }, { headers: { authorization: "Bearer " + token } });
            console.log("Password changed successfully");
            setOpen(false)
            window.location.reload();
        } catch (e:any) {
            setMatchingPasswordError(e.response.data.matchingPasswordError);
            setPrevPasswordError(e.response.data.wrongPasswordError);
            if(e.response.data.wrongPasswordError){
                setPrevPassErrMessage(e.response.data.message)
            }
            else{setMatchingPassErrMessage(e.response.data.message)}
            console.error("Error changing password:", e);
        }
    };

    return (
        <Popup
            open={open}
            modal
            nested
            contentStyle={{
                borderRadius: '10px',
            }}
            trigger={<Button variant={"empty"} style={{ width: 240, height: 40 }} className="button" onClick={() => setOpen(!open)}>Change password</Button>}
        >

            <div className="modal">
                <button className="close" onClick={() => setOpen(!open)}>
                    &times;
                </button>
                <h1 style={{
                    textAlign: "center"
                }}>Change  password</h1>
                <div className="actions">
                    <TextField value={prevPassword} placeholder={"Current password"} onChange={setPrevPassword} isError={prevPasswordError}/>
                    <p style={{color: 'red'}}>{prevPassErrMessage}</p>
                    <TextField value={password} placeholder={"New password"} onChange={setPassword} isError={matchingPasswordError || (passErrMessage != '')}/>
                    <p style={{color: 'red'}}>{passErrMessage}</p>
                    <TextField value={confirmPassword} placeholder={"Confirm new password"} onChange={setConfirmPassword} isError={matchingPasswordError}/>
                    <p style={{color: 'red'}}>{matchingPassErrMessage}</p>
                    <Button variant={"primary"} onClick={handleSubmit}>Change password</Button>
                </div>
            </div>
        </Popup>
    );
};

export default ChangePasswordPopUp;
