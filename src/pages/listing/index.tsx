import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {BASE_URL, PORT} from "../../utils/constants";
import Header from "../../components/header/Header";
import BookingDatePicker from "../../components/datePicker/BookingDatePicker";
import Button from "../../components/button/Button";
import {Dayjs} from "dayjs";
import {theme} from "../../utils/theme";
import { Slider } from "reactjs-simple-slider";
import ListingNotFoundPage from "./error";
import { Rating } from 'react-simple-star-rating';

const ListingPage = () => {
    const [listingData, setListingData] = useState(Object)
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();
    const [imageUrls, setImageUrls] = useState<any>([]);
    const [additionalInfo, setInfo] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [listingNotFound, set404] = useState(false);

    const {listingId} = useParams();

    useEffect(() => {
        const fetchListingData = async () => {
            const res = await axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`);
            setListingData(res.data);
        };

        fetchListingData().catch(() => set404(true));
    }, []);

    useEffect(() => {
        if (listingData && listingData.images) {
            setImageUrls(listingData.images.map((image: { data: { length: number; data: string | any[]; }; }) => {
                const buffer = new ArrayBuffer(image.data.data.length);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < image.data.data.length; i++) {
                    view[i] = image.data.data[i];
                }
                const blob = new Blob([buffer], { type: 'image/png' });
                return URL.createObjectURL(blob);
            }));
        }
    }, [listingData, additionalInfo]);


    console.log(imageUrls)

    const handleClick = (event: any) => {
        setLoading(true)
        let token = localStorage.getItem('token');
        axios.post(BASE_URL + ':' + PORT + '/api/bookings/add',
            {listingId, startDate, endDate},
            {headers: { authorization: "Bearer " + token}})
            .then(() => {
                setStartDate(null);
                setEndDate(null);

                setLoading(false);
                setInfo("booking successfully created");
            }
            )
            .catch((e) => {
                setLoading(false);
                setInfo(e.response.data.message);
            })
    }

    if (listingNotFound) {
        return(<ListingNotFoundPage/>)
    }
    return(
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
                borderRadius: 30
            }}>
                <div className="content" style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                }}>
                    <div className="main-content" style={{
                        display: "flex",
                    }}>
                        <div style={{width:500, height: 500}}>
                            <Slider
                                objectFit="contain"
                                images={imageUrls}
                            />
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
                                <p>Required rating:</p>
                                <Rating
                                    initialValue={listingData.req_rating}
                                    readonly={true}
                                    allowFraction={true}
                                />
                            </div>
                            <div className="date-picker">
                                <BookingDatePicker listingId={listingId} maxBookDuration={60} startDate={startDate} endDate={endDate} handleSetStartDate={setStartDate} handleSetEndDate={setEndDate} disabled={isLoading}/>
                            </div>
                            <div>
                                <Button onClick={handleClick} disabled={isLoading}>{isLoading ? "Loading" : "Make Reservation"}</Button>
                                <p>{additionalInfo}</p>
                            </div>
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