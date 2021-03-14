import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

//redux
import {useDispatch} from 'react-redux';
import {deleteProduct, getProductAction} from '../actions/products.actions';

const Product = ({product}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {name, price, id} = product;

  //confirm delete
  const confirmDeleteProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  //redirect to edit product
  const redirectToEdit = product => {
    dispatch(getProductAction(product));
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>$ {price}</td>
      <td>
        <button className="edit" onClick={() => redirectToEdit(product)}>
          Editar
        </button>
        <button className="delete" onClick={() => confirmDeleteProduct(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
