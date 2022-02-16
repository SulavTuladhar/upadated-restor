import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import { Header } from '../../common/header/Header.components';

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
      
          let content = this.state.isLoading
            ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            : <>
                <table className="table">
                    <thead>
                        <tr> 
                            <th> S.N </th> 
                            <th> Name </th>
                            <th> Category </th>
                            <th> Price </th>
                            {this.props.seenByAdmin
                                ? <th> Options </th>
                                : <></>
                            }
                        </tr>
                    </thead> 
                    <tbody>

                        {
                            (this.state.products || []).map((product,index) => (
                                <tr key={index}> 
                                    <td>{ index + 1 }</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td> 
                                        {this.props.seenByAdmin
                                            ? <> 
                                                <Link to={`/edit-product/${product._id}`}>
                                                    <button className='btn '> edit </button> 
                                                </Link>
                                                <button className='btn ml-2' style={{background:"#dc3545"}} onClick={() => this.removeItem(product._id,index)}> delete </button> 
                                              </>
                                            : <></>
                                        }
                                        
                                    </td>
                                </tr>
                            ))
                        }
                      
                    </tbody>
                </table>
                </>


        return (
            <>
            {
                this.props.seenByAdmin
                    ? ''
                    : <Header viewProducts />
            }
            {/* View Product Page */}
            <section>
                <h1 className='text-center'> Menu </h1>
            <div className='container mt-5 mb-5 pb-2 text-center'>
                {content}
            </div>

            </section>
          </>
            
        )
    }
}
