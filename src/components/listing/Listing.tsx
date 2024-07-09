import React, {useState} from "react";
import EditListingPopUp from "../popUp/EditListingPopUp";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import listing from "../../pages/listing";
import {QRCode} from "react-qrcode-logo";
import Popup from "reactjs-popup";
import Button from "../button/Button";

const Listing = ({showEditButton, listing_id, image, title, price, availability, description}:{
    showEditButton: boolean;
    listing_id: number;
    image: string,
    title: string,
    price: string,
    availability: string,
    description?: string
}) => {
    const [showQRPopup, setShowQRPopup] = useState(false);

    let navigate = useNavigate()
    const handleClick = async () => {
        navigate('/listing/'+ listing_id)
    }

    return(
        <div style={{
            backgroundColor: "white",
            height: 168,
            display: "flex",
            flexDirection: "row",
            borderRadius: 30,
            padding: 8
        }}>
            <div>
                <img style={{
                    margin: 8,
                    width: 152,
                    height: 152,
                    borderRadius: 15
                }} src={image? image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zcd-dwhaQPEzwe_fWYDMtVVze35Ad5nMHkSk7nxMpBrOtH3_C0wVTz_z6qkVjtYdydw&usqp=CAU"} alt="Product picture"/>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center'
            }}>
                <div>
                    <span onClick={handleClick} style={{ cursor: "pointer"}}>
                        <h2 style={{
                            marginBottom: 0,
                            padding: 5,
                            fontSize:30
                        }}>{title}</h2>
                    </span>
                </div>
                <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                    <div style={{
                        width:"100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <p style={{
                            padding:0,
                            marginBottom:0,
                            fontSize: 24,
                        }}>
                            Price: ${price}/day
                        </p>
                        <p style={{
                            padding:0,
                            margin:0,
                            fontSize: 24,
                        }}>
                            Status: {availability}
                        </p>
                    </div>
                        <div style={{
                            width:"auto",
                            display: "flex",
                            flexDirection: "column",
                            paddingBottom: 20
                        }}>
                            <div>
                                {showEditButton ?
                                    <div style={{display: "flex", flexDirection: "column", gap:3}}>
                                        <div>
                                            <EditListingPopUp listingId={listing_id} title={title}
                                                              availability={availability}
                                                              description={description ? description : "No description"}
                                                              rate={price}/>
                                        </div>
                                        <div>
                                            <Button variant='secondary' onClick={() => setShowQRPopup(true)}>Show QR
                                                code</Button>
                                        </div>
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
                                                <h1 style={{textAlign: "center"}}>QR Code</h1>
                                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                                    <QRCode value={`http://localhost:3002/listing/info/${listing_id}`}/>
                                                </div>
                                            </div>
                                        </Popup>
                                    </div>
                                    : null
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listing;