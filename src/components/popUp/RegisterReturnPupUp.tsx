import React, { useState, useEffect, forwardRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popUpStyle.css';
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import NumberField from "../numberField/NumberField";
import Dropdown from "../dropdown/Dropdown";
import dayjs from "dayjs";
import {BASE_URL, PORT} from "../../utils/constants";
import {Rating} from "react-simple-star-rating";

const RegisterReturnPopUp = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [bookingTitles, setBookingTitles] = useState([""]);
    const [selectedOption, setSelected] = useState<string | undefined>(undefined);
    const [activeBookings, setBookings] = useState<any[]>([]);
    const [price, setPrice] = useState(0);
    const [userRating, setUserRating] = useState();
    const [extraFees, setFees] = useState();
    const [damage, setDamage] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    useEffect(() => {
        const getActiveBookings = async () => {
            setDisableSubmit(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No JWT token available');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const rentsRes = await axios.get("http://localhost:3001/api/users/rents", config);
            if (!rentsRes.data || !rentsRes.data.data) {
                throw new Error('No user profile data available');
            }
            let bookings: any[] = rentsRes.data.data.rents;
            let activeBookings: any[] = [];
            let currentDate = dayjs();
            bookings.forEach((booking: any) => {
                if (dayjs(booking.start_date).isBefore(currentDate) && !booking.returned) {
                    activeBookings.push(booking);
                }
            });

            const listingRes = await axios.get("http://localhost:3001/api/users/listings", config);
            if (!listingRes.data || !listingRes.data.data) {
                throw new Error('No user listing data available');
            }
            let listings: any[] = listingRes.data.data.listings;

            let bookingTitles: string[] = [];
            activeBookings.forEach((booking: any) => {
                listings.forEach((listing: any) => {
                    if (listing.id == booking.listing_id) {
                        bookingTitles.push(listing.title);
                    }
                })
            })
            calculatePrice(bookingTitles[0], activeBookings);
            setBookingTitles(bookingTitles);
            //setSelected(bookingTitles[0]);
            setBookings(activeBookings);
            if (bookingTitles[0] === "") {
                setDisableSubmit(true);
            } else {
                setDisableSubmit(false);
            }

        }
        getActiveBookings().catch((e:any) => {
            console.log(e);
            setDisableSubmit(false);
        });
    }, []);

    const calculatePrice = (bookingTitle: string, activeBookings: any[]) => {
        // TODO calculate price using also current date
        let selectedBooking: any = activeBookings[0];
        for (let i = 0; i < bookingTitles.length; i++) {
            if (bookingTitles[i] === bookingTitle) {
                selectedBooking = activeBookings[i];
            }
        }
        if (!selectedBooking) {
            return null;
        }
        let rate = selectedBooking.price;
        let bookedDays = dayjs(selectedBooking.end_date).diff(selectedBooking.start_date, "day");
        setPrice(rate * bookedDays);
    }

    const handleChange = (e: any) => {
        setSelected(e);
        calculatePrice(e, activeBookings);
    }

    const handleRating = (rating: any) => {
        if (rating <= 5) {
            setUserRating(rating);
        }
    }

    const handleSubmit = async () => {
        setDisableSubmit(true);
        if (!userRating) {
            alert("user rating missing"); // TODO handle error
            return;
        }
        if (!selectedOption){
            alert("select a booking")
            return
        }
        try {
            let selectedBooking: any;
            selectedBooking = activeBookings[bookingTitles.indexOf(selectedOption)];
            let data = {
                bookingId: selectedBooking.id,
                extraFees: extraFees,
                finalDamage: damage,
                userRating: userRating
            }
            window.location.reload()
            await axios.post(BASE_URL + ':' + PORT + "/api/bookings/return", data);
            setDisableSubmit(false);
        } catch (e: any) {
            setDisableSubmit(false);
            if (e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
            } else {
                console.log("An error occurred while registering the return");
            }
        }
    };
    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    }
    const dismissHandler = (e: any): void => {
        if (e.currentTarget === e.target) {
            setShowDropDown(false);
        }
    };

    return (
        <div>
            <Popup
                open={open}
                modal
                nested
                contentStyle={{
                    borderRadius: '10px', // Apply rounded corners to the popup content
                }}
                trigger={<Button style={{ width: 240, height: 40 }} className="button" onClick={() => {setOpen(!open)}}>Register return</Button>}
            >

                <div className="modal">
                    <button className="close" onClick={() => setOpen(!open)}>
                        &times;
                    </button>
                    <div className="actions">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            width: "100%",
                            gap: "10px"
                        }}>
                            <div>
                                <button style={{width: '90%'}}
                                    className={showDropDown ? "active" : undefined}
                                    onClick={(): void => toggleDropDown()}
                                    onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                                        dismissHandler(e)
                                    }>
                                    <div>{selectedOption !== undefined ? selectedOption : "Select Booking"}</div>
                                    {showDropDown && (
                                        <Dropdown
                                            options={bookingTitles}
                                            showDropDown={false}
                                            toggleDropDown={(): void => toggleDropDown()}
                                            onChange={handleChange}
                                        />
                                    )}
                                </button>
                            </div>
                            {selectedOption ?
                            <div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    width: "100%",
                                    gap: "10px"
                                }}>
                                    <p style={{fontSize:16}}>User rating:</p>
                                    <Rating
                                        initialValue={userRating}
                                        allowFraction={true}
                                        onClick={handleRating}
                                    />
                                </div>
                                <div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        width: "100%",
                                        gap: "10px"
                                    }}>
                                        <div style={{flex: 1}}>
                                            <NumberField value={extraFees} placeholder={"Additional Fees"}
                                                         onChange={setFees}/>
                                        </div>
                                        <div style={{flex: 3}}>
                                            <TextField value={damage} placeholder={"Damage Description"}
                                                       onChange={setDamage}/>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        width: "100%",
                                        gap: "10px"
                                    }}>
                                        <h3 style={{paddingTop: 10}}>Booking Price: ${price}</h3>
                                        <h3 style={{paddingTop: 10}}>+</h3>
                                        <h3 style={{paddingTop: 10}}>Extra Fees: ${extraFees ? extraFees : 0}</h3>
                                        <h3 style={{paddingTop: 10}}>=</h3>
                                        <h1>Final Price: ${+price + +(extraFees == null ? 0 : extraFees)}</h1>
                                    </div>
                                </div>
                            </div> : null }
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            gap: 10
                        }}>
                            <Button onClick={handleSubmit} disabled={disableSubmit}>Register return</Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
});

export default RegisterReturnPopUp;
