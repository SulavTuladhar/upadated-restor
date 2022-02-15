/* functional component */
import './Header.components.css';
import { withRouter } from 'react-router-dom';


const HeaderComponent = (props)=>{
    const currentUser = JSON.parse(localStorage.getItem('user'))
    let content = props.isLoggedIn
        ?   <ul className="container mt-2 d-flex align-items-center justify-content-between">
                <h3 className="logo"> Restro </h3> 
                <h3 className='username'> Hi, {currentUser.username} </h3>
            </ul>
        :   <ul className="nav-list container">
                <li className="nav-logo"><h3 className="logo"> Restro </h3> </li>
                <div className="side-nav">
                <li className="nav-item">About us</li>
                <li className="nav-item">Menu</li>
                <li className="nav-item">Contacts</li>
                </div>
            </ul>
    return(
        <div className="nav-bar">

            {content}

        </div>
    )
}

export const Header = withRouter(HeaderComponent) 