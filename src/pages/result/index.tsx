import React, {useEffect, useState} from "react"
import axios from "axios";
import Listing from "../../components/listing/Listing";
import FilterBox from "../../components/filterBox/FilterBox";
import Header from "../../components/header/Header";
import {getSearchURL} from "../../utils/url";
import {Rating} from "react-simple-star-rating";
import Button from "../../components/button/Button";
import {SortAscendingIcon} from "../../components/icons/SortAscendingIcon";
import {SortDescendingIcon} from "../../components/icons/SortDescendingIcon";
import Dropdown from "../../components/dropdown/Dropdown";


const ResultPage = () => {

    const [priceMinFilter, setPriceMinFilter ] = useState<number>()
    const [priceMaxFilter, setPriceMaxFilter ] = useState<number>()
    const [maxRatingFilter, setRatingFilter] = useState(5)
    const [sortAscending, setSortAscending] = useState(true);
    const [sortBy, setSortBy] = useState("title");
    const [sortIcon, setSortIcon] = useState(<SortAscendingIcon width="30" height="30"/>)

    const [results, setResult] = useState([])
    const queryParameters = new URLSearchParams(window.location.search)

    const searchTerm = queryParameters.get("searchTerm");

    const handleClick = async () => {
        const res = await axios.post(getSearchURL(), {}, {params: {priceMinFilter, priceMaxFilter, maxRatingFilter, searchTerm}});
        setResult(res.data);
    }
    console.log(results)

    const bufferToUrl = (image: any) => {
        const buffer = new ArrayBuffer(image.data.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < image.data.length; i++) {
            view[i] = image.data[i];
        }
        const blob = new Blob([buffer], { type: 'image/png' });
        return URL.createObjectURL(blob);
    }

    useEffect(() => {
        axios.post(getSearchURL(), {}, {params: {searchTerm, maxRatingFilter, priceMaxFilter, priceMinFilter}})
            .then(res => setResult(res.data))
    }, [])

    const handleSortByPrice = () => {
        let newSortAscending = sortAscending;
        if (sortBy === "price") {
            newSortAscending = !sortAscending;
            setSortAscending(newSortAscending);
        }
        setSortBy("price");
        if (newSortAscending) {
            results.sort((a: any, b: any) => a.price - b.price);
        } else {
            results.sort((a: any, b: any) => b.price - a.price);
        }
    }

    const handleSortByTitle = () => {
        let newSortAscending = sortAscending;
        if (sortBy === "title") {
            newSortAscending = !sortAscending;
            setSortAscending(newSortAscending);
        }
        setSortBy("title");
        if (newSortAscending) {
            results.sort((a: any, b: any) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
        } else {
            results.sort((a: any, b: any) => a.title.toLowerCase() < b.title.toLowerCase() ? 1: -1);
        }
    }

    const rows: any[] = [];
    results.forEach((e: any) => {
        console.log(e)
        let imageUrl = ''
        if(e.Images.length > 0){
            imageUrl = bufferToUrl(e.Images[0].image_data)
        }
        rows.push(<Listing showEditButton={false} availability={e.listing_state}
                           image={imageUrl}
                           price={e.price} title={e.title} listing_id={e.id}/>)
    })

    return(
        <body>
            <div style={{
                alignItems: "center",
            }}>
                <Header showBackButton={true} showSearchBar={true} showProfileIcon={true}/>

                <div style={{
                    backgroundColor: '#e0f0fd',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"

                }}>
                    <div style={{
                        marginTop: '20px',
                        marginLeft: '50px',
                        alignItems: 'center',
                        width: "70%"
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100vh'
                        }}>
                            <div style={{
                                marginTop: '20px',
                                marginRight: '20px',
                                display: "flex",
                                flexDirection: "column",
                                gap:5
                            }}>
                                <p>Sort by: <strong>{sortBy === "price" ? "Price" : "Title"} {sortAscending ? "(asc)" : "(desc)"}</strong></p>
                                {sortBy === "price" ? <Button style={{backgroundColor: '#003bb3'}} onClick={handleSortByPrice}>Price</Button> : <Button style={{backgroundColor: '#0167f8'}} onClick={handleSortByPrice}>Price</Button>}
                                {sortBy === "title" ? <Button style={{backgroundColor: '#003bb3'}} onClick={handleSortByTitle}>Title</Button> : <Button style={{backgroundColor: '#0167f8'}} onClick={handleSortByTitle}>Title</Button>}
                                <p>Max required rating:</p>
                                <Rating
                                    initialValue={maxRatingFilter}
                                    allowFraction={true}
                                    onClick={setRatingFilter}
                                />
                                <FilterBox minPrice={priceMinFilter} maxPrice={priceMaxFilter} setMinPrice={setPriceMinFilter} setMaxPrice={setPriceMaxFilter} onClick={handleClick}></FilterBox>

                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: "column",
                                width: "100%",
                                gap: '30px',
                            }}>
                                {rows}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default ResultPage;