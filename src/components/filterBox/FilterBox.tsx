import React, {useState} from "react";
import TextField from "../textField/TextField";
import NumberField from "../numberField/NumberField";
import Button from "../button/Button";
import {number} from "prop-types";
import {createSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";


const  FilterBox = ({minPrice, maxPrice, setMinPrice, setMaxPrice}: {
    minPrice: number,
    maxPrice:number,
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;

}) =>{
    let navigate = useNavigate();
    const handleClick = async (clickPress: React.MouseEvent<HTMLButtonElement> )=> {
        const res = axios.post("http://localhost:3001/api/search", {minPrice, maxPrice})
        navigate(0)
    }
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            gap: '11px'
        }}>
            <h2>Price</h2>
            <div style={{
                display: "flex",
                flexDirection: "row",

            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: '10px',
                    width:"100%",
                }}>
                    <NumberField value={minPrice} placeholder={'Min'} onChange={setMinPrice}></NumberField>
                    <NumberField value={maxPrice} placeholder={'Max'} onChange={setMaxPrice}></NumberField>
                </div>
            </div>

            <Button style={{width: "100%"}} onClick={handleClick}> Apply filter</Button>
        </div>
    );
}

export default FilterBox