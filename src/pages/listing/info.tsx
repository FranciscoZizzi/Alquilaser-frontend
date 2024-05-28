import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import Listing from "../../components/listing/Listing";
import {theme} from "../../utils/theme";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {BASE_URL, PORT} from "../../utils/constants";
import Avatar from "react-avatar";
import dayjs from "dayjs";
import {start} from "node:repl";
import ListingNotFoundPage from "./error";

const ListingInfoPage = () => {
    const navigate = useNavigate();

    const [listingData, setListingData] = useState(Object);
    const [bookingData, setBookingData] = useState(Object);
    const [userData, setUserData] = useState(Object);
    const [imageUrls, setImageUrls] = useState<any[]>([]);
    const [userImageUrl, setUserImageUrl] = useState('');
    const [listingNotFound, set404] = useState(false);

    const {listingId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            // Get listing data
            let listingRes = await axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`).catch(() => {
                set404(true);
            });
            const listing = listingRes ? listingRes.data : null;
            // Get current active booking
            const bookingRes = await axios.get(BASE_URL + ':' + PORT + `/api/listings/bookings/${listingId}`);
            let bookings: any[] = bookingRes.data;
            let activeBooking: any = null;
            bookings.forEach((booking: any) => {
                let startDate = dayjs(booking.start_date);
                let endDate = dayjs(booking.end_date);
                let currentDate = dayjs();
                if ((startDate.isBefore(currentDate) || startDate.isSame(currentDate)) && (endDate.isAfter(currentDate) || endDate.isSame(currentDate))) {
                    activeBooking = booking;
                }
            });
            // If listing is not booked redirect to listing page
            if (!activeBooking) {
                navigate(`/listing/${listingId}`);
            }
            // Get user data
            const userRes = await axios.get(BASE_URL + ':' + PORT + `/api/users/get/${activeBooking.user_id}`);
            let userData = userRes.data;

            if (userData.profile_pic && userData.profile_pic.data) {
                setUserImageUrl(bufferToUrl(userData.profile_pic));
            }

            setListingData(listing);
            setBookingData(activeBooking);
            setUserData(userData);
        }
        if (!listingId) {
            set404(true);
        }
        fetchData().catch((e)=>console.log(e));
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
    }, [listingData]);

    const bufferToUrl = (image: any) => {
        const buffer = new ArrayBuffer(image.data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < image.data.length; i++) {
            view[i] = image.data[i];
        }
        const blob = new Blob([buffer], { type: 'image/png' });
        return URL.createObjectURL(blob);
    }

    if (listingNotFound) {
        return(<ListingNotFoundPage/>);
    } else
    return (
        <div>
            <Header showBackButton showSearchBar showProfileIcon/>
            <div style={{borderRadius:25, marginLeft:'10%', marginTop:53, backgroundColor:theme.primary300}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:'2.5%'}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Avatar name={userData.name} size="320" src={userImageUrl}/>
                        <h1>{userData.name}</h1>
                        <h1>Rating: {(userData.rating_avg).toPrecision(2)}</h1>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Listing availability={listingData.listing_state} image={imageUrls[0]} listing_id={listingData.id} price={listingData.price} showEditButton={false} title={listingData.title}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingInfoPage;