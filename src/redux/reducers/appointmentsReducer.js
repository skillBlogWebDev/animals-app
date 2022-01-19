import { 
    APPOINTMENTS_SUCCESS,
    APPOINTMENTS_ERROR,
} from "../../constants/constants";
  
  const initialState = {
    appointments: [],
    error: false,
  };
    
  export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
    case APPOINTMENTS_SUCCESS:
      return { ...state, appointments: action.payload};
    case APPOINTMENTS_ERROR:
      return { error: true };
    default:
      return state;
    }
  };