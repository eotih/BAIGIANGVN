const BankReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BANK_START':
      return {
        bank: [],
        loading: true,
        error: null
      };
    case 'GET_BANK_SUCCESS':
      return {
        loading: false,
        bank: action.bank
      };
    case 'GET_BANK_FAILURE':
      return {
        bank: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_BANK_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_BANK_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        bank: [...state.bank, action.bank]
      };
    case 'CREATE_BANK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_BANK_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_BANK_SUCCESS':
      return {
        bank: state.bank.map((bank) => (bank._id === action.bank._id ? action.bank : bank)),
        message: action.message,
        status: action.status,
        loading: false,
        error: null
      };
    case 'UPDATE_BANK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_BANK_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_BANK_SUCCESS':
      return {
        bank: state.bank.filter((bank) => bank._id !== action.bank._id),
        status: action.status,
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_BANK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default BankReducer;
