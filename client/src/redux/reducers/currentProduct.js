import { SHOW_PRODUCT_MODAL, HIDE_PRODUCT_MODAL, SET_CURRENT_PRODUCT } from '../actionTypes';

const initialState = {
    show: false,
    currentProduct: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_PRODUCT_MODAL: {
        return {
            ...state,
            show: true
        }
    }
    case HIDE_PRODUCT_MODAL: {
        return {
            ...state,
            show: false
        }
    }
    case SET_CURRENT_PRODUCT: {
        const {product} = action.payload;
        return {
            ...state,
            currentProduct: product
        }
    }
    
    default:
      return state;
  }
}


