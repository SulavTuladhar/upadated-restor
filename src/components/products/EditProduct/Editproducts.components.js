import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';

const defaultForm = {
    name: '',
    category: '',
    price: ''
}

const logout = () => {
    localStorage.clear(); // Clearing local storage
    this.props.history.push('/login'); // Navigation to Login Page
  }

export class EditProduct extends Component {
    constructor(props){
        super(props);

        this.state ={
            isLoading: false,
            isSubmitting: false,
            data: {
                ...defaultForm
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        this.productId = this.props.match.params['id'];
        httpClient.GET(`/product/${this.productId}`, true)
            .then(res=>{
                this.setState({
                    data: res.data
                })
            })
            .catch(err=>{
                handleError(err)
            })
            .finally(()=>{
                this.setState({
                        isLoading: false
                    })
            })
    }
    handleChange = e =>{
        let {name, value} = e.target;

        this.setState(preState=>({
            data: {
                ...preState.data,
                [name]: value
            }
        }), ()=>{
            console.log(this.state.data)
        })
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.PUT(`/product/${this.productId}`, this.state.data, true)
            .then(res=>{
                notify.showInfo('Product edited sucessfully');
                this.props.history.push('/dashboard');
            })
            .catch(err=>{
                notify.showError(err)
                this.setState({
                    isSubmitting: false
                })
            })
            .finally(()=>{
                this.setState({
                    isSubmitting: false
                })
            })
    }
  render() {
      let content = this.state.isLoading 
        ?   <div className="lds-ring d-flex align-items-center justify-content-center"
                style={{height: '80vh', width: '100vw'}}
            >
                <div></div><div></div><div></div><div></div></div>
        : <>
            <div className='d-flex align-items-center justify-content-center' style={{height: '80vh'}}>
                <form className='form container' onSubmit={this.onSubmit}> 
                    <label htmlFor='name'> Name </label>
                    <input type='text' name='name' id='name' value={this.state.data.name || ''} className='form-control' onChange={this.handleChange}/>
                    <label htmlFor='category'> Cateogry </label>
                    <input type='text' name='category' id='category' value={this.state.data.category || ''} className='form-control' onChange={this.handleChange}/>
                    <label htmlFor='price'> Price </label>
                    <input type='number' name='price' id='price' value={this.state.data.price || ''} className='form-control' onChange={this.handleChange}/>
                    <button className="btn btn-primary"> Sumbit </button>
                </form>
            </div>
            
        </>
    return(
        <>
            {content}
            {/* Docker */}
            <div className="container-fluid position-here">
            <div className="container d-flex justify-content-center">
              <div className="row docker pt-1 pb-1 col-12 col-lg-8"  style={{backgroundColor: "#cdb4db"}}>
                <span> <img src="../images/home-icon.svg" alt="home-icon"/> </span>
                <span> <img src="../images/search-icon.svg" alt="search-icon"/> </span>
                <span> <Link to="/dashboard"> <img src="../images/back-icon.svg" alt="add-icon"/> </Link> </span>
                <span> <img src="../images/setting-icon.svg" alt="settings-icon"/> </span>
                <span onClick={()=>logout()}> <img src="../images/logout-icon.svg" alt="logout-icon"/> </span>
              </div>
            </div>
        </div>
        </>
    )
  }
}
