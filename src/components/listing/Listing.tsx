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
            }}>
                <h2 style={{
                    marginBottom: 0,
                    padding: 5,
                    fontSize:30
                }}>{title}</h2>
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
                        <Button style={{width:304}}>Edit</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Listing;