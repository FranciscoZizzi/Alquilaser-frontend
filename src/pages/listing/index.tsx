import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL, PORT} from "../../utils/constants";
import Header from "../../components/header/Header";

const ListingPage = () => {
    const [listingData, setListingData] = useState(Object)
    const [listingOwner, setOwner] = useState(Object);
    const {listingId} = useParams();

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`)
            .then(res => setListingData(res.data))
            .catch((e) => alert(e.response.data.message))
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/users/get/${listingData.user_id}`)
            .then(res => setOwner(res.data))
            .catch((e) => alert(e.response.data.message))
    }, []);

    return(
        <div className="body">
            <Header showBackButton={true} showSearchBar={true} showProfileIcon={true}/>
            <div className="content">
                <div className="main-content">
                    <div className="pictures">
                        {/*TODO componente para las fotos*/}
                    </div>
                    <div className="info-column">
                        <div className="title">
                            <h1>{listingData.title}</h1>
                        </div>
                        <div className="publisher">
                            <h2>{listingOwner.name}</h2>
                        </div>
                        <div className="availability">
                            <p>{listingData.listing_state}</p>
                        </div>
                        {/*TODO componente calendario*/}
                    </div>
                </div>
                <div className="description">
                    <p>{listingData.description}</p>
                </div>
            </div>
        </div>
    )
}
export default ListingPage;