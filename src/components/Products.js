import React, {Fragment, useEffect} from 'react';
import Swal from 'sweetalert2';

import Product from './Product';
import helpers from '../functions';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../actions/products.actions';

const Products = () => {
  //state
  const {products} = useSelector(state => state.products);

  const {error, loading} = useSelector(state => state.products);

  useEffect(() => {
    if (loading) {
      helpers.toggleLoader(true);
    } else {
      helpers.toggleLoader(false);
    }

    if (error) {
      Swal.fire(
        'Error!',
        'Sorry, an error has occurred, please try again later',
        'error'
      );
    }
  }, [error, loading]);

  const dispatch = useDispatch();

  useEffect(() => {
    // consult API
    const loadProducts = () => dispatch(getProducts());
    loadProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? null
            : products.map(product => <Product key={product.id} product={product} />)}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Products;
