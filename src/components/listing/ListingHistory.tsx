import React from "react";
import Button from "../button/Button";

const ListingHistory = ({title, startDate, endDate, totalCost} : {
    title: string,
    startDate: string,
    endDate: string,
    totalCost: number
}) => {
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            background:"white",
            borderRadius:30,
            paddingRight:16,
            paddingLeft:16
        }}>
            <div>
                <h3>{title}</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    {startDate} to {endDate}
                </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    Total cost: {totalCost}
                </p>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <Button>Additional Info</Button>
            </div>
        </div>
    );
}

export default ListingHistory;
