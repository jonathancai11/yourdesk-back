import { SIGNIN, SIGNOUT, 
  ADD_PRODUCT, CLEAR_ALL_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT_PROPERTIES, 
  TOGGLE_SELECTED_PRODUCT, TOGGLE_DESELECT_ALL_PRODUCTS, SET_ALL_PRODUCTS,
  SHOW_AUTH_MODAL, HIDE_AUTH_MODAL, SET_CURRENT_PRODUCT,
  SHOW_PRODUCT_MODAL, HIDE_PRODUCT_MODAL } from "./actionTypes";

let nextProductId = 0;

export const signIn = user => ({ 
  type: SIGNIN,
  payload: {
    user: user
  }
});

export const signOut = () => ({ 
  type: SIGNOUT,
});

export const addProduct = product => {
  product.id =  ++nextProductId
  return ({
    type: ADD_PRODUCT,
    payload: {  
      id: product.id,
      product: product
    }
  });
}

export const setCurrentProduct = product => {
  return ({
    type: SET_CURRENT_PRODUCT,
    payload: {
      product: product
    }
  })
}

export const addProductProperties = product => ({
  type: ADD_PRODUCT_PROPERTIES,
  payload: {
    product: product
  }
});

export const clearAllProducts = () => ({
  type: CLEAR_ALL_PRODUCTS,
});

export const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  payload: {
    product: product
  }
});

export const selectProduct = product => ({
  type: TOGGLE_SELECTED_PRODUCT,
  payload: {
    product: product,
    selected: true
  }
});

export const deselectProduct = product => ({
  type: TOGGLE_SELECTED_PRODUCT,
  payload: {
    product: product,
    selected: false
  }
});

export const showProductModal = () => ({
  type: SHOW_PRODUCT_MODAL
});

export const hideProductModal = () => ({
  type: HIDE_PRODUCT_MODAL
});

export const showAuthModal = () => ({
  type: SHOW_AUTH_MODAL
});

export const hideAuthModal = () => ({
  type: HIDE_AUTH_MODAL
});

export const deselectAllProducts = () => ({
  type: TOGGLE_DESELECT_ALL_PRODUCTS
})

export const setAllProducts = (products) => ({
  type: SET_ALL_PRODUCTS,
  payload: {
    products: products
  }
})