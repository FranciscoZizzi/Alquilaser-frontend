import React from "react";
import EditListingPopUp from "../popUp/EditListingPopUp";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import listing from "../../pages/listing";

const Listing = ({showEditButton, listing_id, image, title, price, availability, description}:{
    showEditButton: boolean;
    listing_id: number;
    image: string,
    title: string,
    price: string,
    availability: string,
    description?: string
}) => {
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
                width: "auto",
                maxWidth: "280px" ,
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center'
            }}> <span onClick={handleClick} style={{ cursor: "pointer"}}>
                    <h2 style={{
                        marginBottom: 0,
                        padding: 5,
                        fontSize:30
                    }}>{title}</h2>
                </span>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <p style={{
                        fontSize:24
                    }}>
                        Price: ${price}/day
                    </p>
                    <div style={{
                        justifyContent: "space-between",
                        marginLeft:"100%",
                        paddingBottom: 20
                    }}>
                        <p style={{
                            fontSize:20,
                        }}>
                            Status: {availability}
                        </p>
                        <div>
                            {showEditButton ? <EditListingPopUp listingId={listing_id} title={title} availability={availability}
                                                                description={description ? description : "No description"} rate={price}/> : null
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listing;