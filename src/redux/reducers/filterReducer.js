import {
  APPLY_FILTER,
  CLEAR_RECENT_SEARCH,
  REMOVE_SELECTED_RECENT, RESET_FILTER, SET_BRAND_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_MIN_PRICE_FILTER, SET_TEXT_FILTER, SET_COLLECTION_FILTER, SET_STYLE_FILTER
} from '@/constants/constants';

const initState = {
  recent: [],
  keyword: '',
  brand: '',
  minPrice: 0,
  maxPrice: 0,
  sortBy: '',
  style: '',
  collection: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        recent: (!!state.recent.find((n) => n === action.payload) || action.payload === '') ? state.recent : [action.payload, ...state.recent],
        keyword: action.payload
      };
    case SET_BRAND_FILTER:
      return {
        ...state,
        brand: action.payload
      };
    case SET_MAX_PRICE_FILTER:
      return {
        ...state,
        maxPrice: action.payload
      };
    case SET_MIN_PRICE_FILTER:
      return {
        ...state,
        minPrice: action.payload
      };
      case SET_STYLE_FILTER:
      return {
        ...state,
        style: action.payload
      };
    case SET_COLLECTION_FILTER:
      return {
        ...state,
        collection: action.payload
      };

    case RESET_FILTER:
      return initState;
    case CLEAR_RECENT_SEARCH:
      return {
        ...state,
        recent: []
      };
    case REMOVE_SELECTED_RECENT:
      return {
        ...state,
        recent: state.recent.filter((item) => item !== action.payload)
      };
    case APPLY_FILTER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
