/* functional component */
import './Header.components.css';
import { Link, withRouter } from 'react-router-dom';


const HeaderComponent = (props)=>{
    const currentUser = JSON.parse(localStorage.getItem('user'))
    let content = props.isLoggedIn
        ?   <ul className="container mt-2 d-flex align-items-center justify-content-between">
                <h3 className="logo"> Restro </h3> 
                <h3 className='username'> Hi, {currentUser.username} </h3>
            </ul>
        :   <ul className="nav-list container mt-2 pb-2">
                <li className="nav-logo"><h3 className="logo"> Restro </h3> </li>
                {
                    props.viewProducts
                        ?   <div className="side-nav d-sm-flex d-none">
                                <li className="nav-item"><Link to='/'> &#10094; Back to home Page </Link></li>
                                </div>
                        :   <div className="side-nav d-sm-flex d-none">
                                <li className="nav-item"><a href="#about-us" rel="noopener noreferrer"> About us </a></li>
                                <li className="nav-item"><a href='#menu'> Menu </a></li>
                                <li className="nav-item"><a href="#contact"> Contacts </a></li>
                            </div>
                }
                
            </ul>
    return(
        <div className="nav-bar">

            {content}

        </div>
    )
}

export const Header = withRouter(HeaderComponent) 