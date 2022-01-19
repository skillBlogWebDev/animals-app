import { 
    AUTH_SUCCESS,
    AUTH_ERROR,
} from "../../constants/constants";
  
  const initialState = {
    isAuthUser: !!localStorage.getItem('user'),
    user: JSON.parse(localStorage.getItem('user')) || {},
    error: false,
  };
    
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthUser: true, 
        error: false, 
        user: action.payload 
      };
    case AUTH_ERROR:
      return { error: true };
    default:
      return state;
    }
  };