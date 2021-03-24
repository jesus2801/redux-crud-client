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
  EDITED_PRODUCT_SUCCESS,
  EDITED_PRODUCT_FAILED,
} from '../types';

//reducer state
const initialState = {
  products: [],
  error: false,
  loading: false,
  productDelete: null,
  productEdit: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
    case START_PRODUCTS_DOWNLOAD:
      return {
        ...state,
        loading: action.payload,
      };
    case SUCCESS_ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case DELETED_PRODUCT_FAILED:
    case FAILED_PRODUCTS_DOWNLOAD:
    case FAILED_ADD_PRODUCT:
    case EDITED_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productDelete: null,
        productEdit: null,
      };
    case SUCCESS_PRODUCTS_DOWNLOAD:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case GET_PRODUCT_DELETE:
      return {
        ...state,
        productDelete: action.payload,
      };
    case DELETED_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== state.productDelete
        ),
        productDelete: null,
      };
    case GET_PRODUCT_EDIT:
      return {
        ...state,
        productEdit: action.payload,
      };
    case EDITED_PRODUCT_SUCCESS:
      return {
        ...state,
        productEdit: null,
        products: state.products.map(product =>
          product.id === action.payload
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
};

export default reducer;
