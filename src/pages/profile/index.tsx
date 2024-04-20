import React, {useState} from "react";
import Avatar from "react-avatar";
import Listing from "../../components/listing/Listing";
import ListingHistory from "../../components/listing/ListingHistory";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import AddNewListingPopUp from "../../components/popUp/AddNewListingPopUp";
import {theme} from '../../utils/theme'
import {BackArrowIcon} from "../../components/icons/BackArrowIcon";
import IconButton from "../../components/iconButton/IconButton";
import ImageButton from "../../components/imageButton/ImageButton";
import ImageUploadButton from "../../components/imageUploadButton/ImageUploadButton";

const ProfilePage = () => {
    let name = "Jeremy Elbertson"
    let navigate = useNavigate();
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        navigate(-1)
    }
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const addListing = () => {
        let path = '/listing-form';
        navigate(path);
    }

    return(
        <div>
            <div className="header" style={{
                height:80,
                backgroundColor:theme.primary500,
                display:"flex",
                justifyContent:"space-between",
            }}>
                <div style={{
                    marginLeft:15,
                    marginTop: 10
                }}>
                    <IconButton icon={<BackArrowIcon/>} onClick={handleBackButtonClick}></IconButton>
                </div>
                <div style={{marginTop:2, marginBottom:2}}>
                    <ImageButton imageURL={"PLACE_USER_IMAGE_URL"}/>
                </div>
            </div>
            <div style={{background:theme.primary300, display:"flex", flexDirection:"row", marginTop:53, marginLeft:"2.5%", width:"90%", padding:"2.5%"}}>
                <div style={{
                    width: 320,
                    display: 'flex',
                    flexDirection: "column",
                    gap: 10
                }}>
                    <Avatar name={name} size="320" src={fileUrl}/>
                    <ImageUploadButton setImage={setFileUrl}/>
                </div>
                <div className="info" style={{marginLeft:30}}>
                    <h1>{name}</h1>
                    <div className="listed-parts">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <h1>Listed Parts:</h1>
                            <div style={{display: "flex", flexDirection:'column', justifyContent: "center"}}>
                                <AddNewListingPopUp/>
                            </div>
                        </div>
                        <Listing image={"https://ilcadinghy.es/wp-content/uploads/2020/04/barco-ilca-7-laser-completo.jpg"}
                                 title={"My part"} price={"9"} availability={"Available"} description={"test description"}></Listing>
                    </div>
                    <div className="Rent-history">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <h1>Rent History:</h1>
                            <div style={{display:"flex", flexDirection:'column', justifyContent: "center"}}>
                                <Button style={{width: 240, height: 40}}>Register return</Button>
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