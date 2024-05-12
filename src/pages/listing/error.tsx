import React from 'react';
import Header from "../../components/header/Header";

const ListingNotFoundPage = () => {
    return(
        <div>
            <Header showBackButton={true} showSearchBar={true} showProfileIcon={true}/>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"10%"}}>
                <h2>Listing not found</h2>
                <a href="/">Return to home page</a>
            </div>
        </div>
    )
}

export default ListingNotFoundPage;