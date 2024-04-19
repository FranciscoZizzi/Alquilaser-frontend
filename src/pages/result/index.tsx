import React, {useEffect, useState} from "react"
import axios, {AxiosResponse} from "axios";
import Listing from "../../components/listing/Listing";

import { JSX } from "react/jsx-runtime";
import {theme} from '../../utils/theme'
import SearchBar from "../../components/searchBar/SearchBar";
import {createSearchParams, useNavigate} from "react-router-dom";
import FilterBox from "../../components/filterBox/FilterBox";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import Header from "../../components/header/Header";


const ResultPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)

    const searchTerm = queryParameters.get("searchTerm");
    const minPrice = queryParameters.get("min");
    const maxPrice = queryParameters.get("max");

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const [results, setResult] = useState([])

    let navigate = useNavigate();

    const handleClick = async () => {
        if (searchTerm) {
            navigate({
                pathname: "",
                search: `?${createSearchParams({
                    searchTerm,
                    min: min.toString(),
                    max: max.toString()
                })}`
            });
        }
    }

    useEffect(() => {
        axios.post("http://localhost:3001/api/search", {searchTerm, min: minPrice, max: maxPrice})
            .then(res => setResult(res.data))
    }, [])

    const rows: any[] = [];
    results.forEach((e: any) => rows.push(<Listing availability={e.listing_state}
                                                   image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"}
                                                   price={e.price} title={e.title}/>))
    return (
        <body>
        <div style={{
            alignItems: "center"
        }}>
            <Header showBackButton={true} showSearchBar={true} showProfileIcon={true}></Header>

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
                            marginRight: '20px'
                        }}>
                            <FilterBox minPrice={min} maxPrice={max} setMinPrice={setMin} setMaxPrice={setMax}
                                       onClick={handleClick}></FilterBox>
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