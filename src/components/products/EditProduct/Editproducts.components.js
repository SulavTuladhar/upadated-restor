import React, { Component } from 'react';
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';

const defaultForm = {
    name: '',
    category: '',
    price: ''
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
                this.props.history.push('/view-products');
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
        ? <p> Showing loader </p> 
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
        </>
    )
  }
}
