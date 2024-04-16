import React, {useEffect, useState} from "react"
import axios, {AxiosResponse} from "axios";
import Listing from "../../components/listing/Listing";
import { JSX } from "react/jsx-runtime";

const ResultPage = () => {
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
        <h1>Results</h1>
            {rows}
        </body>
    )
}

export default ResultPage;