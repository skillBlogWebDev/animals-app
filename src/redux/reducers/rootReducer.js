import { combineReducers } from 'redux';
import { animalsReducer } from './animalsReduser';
import { appointmentsReducer } from './appointmentsReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  appointments: appointmentsReducer,
  animals: animalsReducer
});