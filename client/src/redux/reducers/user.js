import { SIGNIN, SIGNOUT } from "../actionTypes";

const sampleUser = {
  username: "caimjonathan",
  firstname: "Jonathan",
  lastname: "Cai",
  email: "caimjonathan@gmail.com"
};

const initialState = sampleUser;

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      return action.payload.user;
    }
    case SIGNOUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default user;
