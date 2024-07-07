import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css'
import Button from "../button/Button";

const EmailValidationPopUp: React.FC = ({}) => {
    const [open, setOpen] = useState(false);
    return (
        <Popup
            open={open}
            modal
            nested
            contentStyle={{
                borderRadius: '10px',
            }}
            trigger={<Button variant={"empty"} style={{width:140, height:40}} className="button" onClick={() => setOpen(!open)}>Additional info</Button>}
            >
            </Popup>
    )
}
