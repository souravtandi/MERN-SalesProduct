import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {API_URL} from '../config'

function Login() {

    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Login = (event) => {
        event.preventDefault();
        const request = { email, password };
        axios.post(`${API_URL}`+ "/login" , request)
        .then((data)=>{
            if(data){
                sessionStorage.setItem('token', data.data.token)
                dispatch({type: "APISUCCESS", payload: data.data.user})
                navigate("/addSales")
            }
        })
        .catch((err)=>{
            dispatch({type: "APIERROR"})
        })

    }

    return (
        <div className='container'>
            <h3 className='text-center'>Login Here</h3>
            <form onSubmit={(event)=>Login(event)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                    <input onChange={(event)=>setEmail(event.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(event)=>setPassword(event.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login