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
    const handleSubmit = async () => {
        try {
            let token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:3001/api/users/change_password`, {
                prevPassword,
                password,
                confirmPassword
            }, { headers: { authorization: "Bearer " + token } });
            console.log("Password changed successfully");
            setOpen(false)
            window.location.reload();
        } catch (error:any) {
            console.error("Error changing password:", error);
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
                    <TextField value={prevPassword} placeholder={"Current password"} onChange={setPrevPassword}/>
                    <TextField value={password} placeholder={"New password"} onChange={setPassword}/>
                    <TextField value={confirmPassword} placeholder={"Confirm new password"} onChange={setConfirmPassword}/>
                    <Button variant={"primary"} onClick={handleSubmit}>Change password</Button>
                </div>
            </div>
        </Popup>
    );
};

export default ChangePasswordPopUp;
