import React from "react";
import { Component } from "react";
import { Header } from "../common/header/Header.components";
import { Carousel } from 'react-responsive-carousel'; // React responsive caraousel
import './Home.component.css' // Loading CSS

// Loading Third Party CSS
import "react-responsive-carousel/lib/styles/carousel.min.css"; // // React responsive caraosel CSS
import { httpClient } from "../../utils/httpClient";
import { handleError } from "../../utils/errorHandler";
import { Link } from "react-router-dom";




export class Home extends Component{

    constructor(props){
        super();

        this.state = {
            isLoading: false,
            menu : []
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET('/product/home', true)
            .then(response=>{
                this.setState({
                    menu: response.data
                })
            })
            .catch(err=>{
                handleError(err);
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
    }

    goToMenu =()=>{
        this.props.history.push('/view-products')
    }

    render(){
            let content = this.state.isLoading 
                ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                : 
                    <>
                        <table className="table">
                    <thead>
                        <tr> 
                            <th> Name </th>
                            <th> Price </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            (this.state.menu || []).map((product,index) => (
                                <tr key={index}> 
                                    <td> {product.name} </td>
                                    <td> {product.price} </td>
                                </tr>
                            ))
                        }
                      
                    </tbody>
                </table>
                    </>
        return(
            <div className="main-container">
                <Header />
               
               {/* Hero section */}
               <section className="hero-container d-flex align-items-center justify-content-center "> 
                <video muted autoPlay loop className="video" style={{zIndex: '0'}}>
                    <source src="./images/home-video.mp4" type="video/mp4"></source>
               </video>
                
                {/* <div className="container contents text-center col-8 col-sm-6 pt-5 pb-5 d-flex align-items-center justify-content-center flex-column"
                >
                <h1> RESTAURANT </h1> 
               </div>  */}
                   </section>

                {/* About us Section */}
                <section className="about-us" id="about-us">
                    <div className="container mt-5 mb-5"> 
                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-lg-6 col-sm-12">
                            <h1> OUR STORY </h1>
                            <p className="mt-4"> Tincidunt integer eu augue augue nunc elit dolor luctus placerat scelerisque euismod iaculis eu lacus nunc mi elit vehicula ut laoreet acaliquam sit amet justo nunc tempor metus vel. Lorem ipsum dolor sit amet consectetur adipiscing elitsed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Utenim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="col-lg-4 col-sm-12 mt-sm-5 pb-5">
                            <img src="./images/chef.jpg" className="img-fluid" alt="chef's-img" />
                        </div>
                    </div>

                    </div>
                </section>

                {/* Facility Page */}
                <section className="facility-page">

                    <div className="container mt-5 pt-5 pb-5">
                        <div className="row"> 
                    <div className="col-md-6 col-lg-3 services">
                        <div className='card border-0 p-relative'>
                                <h4 className="thum-name"> FOOD </h4>
                            <img src='./images/food.jpg' alt='food-img' className='img-thumbnail' /> 
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-3 services">
                        <div className='card border-0'>
                            <h4 className="thum-name"> DRINK </h4>
                            <img src='./images/drinks.jpg' alt='drinks-img' className='img-thumbnail' /> 
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 services">
                        <div className='card border-0'>
                            <h4 className="thum-name"> LOCATION </h4>
                            <img src='./images/location.jpg' alt='location-img' className='img-thumbnail' /> 
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3 services">
                        <div className='card border-0'>
                            <h4 className="thum-name"> EVENTS </h4>
                            <img src='./images/events.jpg' alt='event-img' className='img-thumbnail' /> 
                        </div>
                    </div>
                    </div>

                    </div>

                </section>

                {/* Book a table */}

                <section className="book-a-table mt-5 mb-5 pb-5 pt-5 here" id="contact">
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-between">
                            <div className="col-12 col-lg-3">
                                <p className="mb-1"> A table only for you </p>
                                <h1> BOOK A TABLE </h1>
                            </div>
                            <div className="col-sm-12 col-lg-8 pb-5">
                                   <div className="row">
                                <form className="col-12 form flex-column flex-md-row align-items-center align-items-md-stretch ">
                                   <select className="col-md-3 col-6 px-2 rounded-0 border border-secondary">
                                        <option> 1 person </option>
                                        <option> 2 person </option>
                                        <option> 3 person </option>
                                        <option> 4 person </option>
                                        <option> 5 person </option>
                                        <option> 6 person </option>
                                        <option> 7 person </option>
                                        <option> 8 person </option>
                                        <option> 9 person </option>
                                        <option> 10 person </option>
                                        <option> Large Party </option>
                                    </select>

                                    <input className="col-md-3 col-6 mt-2 mt-md-0 px-2 rounded-0 border-secondary" type="date" style={{width: "100%",height:"100%"}}/>

                                    <input className="col-md-3 col-6 px-2 rounded-0 border-secondary" type="time" style={{width: "100%",height:"100%"}} />

                                 <button className="col-md-3 col-6  rounded-0 border border-secondary" type="submit" style={{width: "100%",height:"100%"}}>
                                    Reserve
                                 </button>


                                   
                                </form>
                                   </div>
                                </div>
                        </div>
                    </div>
                </section>

            {/* Menu Section */}
            <section className="menu mb-5" id="menu">

            <div className="container text-center pt-5 px-5">
                <h6> Genuine and delicious </h6>
                <h1 className="mb-4"> OUR MENU </h1>
               {content}
               <br />
               <br />
                <button className="button" onClick={this.goToMenu}>
                    FULL MENU
                </button>
            </div>

            </section>

            {/* Testinomial Page */}
            <section className="testinomial pt-5 pb-5 mb-5">
                <div className="container">

                <Carousel showThumbs={false} className='container'>
                    <div className=' testimonials-container'>
                        <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </h6>
                    </div>

                    <div className=' testimonials-container'>
                        <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </h6>
                    </div>

                    <div className=' testimonials-container'>
                        <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </h6>
                    </div>
                </Carousel>

                </div>
            </section>
            {/* Chefs */}
            <section className="our-chef pt-5 mb-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6" >
                            <img src='./images/chef1.jpg' className="img-fluid" alt="chef's-img"/>
                        </div>

                        <div className="col-12 col-md-6 mt-5 mt-md-0 d-flex flex-column justify-content-around">
                            <div className="container">
                                <h1 className="text"> OUR CHEFS </h1>
                                <p> 
                                    Tincidunt integer eu augue augue nunc elit dolor, luctus placerat scelerisque euismod, 
                                    iaculis eu lacus nunc mit amet consectetur adipiscing elitsed do eiusmod tempor elit vehicula. 
                                    Lorem ipsum dolor sit amet consectetur adipiscing elitsed do eiusmod tempor incididunt utlabore 
                                    et dolore magna aliqua. Utenim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. 
                                </p>
                                <button className="our-chef-button"> OUR STORY </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Opening Hour */}
            <section className="opening-hour pt-3 pb-3 mb-5" >
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-md-2">
                            <h1 className="text"> Opening Hours </h1>
                        </div>

                        <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                            <h4> 9am to 6pm </h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="footer mt-5 pt-5 pb-5" style={{background: "#f7f7f7"}}>
                <div className="container text-center">
                    <h1> Restro </h1>
                    <p> 
                    We don't care if we're doing haute cuisine or burgers and pizza. <br />
                    We just do it right. Always.
                    </p>
                    <Link to='/#'> <img src="./images/facebook-svg.svg" className="icons" alt="social-media-icon"/> </Link>
                    <Link to='/#'> <img src="./images/ig-svg.svg" className="icons" alt="social-media-icon"/> </Link>
                    <Link to='/#'> <img src="./images/twitter-svg.svg" className="icons" alt="social-media-icon"/> </Link>
                </div>
            </section>

               </div>
        )
    }
}