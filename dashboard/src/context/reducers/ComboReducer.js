const ComboReducer = (state, action) => {
  switch (action.type) {
    case 'GET_COMBO_START':
      return {
        combo: [],
        loading: true,
        error: null
      };
    case 'GET_COMBO_SUCCESS':
      return {
        loading: false,
        combo: action.combo
      };
    case 'GET_COMBO_FAILURE':
      return {
        combo: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_COMBO_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_COMBO_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        combo: [...state.combo, action.combo]
      };
    case 'CREATE_COMBO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_COMBO_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_COMBO_SUCCESS':
      return {
        combo: state.combo.map((combo) => (combo._id === action.combo._id ? action.combo : combo)),
        message: action.message,
        status: action.status,
        loading: false,
        error: null
      };
    case 'UPDATE_COMBO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_COMBO_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_COMBO_SUCCESS':
      return {
        combo: state.combo.filter((combo) => combo._id !== action.combo._id),
        status: action.status,
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_COMBO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default ComboReducer;
