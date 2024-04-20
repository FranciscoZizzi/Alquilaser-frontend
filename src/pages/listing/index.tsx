import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";

const ListingPage = () => {
    const [listingData, setListingData] = useState({})
    const {listingId} = useParams();

    useEffect(() => {
        axios.post("url", {listingId})
            .then(res => setListingData(res.data))
    }, [])

    return(
        <body>
            <div className="content">
                <div className="main-content">
                    <div className="pictures">
                        {/*TODO componente para las fotos*/}
                    </div>
                    <div className="info-column">

                        {/*TODO componente calendario*/}
                    </div>
                </div>
                <div className="description">

                </div>
            </div>
        </body>
    )
}