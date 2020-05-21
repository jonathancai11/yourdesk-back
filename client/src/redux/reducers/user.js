import { SIGNIN, SIGNOUT, SHOW_AUTH_MODAL, HIDE_AUTH_MODAL } from "../actionTypes";

const sampleUser = {
  _id: "5ec4a17e8c2be67157118829",
  username: "caimjonathan",
  firstname: "Jonathan",
  lastname: "Cai",
  email: "caimjonathan@gmail.com"
};

// const initialState = {
//   user: sampleUser,
//   show_auth_modal: false
// };

const initialState = {
  user: null,
  show_auth_modal: false
};


const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      return {
        user: action.payload.user,
        show_auth_modal: false,
      };
    }
    case SIGNOUT: {
      return {
        user: null,
        show_auth_modal: false,
      };
    }
    case SHOW_AUTH_MODAL: {
      return {
        ...state,
        show_auth_modal: true
      }
    }
    case HIDE_AUTH_MODAL: {
      return {
        ...state,
        show_auth_modal: false
      }
    }
    default: {
      return state;
    }
  }
};

export default user;
