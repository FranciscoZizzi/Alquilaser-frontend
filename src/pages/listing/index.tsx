import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL, PORT} from "../../utils/constants";
import Header from "../../components/header/Header";
import BookingDatePicker from "../../components/datePicker/BookingDatePicker";
import Button from "../../components/button/Button";
import {Dayjs} from "dayjs";

const ListingPage = () => {
    const [listingData, setListingData] = useState(Object)
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();

    const {listingId} = useParams();

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`)
            .then(res => setListingData(res.data))
            .catch((e) => alert(e.response.data.message))
    }, []);

    const handleClick = () => {
        let token = localStorage.getItem('token');
        axios.post(BASE_URL + ':' + PORT + '/api/bookings/add',
            {listingId, startDate, endDate},
            {headers: { authorization: "Bearer " + token}})
            .then(() => {
                    alert("booking successfully created");
                    window.location.reload();
                }
            )
            .catch((e) => alert(e.response.data.message))
    }

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
                            <p>{listingData.owner}</p>
                        </div>
                        <div className="price">
                            <h2>{listingData.price}$/day</h2>
                        </div>
                        <div className="availability">
                            <p>{listingData.listing_state}</p>
                        </div>
                        <div className="date-picker">
                            <BookingDatePicker listingId={listingId} maxBookDuration={60} startDate={startDate} endDate={endDate} handleSetStartDate={setStartDate} handleSetEndDate={setEndDate}/>
                            <Button onClick={handleClick}>Make Reservation</Button>
                            {/*TODO componente calendario*/}
                        </div>
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