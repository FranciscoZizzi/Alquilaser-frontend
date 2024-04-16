import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css'
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";

const PopUp: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [damage, setDamage] = useState("");
    const [listingState, setState] = useState("");

    const handleSubmit =  async () => {
        const res = await axios.post("http://localhost:3001/api/listings/add", {title, price, description, damage, listingState})
    }

    const toggleModal = () => {
        setOpen(!open);
    }

    return (
        <Popup
            open={open}
            // onClose={() => setOpen(false)}
            modal
            nested
            trigger={<Button className="button" onClick={() => setOpen(!open)}>Add new listing</Button>}
        >
            
            <div className="modal">
                <button className="close" onClick={() => setOpen(!open)}>
                    &times;
                </button>
                <div className="header">Add new listing</div>
                <div className="content">
                    form
                </div>
                <div className="actions">
                    <TextField value={title} placeholder={"Post title"} onChange={setTitle}/>
                    <TextField value={price} placeholder={"Price"} onChange={setPrice}/>
                    <TextField value={description} placeholder={"Description"} onChange={setDesc}/>
                    <TextField value={damage} placeholder={"Damage"} onChange={setDamage}/>
                    {/* TODO paso el state por acá pero se manejaría internamente*/}
                    <TextField value={listingState} placeholder={"Listing State"} onChange={setState}/>
                    <Button onClick={handleSubmit}>Create listing</Button>
                </div>
            </div>
        </Popup>
    );
};

export default PopUp;