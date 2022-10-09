import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from '../config';

function TotalRevenue() {
    const [revenue, setRevenue] = useState();

    useEffect(()=>{

        axios.get(`${API_URL}`+"/get-todays-revenue")
        .then((data)=>{
            setRevenue(data.data.totalRevenueToday);
        })
        .catch((err)=>{
            console.log(err);
        });

    }, []);

  return (
    <div className='container'>
        <h3 className='text-center text-uppercase pt-4'>Today's revenue is {revenue}</h3>   
    </div>
  )
}

export default TotalRevenue