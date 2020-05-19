import { SHOW_MODAL, HIDE_MODAL, ADD_PRODUCT } from '../actionTypes';

const initialState = {
    show: false,
    currentProduct: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
        return {
            ...state,
            show: true
        }
    }
    case HIDE_MODAL: {
        return {
            ...state,
            show: false
        }
    }
    case ADD_PRODUCT: {
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


