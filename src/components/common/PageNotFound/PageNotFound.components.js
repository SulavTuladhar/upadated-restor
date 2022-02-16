import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = (props)=>{
    

    console.log(props)
    return(
        <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center'}}>
                <h1> Page Not Found!! </h1>
                <Link to="/"> <button className="btn btn-primary"> Go Back To Homepage </button> </Link>
        </div>
    )
}
export const PageNotFound = withRouter(NotFound)
