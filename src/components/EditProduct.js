import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/products.actions';
import helpers from '../functions';
import Swal from 'sweetalert2';

function EditProduct() {
  const dispatch = useDispatch();

  const { productEdit, error } = useSelector(state => state.products);
  const history = useHistory();

  const [product, setProduct] = useState(productEdit);

  useEffect(() => {
    if (!error && productEdit === null) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [error, productEdit]);

  if (!productEdit) {
    history.push('/');
    return null;
  }

  const { name, price } = product;

  const onChange = e => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (helpers.isEmpty(name, price)) {
      Swal.fire('Error!', 'Please fill in all fields correctly', 'error');
      return;
    }

    dispatch(editProductAction(product));
  };

  return (
    <form className="form-product" onSubmit={onSubmit}>
      <h2>Edit existing product</h2>
      <div className="form-group">
        <label htmlFor="name">Product name:</label>
        <input
          type="text"
          placeholder="Enter your prodcut name"
          id="name"
          onChange={onChange}
          value={name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Product price:</label>
        <input
          type="text"
          placeholder="Enter your prodcut price"
          id="price"
          value={price}
          onChange={onChange}
        />
      </div>

      <button type="submit">edit product</button>
    </form>
  );
}

export default EditProduct;
