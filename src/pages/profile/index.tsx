import React from "react";
import AvatarButton from "../../components/button/AvatarButton";
import BackButton from "../../components/button/BackButton";
import Avatar from "react-avatar";
import Listing from "../../components/listing/Listing";

const ProfilePage = () => {
    let name = "Jeremy Elbertson"
    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {

    }

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
            <div className="profile-picture" style={{
                display:"inline"
            }}>
                <Avatar name={name} size="320" src="https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"/>
            </div>
            <div className="info">
                <p style={{
                    display:"inline"
                }}>{name}</p>
                <div className="listed-parts">
                    <Listing image={"https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"} title={"My part"} price={9} availability={"Available"}></Listing>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;