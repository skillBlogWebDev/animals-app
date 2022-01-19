import { 
    ANIMALS_SUCCESS,
    ANIMALS_ERROR,
} from "../../constants/constants";
  
  const initialState = {
    animals: [],
    error: false,
  };
    
  export const animalsReducer = (state = initialState, action) => {
    switch (action.type) {
    case ANIMALS_SUCCESS:
      return { ...state, animals: action.payload};
    case ANIMALS_ERROR:
      return { error: true };
    default:
      return state;
    }
  };