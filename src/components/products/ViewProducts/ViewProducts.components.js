import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import Docker from '../../common/Docker/Docker.components';

import './ViewProducts.componrnts.css'; // Loading CSS

export class ViewProducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoading: false,
             products: []
        }
    }
    
    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET('/product', true)
            .then(res =>{
                this.setState({
                    products: res.data
                })
            })
            .catch(err=>{
                handleError(err);
            })
            .finally(()=> {
                this.setState({
                    isLoading: false 
                })
            })
    }
    removeItem = (id, index) => {
        console.log('clicked')
        //ask for confirmation
        const confirmation = window.confirm('Are you sure to remove?');
        if(confirmation){
            // Proceced with remove 
            httpClient.DELETE(`/product/${id}`, true)
                .then(response=>{
                    notify.showInfo("product removed");
                    const {products} = this.state;
                    products.splice(index, 1);

                    this.setState({
                        products
                    })
                })
                .catch(err=>{
                    handleError(err)
                })
        }
    }


    render() { 
        const logout = () => {
            localStorage.clear(); // Clearing local storage
            this.props.history.push('/login'); // Navigation to Login Page
          };

          let content = this.state.isLoading
            ? <p> Show Loader </p>
            : <>

                <table className="table">
                    <thead>
                        <tr> 
                            <th> S.N </th>
                            <th> Name </th>
                            <th> Category </th>
                            <th> Price </th>
                            <th> Options </th>
                        </tr>
                    </thead> 
                    <tbody>

                        {
                            (this.state.products || []).map((product,index) => (
                                <tr> 
                                    <td> { index + 1 } </td>
                                    <td> {product.name} </td>
                                    <td> {product.category} </td>
                                    <td> {product.price} </td>
                                    <td> 
                                        <Link to={`/edit-product/${product._id}`}>
                                            <button className='btn '> edit </button> 
                                        </Link>
                                        <button className='btn ml-2' style={{background:"#dc3545"}} onClick={() => this.removeItem(product._id,index)}> delete </button> 
                                    </td>
                                </tr>
                            ))
                        }
                      
                    </tbody>
                </table>
                </>


        return (
            <>
      
            {/* View Product Page */}
            <section>
                <h1 className='text-center'> Products </h1>
            <div className='container mt-5 mb-5 pb-2 text-center'>
                {content}
            </div>

            <Docker />
            </section>
          </>
            
        )
    }
}
