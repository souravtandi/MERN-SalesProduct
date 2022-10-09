import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NavBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state=>state.user)
    const logout = () =>{
        sessionStorage.removeItem("token")
        dispatch({type:"LOGOUT"})
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-uppercase" to="/">Sales App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            { user.user.firstName ? '' : <li className="nav-item">
                                <NavLink className="nav-link text-uppercase" to="/login">Login</NavLink>
                            </li>}
                            { user.user.firstName ? <li className="nav-item">
                                <button className="btn btn-primary" onClick={()=>logout()}>Logout</button>
                            </li> : ''}
                            { user.user.firstName ? <li className="nav-item">
                                <NavLink className="nav-link text-uppercase" to="/addUser">Register User</NavLink>
                            </li> : '' }
                            { user.user.firstName ?<li className="nav-item">
                                <NavLink className="nav-link text-uppercase" to="/addSales">Add Sales</NavLink>
                            </li>: '' }
                            { user.user.firstName ?<li className="nav-item">
                                <NavLink className="nav-link text-uppercase" to="/top5Sales">Top 5 Sales</NavLink>
                            </li>: '' }
                            { user.user.firstName ?<li className="nav-item">
                                <NavLink className="nav-link text-uppercase" to="/totalRevenue">Today's total revenue</NavLink>
                            </li>: '' }
                        </ul>
                        <p>{user.user.firstName}</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar