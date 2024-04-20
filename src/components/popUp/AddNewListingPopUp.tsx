import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css'
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import MultipleImagesUploadButton from "../multipleImagesUploadButton/MultipleImagesUploadButton";
import ExtendedTextField from "../extendedTextField/ExtendedTextField";
import {getAddListingURL} from "../../utils/url";

const AddNewListingPopUp: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleSubmit =  async () => {
        try {
            let token = localStorage.getItem("token")
            const res = await axios.post(getAddListingURL(), {
                title,
                price,
                description,
                imageUrls
            }, {headers: {authorization: "Bearer " + token}})
        } catch(e: any) {
            alert(e.response.data.message);
        }
    }

    const handleSetImages = (newUrls: string[]) => {
        setImageUrls(prevUrls => [...prevUrls, ...newUrls]);
    };

    return (
        <Popup
            open={open}
            modal
            nested
            contentStyle={{
                borderRadius: '10px', // Apply rounded corners to the popup content
            }}
            trigger={<Button style={{width:240, height:40}} className="button" onClick={() => setOpen(!open)}>Add new listing</Button>}
        >

            <div className="modal">
                <button className="close" onClick={() => setOpen(!open)}>
                    &times;
                </button>
                <h1 style={{
                    textAlign: "center"
                }}>Add new listing</h1>
                <div className="actions">
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",  // Ensure the container takes full width
                        gap: "10px",  // Adjust the gap between the fields
                    }}>
                        <div style={{flex:3}}>
                            <TextField value={title} placeholder={"Post title"} onChange={setTitle}/>
                        </div>
                        <div style={{flex:1}}>
                            <TextField value={price} placeholder={"Price"} onChange={setPrice}/>
                        </div>
                    </div>
                    <div>
                        <ExtendedTextField value={description} placeholder={"Description"} onChange={setDesc}/>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: "column",
                        gap: 10
                    }}>
                        <MultipleImagesUploadButton setImages={handleSetImages}/>
                        <Button onClick={handleSubmit}>Create listing</Button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default AddNewListingPopUp;