import React, {useState} from "react"
import axios from "axios";
import TextField from "../textField/TextField";
import Button from "../button/Button";

// TODO esto es una copia del register con valores cambiados, hay que hacer un popup como en el screenflow
const ListingForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [damage, setDamage] = useState("");
    const [listingState, setState] = useState("");
    //
    const handleSubmit =  async () => {
        const res = await axios.post("http://localhost:3001/api/listings/add", {title, price, description, damage, listingState})
    }

    return (
        <div style={{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontSize: '16px'
        }}>
            <div style={{
                height: 700,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                    Create Listing
                </h1>

                <TextField value={title} placeholder={"Post title"} onChange={setTitle}/>
                <TextField value={price} placeholder={"Price"} onChange={setPrice}/>
                <TextField value={description} placeholder={"Description"} onChange={setDesc}/>
                <TextField value={damage} placeholder={"Damage"} onChange={setDamage}/>
                {/* TODO paso el state por acá pero se manejaría internamente*/}
                <TextField value={listingState} placeholder={"Listing State"} onChange={setState}/>
                <Button onClick={handleSubmit}>Create listing</Button>
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                </div>
            </div>
        </div>
    )
}
export default ListingForm;