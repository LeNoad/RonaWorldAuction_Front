import { LOGOUT, SET_TOKEN, SET_USER } from '../ActionTypes/actionTypes';

const initialState = {
  userEntity: null,
  jwtTokenDto: null,
};

export const userReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userEntity: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        jwtTokenDto: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userEntity: null,
        jwtTokenDto: null,
      };
    default:
      return state;
  }
};