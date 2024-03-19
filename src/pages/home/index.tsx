import React, {useState} from "react";
import SearchBar from "../../components/searchBar/SearchBar";

const HomePage = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    return (
        <div style = {{
            height: 144,
            fontSize: '40px'
        }}>
            Home Page
            <div>
                <SearchBar value={value} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default HomePage