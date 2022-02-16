import React from "react";
import './auth.header.css'

export const AuthHeader = (props) =>{

    return(
        <div className="header">
            <h3 className="logo"> Chatta Mitho </h3>
            <div className="space-between"></div>
            <h5 className="header-side-text"> Not Admin? <a href="/"> Go Back </a> </h5>
        </div>
    )

}