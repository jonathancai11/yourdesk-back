import { ADD_PRODUCT, CLEAR_ALL_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT_PROPERTIES, TOGGLE_SELECTED_PRODUCT, TOGGLE_DESELECT_ALL_PRODUCTS, SET_ALL_PRODUCTS } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

function coordsMatch(a, b) {
  return a.coords.x === b.coords.x && a.coords.y === b.coords.y
}

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_PRODUCT: {
      const { id, product } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            product,
            selected: true,
            saved: false
          }
        }
      };
    }

    case CLEAR_ALL_PRODUCTS: {
      return {
          allIds: [],
          byIds: {}
        };
    }

    case ADD_PRODUCT_PROPERTIES: {
      const { product } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [product.id]: {
            product: {
              ...state.byIds[product.id].product,
              properties: product.properties,
              productId: product.productId
            },
            saved: true,
          }
        }
      }
    }

    case DELETE_PRODUCT: {
      const { product } = action.payload;
      for (let i = 0; i < state.allIds.length; i++) {
        let otherProduct = state.byIds[state.allIds[i]].product;
        if (coordsMatch(product, otherProduct)) {
          let matchingId = state.allIds[i];
          state.allIds.splice(i, 1);
          delete state.byIds[matchingId];
          const newByIds = state.byIds;
          delete newByIds[matchingId];
          return {
            ...state,
            byIds: newByIds
          };
        }
      }
      break;
    }

    case TOGGLE_SELECTED_PRODUCT: {
      const { product, selected } = action.payload;
      let otherProduct = state.byIds[product.id];
      otherProduct.selected = selected;
      return {
        ...state
      };
    }

    case TOGGLE_DESELECT_ALL_PRODUCTS: {
      for (let i = 0; i < state.allIds.length; i++) {
        let otherProduct = state.byIds[state.allIds[i]];
        otherProduct.selected = false;
      }
      return {
        ...state
      };
    }

    case SET_ALL_PRODUCTS: {
      let { products } = action.payload;
      return products;
    }

    default:
      return state;
  }
}
