import React, { useEffect, useState } from "react";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import axios from "axios";
import {bool} from "prop-types";
import {useNavigate} from "react-router-dom";


const ValidateEmail = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const handleSubmit = async () => {
        try {
            const res = await axios.put(`http://localhost:3001/api/users/validate_email`, {});
            const id = await axios.get('http://localhost:3001/api/users/get/:id/');
            navigate('/validate_email/' + '1');
        } catch(e: any) {
            console.log(e)
        }
    };

    return (
        <div style = {{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                height: 700,
                width: 360
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                   VALIDATE SDADASD
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    <Button>Validate </Button>
                </div>
            </div>
        </div>
    )
}
export default ValidateEmail