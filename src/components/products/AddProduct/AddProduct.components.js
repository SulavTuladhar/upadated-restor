import React, { Component } from 'react'
import ProductForm from '../ProductForm/ProductForm.components'
import { httpClient } from '../../../utils/httpClient'
import { handleError } from '../../../utils/errorHandler'
import { notify } from '../../../utils/toaster'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isSubmitting: false
        }
    }



    add = (data)=>{
        this.setState({
            isSubmitting: true
        });
        // API CALL
        httpClient.POST('/product', data, true)
            .then(res=>{
                notify.showSucess('Product added sucessfully');
                this.props.history.push('/dashboard');
            })
            .catch(err =>{
                handleError(err)
            })
    }
    
    render() {
        return (
            <ProductForm 
                isSubmitting={this.state.isSubmitting}
                title = "Add Product"
                isAdd= {true} 
                submitCallback = {this.add}
            />
        )
    }
}
