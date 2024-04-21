import React from "react";
import EditListingPopUp from "../popUp/EditListingPopUp";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import listing from "../../pages/listing";

const Listing = ({listing_id,image, title, price, availability, description}:{
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
            background: "white",
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
                }} src={image} alt="Product picture"/>
            </div>
            <div style={{
                width: 800,
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}>
                        <p style={{
                            fontSize:20,
                            textAlign:"center"
                        }}>
                            Status: {availability}
                        </p>
                        <EditListingPopUp title={title} availability={availability} description={description ?? "No description"} rate={price}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Listing;