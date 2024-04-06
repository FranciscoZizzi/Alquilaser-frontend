import React from "react";
import Button from "../button/Button";

const Listing = ({image, title, price, availability}:{
    image: string,
    title: string,
    price: number,
    availability: string
}) => {
    return(
        <div style={{
            background: "aliceblue",
            height: 168,
            width: 992,
            display: "flex",
            flexDirection: "row"
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
            }}>
                <h2 style={{
                    marginBottom: 0,
                    padding: 5,
                }}>{title}</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <p>Price: ${price}/day</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}>
                        <p>{availability}</p>
                        <Button style={{width:304}}>Edit</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Listing;