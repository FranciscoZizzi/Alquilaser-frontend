import React, { useState, useEffect, forwardRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css';
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import MultipleImagesUploadButton from "../multipleImagesUploadButton/MultipleImagesUploadButton";
import ExtendedTextField from "../extendedTextField/ExtendedTextField";
import { QRCode } from 'react-qrcode-logo';
import { getAddListingURL } from "../../utils/url";
import NumberField from "../numberField/NumberField";

const AddNewListingPopUp = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [showQRPopup, setShowQRPopup] = useState(false); // State for QR code popup
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [reqRating, setReqRating] = useState(0);
    const [description, setDesc] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [postUrl, setPostUrl] = useState('');

    const handleSubmit = async () => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                throw new Error('No JWT token available');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const listingRes = await axios.post(getAddListingURL(), {
                title,
                price,
                req_rating: reqRating,
                description
            }, config);

            const formData = new FormData();

            for (let i = 0; i < imageUrls.length; i++) {
                const imageUrl = imageUrls[i];
                const blob = await fetch(imageUrl).then((response) => response.blob());
                const extension = blob.type.split('/')[1]; // Extract extension from the URL
                const fileName = `listing_pic_${i}.${extension}`; // Unique file name
                const file = new File([blob], fileName);
                formData.append(`listing_pic_${i}`, file, fileName);
            }

            setPostUrl(`http://localhost:3002/listing/info/${listingRes.data.data.listing_id}`);

            const imageRes = await axios.put(`http://localhost:3001/api/listings/addImages/${listingRes.data.data.listing_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setOpen(false);
            setShowQRPopup(true);
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message); // TODO handle error
            } else {
                alert("An error occurred while creating the listing");
            }
        }
    };

    const handleSetImages = (newUrls: string[]) => {
        setImageUrls(prevUrls => [...prevUrls, ...newUrls]);
    };

    const handleRating = (rating: any) => {
        if (rating <= 5) {
            setReqRating(rating);
        }
    }

    return (
        <div>
            <Popup
                open={open}
                modal
                nested
                contentStyle={{
                    borderRadius: '10px', // Apply rounded corners to the popup content
                }}
                trigger={<Button style={{ width: 240, height: 40 }} className="button" onClick={() => setOpen(!open)}>Add new listing</Button>}
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
                            width: "100%",
                            gap: "10px"
                        }}>
                            <div style={{ flex: 3 }}>
                                <TextField value={title} placeholder={"Post title"} onChange={setTitle} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <NumberField value={price} placeholder={"Price"} onChange={setPrice} />
                            </div>
                        </div>
                        <div>
                            <ExtendedTextField value={description} placeholder={"Description"} onChange={setDesc} />
                        </div>
                        <div>
                            <NumberField value={reqRating} placeholder={"Required rating"} onChange={handleRating}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            gap: 10
                        }}>
                            <MultipleImagesUploadButton setImages={handleSetImages} />
                            <Button onClick={handleSubmit}>Create listing</Button>
                        </div>
                    </div>
                </div>
            </Popup>

            <Popup
                open={showQRPopup}
                modal
                nested
                contentStyle={{
                    borderRadius: '10px',
                }}
                onClose={() => setShowQRPopup(false)}
            >
                <div className="modal">
                    <button className="close" onClick={() => setShowQRPopup(false)}>
                        &times;
                    </button>
                    <h1 style={{ textAlign: "center" }}>QR Code</h1>
                    <div style={{ display: 'flex', justifyContent:'center' }}>
                        <QRCode value={postUrl}/>
                    </div>
                </div>
            </Popup>
        </div>
    );
});

export default AddNewListingPopUp;
