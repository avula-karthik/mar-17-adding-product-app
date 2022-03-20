/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState, useEffect } from 'react';
const ProductComponent = () => {
    let [product, setProduct] = useState([
        {
            name: 'Pen',
            price: 30,
            description: 'Pen Description',
            category: 'Toys',
            status: 'available',
        },
    ]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = () => {
        axios
            .get('/products')
            .then((res) => {
                console.log('Full Data : ');
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteAll = () => {
        console.log('Clicked Dletee');
        axios.delete('/products/all');
        getProducts();
    };
    const addProduct = (event) => {
        event.preventDefault();
        let productObj = {
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            category: event.target.category.value,
            status: event.target.status.value,
        };
        axios
            .post('/products', productObj)
            .then((res) => {
                getProducts();
            })
            .catch((error) => {
                console.log(error);
            });
        getProducts();
    };
    let deleteProduct = (indexToDel) => {
        axios
            .delete('/products/' + indexToDel)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => console.log(error));
        getProducts();
    };
    return (
        <div>
            <form className='myproductForm' onSubmit={addProduct}>
                <label>Product Name</label>
                <input
                    required
                    type='text'
                    name='name'
                    placeholder='product name..'
                    className='form-control spacingClass'
                />
                <label>Product Price</label>
                <input
                    required
                    type='number'
                    name='price'
                    placeholder='price..'
                    className='form-control spacingClass'
                />
                <label>Product Description</label>
                <textarea
                    required
                    name='description'
                    placeholder='product description...'
                    className='form-control spacingClass'
                ></textarea>
                <label>Category</label>
                <select className='myselectBox' name='category'>
                    <option value='toys'>Toys</option>
                    <option value='clothes'>Clothes</option>
                    <option value='fooditems'>Food Items</option>
                </select>
                <br />
                <label>Status : </label>
                <select className='myselectBox' name='status'>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                </select>
                <br />
                <div className='text-center'>
                    <button className='btn btn-primary'>Add Product</button>
                    <button
                        className='btn btn-danger'
                        onClick={() => deleteAll()}
                    >
                        Delete all
                    </button>
                </div>
            </form>
            {product.map((val, index) => {
                return (
                    <div className='eachItem cardbody border border-primary'>
                        <h3 className='productdiffbag'>Name : {val.name}</h3>
                        <h4>Price:{val.price}</h4>
                        <h4 className='productdiffbag'>
                            Description : {val.description}
                        </h4>
                        <h4>Category : {val.category}</h4>
                        <h4 className='productdiffbag'>
                            Status : {val.status}
                        </h4>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteProduct(index)}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default ProductComponent;
