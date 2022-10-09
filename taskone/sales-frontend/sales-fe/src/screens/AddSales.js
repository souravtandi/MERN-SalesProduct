import React, { useState } from 'react';
import axios from 'axios';

import {API_URL} from '../config';

function AddSales() {

    const [pname, setPname] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);

    const [msg, setMsg] = useState("");

    const submitSales = (event)=>{
        event.preventDefault();
        console.log(pname);
        console.log(quantity);
        console.log(amount);

        const request = { name: pname, quantity, amount };

        const CONFIG_OBJ = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        };



        axios.post(`${API_URL}`+"/store-product-sale", request, CONFIG_OBJ)
        .then((data)=>{
            if(data){
                setMsg("Sales added successfully");
            }
        })
        .catch((err)=>{
            console.log(err);
            setMsg("Sales cannot be added try later!");
        });
    }

  return (
    <div className='container'>
            <h3 className='text-center text-uppercase pt-4'>Add Sale Entry</h3>
            <h4>{msg}</h4>
            <div className='mx-auto contact-form-container text-muted shadow-sm rounded p-3 lh-2'>
                <form onSubmit={(event)=>submitSales(event)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input onChange={(event)=>setPname(event.target.value)} type="text" className="form-control" id="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input onChange={(event)=>setQuantity(event.target.value)} type="number" className="form-control" id="quantity" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input onChange={(event)=>setAmount(event.target.value)} type="number" className="form-control" id="amount" required/>
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
            </div>
        </div>
  )
}

export default AddSales