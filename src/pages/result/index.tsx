import React, {useEffect, useState} from "react"
import axios, {AxiosResponse} from "axios";
import Listing from "../../components/listing/Listing";

import { JSX } from "react/jsx-runtime";
import {theme} from '../../utils/theme'
import SearchBar from "../../components/searchBar/SearchBar";
import {createSearchParams, useNavigate} from "react-router-dom";
import FilterBox from "../../components/filterBox/FilterBox";


const ResultPage = () => {
    //TODO add searchbar
    const [Min, setMin ] = useState(0)
    const [Max, setMax ] = useState(0)

    const [results, setResult] = useState([])
    const queryParameters = new URLSearchParams(window.location.search)

    const searchTerm = queryParameters.get("searchTerm");

    useEffect(() => {
        axios.post("http://localhost:3001/api/search", {searchTerm})
            .then(res => setResult(res.data))
    }, [])

    const rows: any[] = [];
    results.forEach((e: any) => rows.push(<Listing availability={e.listing_state} image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"} price={e.price} title={e.title}/>))
    return(
        <body>
            <div style={{
                alignItems: "center"
            }}>
                <div className="header" style={{
                    height: 80,
                    backgroundColor: theme.primary500,
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        marginLeft: 15,
                        marginTop: 10
                    }}>
                        <h1>Results</h1>
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#e0f0fd',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"

                }}>
                    <div style={{
                        marginTop: '2%',
                        marginLeft: '20%',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100vh'
                        }}>
                            <div style={{
                                marginTop: '2%',
                                marginRight: '2%'
                            }}>
                                <FilterBox minPrice={Min} maxPrice={Max} setMinPrice={setMin} setMaxPrice={setMax}></FilterBox>
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