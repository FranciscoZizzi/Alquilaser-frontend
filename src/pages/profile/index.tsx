import React from "react";
import AvatarButton from "../../components/button/AvatarButton";
import BackButton from "../../components/button/BackButton";
import Avatar from "react-avatar";
import Listing from "../../components/listing/Listing";
import ListingHistory from "../../components/listing/ListingHistory";
import Button from "../../components/button/Button";

const ProfilePage = () => {
    let name = "Jeremy Elbertson"
    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {

    }
    // TODO agregar función a los botones

    return(
        <div>
            <div className="header" style={{
                height:80,
                backgroundColor:"lightgray",
                display:"flex",
                justifyContent:"space-between",
            }}>
                <div style={{
                    marginLeft:15,
                    marginTop: 10
                }}>
                    <BackButton onClick={handleBackButtonClick}></BackButton>
                </div>
                <div style={{marginTop:2, marginBottom:2}}>
                    <AvatarButton name={name} onClick={handleAvatarClick} src={"https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"}></AvatarButton>
                </div>
            </div>
            <div style={{background:"lightgray", display:"flex", flexDirection:"row", marginTop:53, marginLeft:"2.5%", width:"90%", padding:"2.5%"}}>
                <div className="profile-picture">
                    <Avatar name={name} size="320" src="https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"/>
                </div>
                <div className="info" style={{marginLeft:30}}>
                    <h1>{name}</h1>
                    <div className="listed-parts">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <h1>Listed Parts:</h1>
                            <div style={{display: "flex", flexDirection:'column', justifyContent: "center"}}>
                                <Button style={{width: 240, height: 41}}>Add new listing</Button>
                            </div>
                        </div>
                        <Listing image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"}
                                 title={"My part"} price={9} availability={"Available"}></Listing>
                    </div>
                    <div className="Rent-history">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <h1>Rent History:</h1>
                            <div style={{display:"flex", flexDirection:'column', justifyContent: "center"}}>
                                <Button style={{width: 240, height: 41}}>Register return</Button>
                            </div>
                        </div>
                        <ListingHistory title={"My Part"} startDate={"10/10/10"} endDate={"11/10/10"} totalCost={25}/>
                    </div>
                    <div className="Rented-history">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <h1>Rented History:</h1>
                        </div>
                        <ListingHistory title={"My Part"} startDate={"10/10/10"} endDate={"11/10/10"} totalCost={25}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;