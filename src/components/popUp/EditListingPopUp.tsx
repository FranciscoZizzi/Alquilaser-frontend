import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css';
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import MultipleImagesUploadButton from "../multipleImagesUploadButton/MultipleImagesUploadButton";
import ExtendedTextField from "../extendedTextField/ExtendedTextField";
import NumberField from "../numberField/NumberField";

interface EditListingPopUpProps {
    listingId: number,
    title: string;
    rate: string;
    availability: string;
    description: string;
}

const EditListingPopUp = forwardRef((props: EditListingPopUpProps, ref) => {
    const { listingId, title, rate, availability, description } = props;

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentRate, setCurrentRate] = useState(rate);
    const [currentAvailability, setCurrentAvailability] = useState(availability);
    const [currentDescription, setCurrentDescription] = useState(description);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        try {
            let token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:3001/api/listings/edit/${listingId}`, {
                listingId: listingId,
                title: currentTitle,
                rate: currentRate,
                description: currentDescription,
                availability: currentAvailability,
            }, { headers: { authorization: "Bearer " + token } });
            console.log("Listing edited successfully");
            window.location.reload();
        } catch (error:any) {
            alert(error.response.data.message)
            console.error("Error editing listing:", error);
        }
    };

    useImperativeHandle(ref, () => ({
        openPopup: () => setOpen(true)
    }), []);

    return (
        <Popup
            open={open}
            modal
            nested
            contentStyle={{
                borderRadius: '10px',
            }}
            trigger={<Button variant={"secondary"} style={{ width: 240, height: 40 }} className="button" onClick={() => setOpen(!open)}>Edit</Button>}
        >

            <div className="modal">
                <button className="close" onClick={() => setOpen(!open)}>
                    &times;
                </button>
                <h1 style={{
                    textAlign: "center"
                }}>Edit listing</h1>
                <div className="actions">
                    <div>
                        <TextField value={currentTitle} placeholder={title} onChange={setCurrentTitle} />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",
                        gap: "10px",
                    }}>
                        <div style={{ flex: 3 }}>
                            <TextField value={currentAvailability} placeholder={"Availability"} onChange={setCurrentAvailability} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <NumberField value={currentRate} placeholder={"Rate"} onChange={setCurrentRate} />
                        </div>
                    </div>
                    <div>
                        <ExtendedTextField value={currentDescription} placeholder={"Description"} onChange={setCurrentDescription} />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: "column",
                        gap: 10
                    }}>
                        <Button onClick={handleSubmit}>Edit listing</Button>
                    </div>
                </div>
            </div>
        </Popup>
    );
});

export default EditListingPopUp;
