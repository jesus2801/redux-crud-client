import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

//actions of redux
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../actions/products.actions';
import helpers from '../functions';

const NewProduct = ({ history }) => {
  //satete
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  });

  const { name, price } = product;

  //store state
  const { error, loading } = useSelector(state => state.products);

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
      return;
    }

    if (name.trim() !== '') {
      //redirect to home
      history.push('/');
    }
    //eslint-disable-next-line
  }, [error, loading]);

  const onChange = e => {
    const t = e.target;
    setProduct({
      ...product,
      [t.id]: t.id === 'price' ? parseInt(t.value) : t.value,
    });
  };

  const dispatch = useDispatch();

  const addProduct = product => dispatch(createNewProduct(product));

  const onSubmit = e => {
    e.preventDefault();

    //validate form
    if (helpers.isEmpty(name, price)) {
      Swal.fire('Error!', 'Please fill in all fields correctly', 'error');
      return;
    }

    //create new product
    addProduct(product);
  };

  return (
    <form className="form-product" onSubmit={onSubmit}>
      <h2>Add new product</h2>
      <div className="form-group">
        <label htmlFor="name">Product name:</label>
        <input
          type="text"
          placeholder="Enter your prodcut name"
          id="name"
          value={name}
          onChange={onChange}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Product price:</label>
        <input
          type="number"
          placeholder="Enter your prodcut price"
          id="price"
          value={price}
          onChange={onChange}
        />
      </div>

      <button type="submit">Add product</button>
    </form>
  );
};

export default NewProduct;
