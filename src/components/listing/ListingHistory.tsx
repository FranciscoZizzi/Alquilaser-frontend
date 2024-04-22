import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import ExtraInfoPopUp from "../popUp/ExtraInfoPopUp";
import axios from "axios";
import {BASE_URL, PORT} from "../../utils/constants";

const ListingHistory = ({listingId, startDate, endDate, client} : {
    listingId: number,
    startDate: string,
    endDate: string,
    client: string
}) => {
    const [listingData, setListingData] = useState(Object);

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`)
            .then(res => setListingData(res.data))
            .catch(e => alert(e.response.data.message));
    }, []);

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
                <h3>{listingData.title}</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    {startDate.split('T')[0]} to {endDate.split('T')[0]}
                </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    Total cost: {"placeholder"}
                </p>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <ExtraInfoPopUp title={listingData.title} rate={listingData.price} client={client} dateOfReservation={"placeholder"} prevDamage={listingData.damage} finalPrice={"placeholder"} additionalDamage={"placeholder"} />
            </div>
        </div>
    );
}

export default ListingHistory;
