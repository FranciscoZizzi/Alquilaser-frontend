import React, {useState} from "react";
import TextField from "../textField/TextField";
import NumberField from "../numberField/NumberField";
import Button from "../button/Button";
import {number} from "prop-types";
import {createSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";


const  FilterBox = ({minPrice, maxPrice, setMinPrice, setMaxPrice, onClick}: {
    minPrice: number,
    maxPrice: number,
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    onClick: any

}) =>{
    let navigate = useNavigate();
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            gap: '10px',
            backgroundColor:"red",
        }}>
            <h2>Price</h2>
            <div style={{
                display: "flex",
                flexDirection: "column",

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
                <Button onClick={onClick}>Apply Filter</Button>
            </div>
        </div>
    );
}

export default FilterBox