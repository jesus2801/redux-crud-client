import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {editProductAction} from '../actions/products.actions';

function EditProduct() {
  const dispatch = useDispatch();

  const productEdit = useSelector(state => state.products.productEdit);
  const history = useHistory();

  const [product, setProduct] = useState(productEdit);

  if (!productEdit) {
    console.log('hola?');
    history.push('/');
    return null;
  }

  const {name, price, id} = product;

  const onChange = e => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(editProductAction(product));
    history.push('/');
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
