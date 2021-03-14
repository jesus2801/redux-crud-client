import axiosClient from '../config/axios';
import {
  ADD_PRODUCT,
  SUCCESS_ADD_PRODUCT,
  FAILED_ADD_PRODUCT,
  START_PRODUCTS_DOWNLOAD,
  SUCCESS_PRODUCTS_DOWNLOAD,
  FAILED_PRODUCTS_DOWNLOAD,
  GET_PRODUCT_DELETE,
  DELETED_PRODUCT_SUCCESS,
  DELETED_PRODUCT_FAILED,
  GET_PRODUCT_EDIT,
  START_EDIT_PRODUCT,
  EDITED_PRODUCT_SUCCESS,
  EDITED_PRODUCT_FAILED,
} from '../types';
import Swal from 'sweetalert2';

// --ADD PRODUCTS--
export function createNewProduct(product) {
  return async dispatch => {
    dispatch(addProduct());

    try {
      //connect to API
      await axiosClient.post('/products', product);
      dispatch(successAddProduct(product));

      Swal.fire('Success!', 'Your product has been added successfully', 'success');
    } catch (e) {
      dispatch(failedAddProduct(true));
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

const successAddProduct = product => ({
  type: SUCCESS_ADD_PRODUCT,
  payload: product,
});

const failedAddProduct = state => ({
  type: FAILED_ADD_PRODUCT,
  payload: state,
});

//--------------------

// --GET PRODUCTS--
export function getProducts() {
  return async dispatch => {
    dispatch(downloadProducts());

    try {
      const response = await axiosClient.get('/products');

      dispatch(successDownloadProducts(response.data));
    } catch (e) {
      dispatch(failedProductsDownload());
    }
  };
}

const downloadProducts = () => ({
  type: START_PRODUCTS_DOWNLOAD,
  payload: true,
});

const successDownloadProducts = products => ({
  type: SUCCESS_PRODUCTS_DOWNLOAD,
  payload: products,
});

const failedProductsDownload = () => ({
  type: FAILED_PRODUCTS_DOWNLOAD,
  payload: true,
});

//-----------------

// --DELETE PRODUCT--
export function deleteProduct(id) {
  return async dispatch => {
    dispatch(getProductToDelete(id));

    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(successProductDeleted());
      Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
    } catch (e) {
      dispatch(deleteProductFailed());
    }
  };
}

const getProductToDelete = id => ({
  type: GET_PRODUCT_DELETE,
  payload: id,
});

const successProductDeleted = () => ({
  type: DELETED_PRODUCT_SUCCESS,
});

const deleteProductFailed = () => ({
  type: DELETED_PRODUCT_FAILED,
});

//------------------

// --EDIT PRODUCT--
export function getProductAction(product) {
  return async dispatch => {
    dispatch(getProductToEdit(product));
  };
}

const getProductToEdit = product => ({
  type: GET_PRODUCT_EDIT,
  payload: product,
});

export function editProductAction(product) {
  return async dispatch => {
    dispatch(editProduct(product));

    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(successProductEdit(product));
    } catch (e) {
      console.log('hola(?');
      dispatch(failedProductEdit());
    }
  };
}

const editProduct = () => ({
  type: START_EDIT_PRODUCT,
});

const successProductEdit = product => ({
  type: EDITED_PRODUCT_SUCCESS,
  payload: product,
});

const failedProductEdit = () => ({
  type: EDITED_PRODUCT_FAILED,
  payload: true,
});
