import React, {useEffect, useState} from "react"
import axios from "axios";
import Listing from "../../components/listing/Listing";
import FilterBox from "../../components/filterBox/FilterBox";
import Header from "../../components/header/Header";
import {getSearchURL} from "../../utils/url";


const ResultPage = () => {

    const [priceMinFilter, setPriceMinFilter ] = useState<number>()
    const [priceMaxFilter, setPriceMaxFilter ] = useState<number>()

    const [results, setResult] = useState([])
    const queryParameters = new URLSearchParams(window.location.search)

    const searchTerm = queryParameters.get("searchTerm");

    const handleClick = async () => {
        if (searchTerm){
            const res = await axios.post(getSearchURL(), {searchTerm}, {params: {priceMinFilter, priceMaxFilter}});
            return setResult(res.data);
        }
        window.location.reload();
    }

    useEffect(() => {
        axios.post(getSearchURL(), {searchTerm})
            .then(res => setResult(res.data))
    }, [])

    const rows: any[] = [];
    results.forEach((e: any) => rows.push(<Listing availability={e.listing_state}
                                                   image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"}
                                                   price={e.price} title={e.title} listing_id={e.id}/>))
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
                                flexDirection: "row"
                            }}>
                                <FilterBox minPrice={priceMinFilter} maxPrice={priceMaxFilter} setMinPrice={setPriceMinFilter} setMaxPrice={setPriceMaxFilter} onClick={handleClick}></FilterBox>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: "column",
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