import React, {useState} from "react";
import Button from "../../components/button/Button";
import AvatarButton from "../../components/button/AvatarButton";
import SearchBar from "../../components/searchBar/SearchBar";

const HomePage = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {

    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
                <SearchBar value={"Search part by code or title"} onChange={handleSubmit}></SearchBar>
            </div>
        </div>
        </div>
    )
}

export default HomePage