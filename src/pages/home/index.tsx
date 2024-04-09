import React, {useState} from "react";
import AvatarButton from "../../components/button/AvatarButton";
import SearchBar from "../../components/searchBar/SearchBar";

const HomePage = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const handleKeyPress = (keyEvent: React.KeyboardEvent<HTMLInputElement>) => {
        if(keyEvent.key === 'Enter') {
            alert(value);
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // TODO take user to profile page
    }

    return (
        <div>
        <div style={{
            height:80,
            backgroundColor:"lightgray",
            display:"flex",
            justifyContent:"right",
        }}>
            <div style={{marginTop:2, marginBottom:2}}>
                <AvatarButton name={"Jeremy Elbertson"} onClick={handleClick} src={"https://hard-drive.net/wp-content/uploads/2023/08/jerma-killer.jpg.webp"}></AvatarButton>
            </div>
        </div>
        <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                marginTop:'25%',
                height: 700,
                width: 360
            }}>
                <SearchBar value={value} onChange={handleChange} onKeyUp={handleKeyPress}></SearchBar>
            </div>
        </div>
        </div>
    );
}

export default HomePage;