import React from "react";
import Button from "../button/Button";

const ListingHistory = ({title, startDate, endDate, totalCost} : {
    title: string,
    startDate: string,
    endDate: string,
    totalCost: number
}) => {
    return(
        <div style={{width:992, display:"flex", flexDirection:"row", justifyContent:"space-between", background:"white"}}>
            <div>
                <h3>{title}</h3>
            </div>
            <div>
                <h3>{startDate} to {endDate}</h3>
            </div>
            <div>
                <h3>Total Cost: {totalCost}</h3>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <Button>Additional Info</Button>
            </div>
        </div>
    );
}

export default ListingHistory;
