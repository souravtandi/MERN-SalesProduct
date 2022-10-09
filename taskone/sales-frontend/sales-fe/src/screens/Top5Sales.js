import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from '../config';

const Top5Sales = () => {

    const [sales, setSales] = useState([]);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    };

    useEffect(()=>{

        axios.get(`${API_URL}`+"/top-five-sales", CONFIG_OBJ)
        .then((data)=>{
            setSales(data.data.top5Sales);
        })
        .catch((err)=>{
            console.log(err);
        });

    }, []);

  return (
    <div className='container'>
            <h3 className='text-center text-uppercase pt-4'>Top 5 Sales</h3>
            
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sales Id:</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sale Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                 {   sales.map((data, index)=>{
                    
                        return  <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{data._id}</td>
                                    <td>{data.productName}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.totalAmount.$numberDecimal}</td>
                                </tr>      
                    })
                 
                }
                </tbody>
            </table>
    </div>
  )
}

export default Top5Sales