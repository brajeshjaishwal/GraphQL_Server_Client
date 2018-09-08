import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { NavLink } from 'react-router-dom'

const AuthHeader = 
            <div className="ui four item menu">
                    <NavLink className="item" activeClassName="active" exact to = "/" >Home</NavLink>
                    <NavLink className="item" activeClassName="active" exact to = "/Blogs">Blogs</NavLink>
                    <NavLink className="item" activeClassName="active" exact to = "/Login" >Login</NavLink>
                    <NavLink className="item" activeClassName="active" exact to = "/Register" >Logout</NavLink>
            </div>

const NoAuthHeader =  
            <div className="ui four item menu">
                <NavLink className="item" activeClassName="active" exact to = "/" >Home</NavLink>
                <NavLink className="item" activeClassName="active" exact to = "/Blogs">Blogs</NavLink>
                <NavLink className="item" activeClassName="active" exact to = "/Login" >Login</NavLink>
                <NavLink className="item" activeClassName="active" exact to = "/Register" >Register</NavLink>
            </div>
const AppHeader = (authenticated) => NoAuthHeader

export default AppHeader