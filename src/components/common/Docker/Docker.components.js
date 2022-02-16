import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Docker.components.css';

class DockerHere extends Component {
  render() {
    const logout = () => {
        localStorage.clear(); // Clearing local storage
        this.props.history.push('/login'); // Navigation to Login Page
      }
    return(          
        <>
        <div className="container-fluid position-here">
            <div className="container d-flex justify-content-center">
              <div className="row docker pt-1 pb-1 col-12 col-lg-8"  style={{backgroundColor: "#cdb4db"}}>
                <span> <img src="./images/home-icon.svg" alt="home-icon"/> </span>
                <span> <img src="./images/search-icon.svg" alt="search-icon"/> </span>
                {
                    this.props.ProductForm 
                        ? <span> <Link to="/dashboard"> <img src="./images/back-icon.svg" alt="add-icon"/> </Link> </span>
                        : <span> <Link to="/add-product"> <img src="./images/add-icon.svg" alt="add-icon"/> </Link> </span>
                }
                <span> <img src="./images/setting-icon.svg" alt="settings-icon"/> </span>
                <span onClick={()=>logout()}> <img src="./images/logout-icon.svg" alt="logout-icon"/> </span>
              </div>
            </div>
        </div>
    </>

)
  }
}
const Docker = withRouter(DockerHere);
export default Docker;
