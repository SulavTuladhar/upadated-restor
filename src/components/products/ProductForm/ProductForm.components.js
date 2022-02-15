import React, { Component } from 'react';
import { SubmitBtn } from '../../common/submitBtn/SubmitBtn.components';
import { Link } from 'react-router-dom';


import './ProductForm.components.css'
import Docker from '../../common/Docker/Docker.components';

const defaultForm = {
        name: '',
        description: '',
        price: '',
        category: ''
}

const validationFields = {
    name: '',
    price: ''
}

export default class ProductForm extends Component {
    constructor(){
        super();

        this.state = {
            data: {...defaultForm},
            error: {...validationFields}
        }
    }

    handleChange = e =>{
      let {name,value} = e.target;

      this.setState(prestate=>({
        data:{
          ...prestate.data,
          [name]: value
        }
      }),()=>{
        //form validation here
      })
    }

    onSubmit = e =>{
      e.preventDefault();
      this.props.submitCallback(this.state.data);
    }

    render() {
        return (

          <div className="add-product-container">
              <div className="add-product-content">
                <h2> {this.props.isEditMode ? 'Update' : 'Add'} Product </h2> 
                  <p className="add-product-description"> To add products, all you need is a name, description and price. </p>
                
                
                <form className="add-form" onSubmit={this.onSubmit} noValidate>
                  <label htmlfor="name"> Name  </label>
                  <input type="text" name="name" id="name" onChange={this.handleChange} />

                  <label htmlfor="description"> Description  </label>
                  <input type="text" name="description" id="description" onChange={this.handleChange} />

                  <label htmlfor="price"> Price  </label>
                  <input type="number" name="price" id="price" onChange={this.handleChange}/>

                  <label htmlfor="category"> Category  </label>
                  <input type="text" name="category" id="category" onChange={this.handleChange}/>   
                  <SubmitBtn
                  isSubmitting = {this.props.isSubmitting}
                  > </SubmitBtn>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                </form>
                </div>

               <Docker ProductForm/>

              </div>
              
                
        )
    }
}
