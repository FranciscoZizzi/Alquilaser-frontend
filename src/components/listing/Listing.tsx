import React from "react";
import "./ListingStyles.css";
import Button from "../button/Button";

const Listing = ({image, title, price, availability}:{
    image: string,
    title: string,
    price: number,
    availability: string
}) => {
    const style = {
    }
    return(
        <div className="listing">
            <div className="listing-image">
                <img src={image} alt="Product picture"/>
            </div>
            <div className="listing-info">
                <h2>{title}</h2>
                <div className="price-and-avail">
                    <p className="price">Price: ${price}/day</p>
                    <div className="avail-and-button">
                        <p className="avail">{availability}</p>
                        <Button style={{width:304}}>Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listing;