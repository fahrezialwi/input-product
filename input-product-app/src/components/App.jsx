import React, { Component } from 'react'
import axios from 'axios'

const URL_API = 'http://localhost:2020/'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            selectedFile: null,
            productName: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + 'products'
        ).then(res => {
            this.setState({
                products: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    onSubmitFile = () => {
        if(this.state.productName){
            if (this.state.selectedFile){
                let fd = new FormData()
                fd.append('browse_file', this.state.selectedFile, this.state.selectedFile.name)
                fd.append('product_name', this.state.productName)
                axios.post(
                    URL_API + 'products', fd
                ).then(res => {
                    alert('Input product success')
                    this.setState({
                        selectedFile: null,
                        productName: ''
                    })
                    this.refs.productName.value = ''
                    this.refs.fileBtn.value = null
                    this.getData()
                }).catch(err => {
                    console.log(err)
                })
            } else {
                alert('Please select an image')
            }
        } else {
            alert('Please type product name')
        }
    }

    productList = () => {
        return this.state.products.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.product_name}</td>
                    <td><img src={URL_API + 'files/' + val.product_image} width="100" alt={val.id}/></td>
                </tr> 
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <h3 className="mb-4">Product List</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.productList()}
                        </tbody>
                    </table>
                </div>
                <div className="row mb-5">
                    <h3 className="mb-4">Input Product</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Picture</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" ref="productName" onChange={e => this.setState({productName: e.target.value})} className="form-control"/>
                                </td>
                                <td>
                                    <input type="file" ref="fileBtn" className="d-none" onChange={e => this.setState({selectedFile: e.target.files[0]})}/>
                                    <input type="button" onClick={() => {this.refs.fileBtn.click()}} value="Select a file" className="btn btn-block btn-primary"/>
                                </td>
                                <td>
                                    <input type="button" onClick={() => {this.onSubmitFile()}} value="Submit" className="btn btn-block btn-primary"/>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default App
