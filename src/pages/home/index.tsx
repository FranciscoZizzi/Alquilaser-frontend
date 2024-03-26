import React, {useState} from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import TextField from "../../components/textField/TextField";

const HomePage = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    return (
        <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                height: 700,
                width: 360
            }}>
                <h1>
                    Home Page
                </h1>
                <div style={{fontSize: '16px'}}>
                    <TextField placeholder={"test-placeholder"}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage