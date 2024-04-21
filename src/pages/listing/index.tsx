import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL, PORT} from "../../utils/constants";
import Header from "../../components/header/Header";
import {theme} from "../../utils/theme";
import Listing from "../../components/listing/Listing";
import src from "*.jpg";
import Button from "../../components/button/Button";


const ListingPage = () => {
    const [listingData, setListingData] = useState(Object)
    const {listingId} = useParams();
    //TODO add images from the listing itself
    const image = "https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"
    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`)
            .then(res => setListingData(res.data))
            .catch((e) => alert(e.response.data.message))
    }, []);

    return (
        <div className="body">
            <Header showBackButton={true} showSearchBar={true} showProfileIcon={true}/>
            <div style={{
                background: theme.primary300,
                display: "flex",
                flexDirection: "row",
                marginTop: 40,
                marginLeft: "2.5%",
                width: "90%",
                padding: "2.5%",
            }}>
                <div className="content" style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                }}>
                    <div className="main-content" style={{
                        display: "flex",
                    }}>
                        <div className="pictures">
                            {/*TODO componente para las fotos*/}
                        </div>
                        <div className="main-picture">
                            <p><img style={{
                                margin:10,
                                width: 500,
                                height: 500,
                            }} src={image} alt="Product picture"/></p>
                        </div>

                        <div className="info-column" style={{
                            marginLeft: '50px'
                        }}>
                            <div className="title">
                                <h1>{listingData.title}</h1>
                            </div>
                            <div className="publisher">
                                <p>{listingData.owner}</p>
                            </div>
                            <div className="price">
                                <h2>{listingData.price}$/day</h2>
                            </div>
                            <div className="availability">
                                <p>{listingData.listing_state}</p>
                            </div>
                            <div>
                                {/*TODO componente calendario*/}
                            </div>
                            <Button>Make reservation</Button>
                        </div>
                    </div>
                    <div className="description">
                        <p>{listingData.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListingPage;