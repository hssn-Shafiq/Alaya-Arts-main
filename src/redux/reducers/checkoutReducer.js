import {
  RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS, SET_CHECKOUT_SHIPPING_DETAILS
} from '@/constants/constants';

const initState = {
  shipping: {},
  payment: {}
};

const checkoutReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload
      };
    case SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload
      };
    case RESET_CHECKOUT:
      return initState;
    default:
      return state;
  }
};

export default checkoutReducer;
