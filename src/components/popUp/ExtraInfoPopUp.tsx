import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css'
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import MultipleImagesUploadButton from "../multipleImagesUploadButton/MultipleImagesUploadButton";
import ExtendedTextField from "../extendedTextField/ExtendedTextField";

interface ExtraInfoPopUpProps{
    title: string;
    client: string;
    rate: string;
    finalPrice: string;
    dateOfReservation: string;
    prevDamage: string;
    additionalDamage?: string;
}

const ExtraInfoPopUp: React.FC<ExtraInfoPopUpProps> = ({title, client, rate,finalPrice, dateOfReservation,prevDamage, additionalDamage}) => {
    const [open, setOpen] = useState(false);

    return (
        <Popup
            open={open}
            modal
            nested
            contentStyle={{
                borderRadius: '10px', // Apply rounded corners to the popup content
            }}
            trigger={<Button variant={"empty"} style={{width:140, height:40}} className="button" onClick={() => setOpen(!open)}>Additional info</Button>}
        >

            <div className="modal">
                <button className="close" onClick={() => setOpen(!open)}>
                    &times;
                </button>
                <h1 style={{
                    textAlign: "center"
                }}>Additional info</h1>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '20px', gap:'20px' }}>
                    {/* First Row */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ flexBasis: '50%' }}>{title}</div>
                        <div style={{ flexBasis: '50%' }}>Client: {client}</div>
                    </div>

                    {/* Second Row */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ flexBasis: '50%' }}>Rate:{rate} Final price:{finalPrice}</div>
                        <div style={{ flexBasis: '50%' }}>Date of reservation:{dateOfReservation}</div>
                    </div>

                    {/* Third Row */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ flexBasis: '50%' }}>Damage at time of rent: {prevDamage}</div>
                        <div style={{ flexBasis: '50%' }}>Additional damage: {additionalDamage}</div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ExtraInfoPopUp;