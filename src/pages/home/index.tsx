import React, {useState} from "react";
import Button from "../../components/button/Button";

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
                    <Button>Test</Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage