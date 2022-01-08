const TransactionReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTION_START':
      return {
        transaction: [],
        loading: true,
        error: null
      };
    case 'GET_TRANSACTION_SUCCESS':
      return {
        loading: false,
        transaction: action.transaction
      };
    case 'GET_TRANSACTION_FAILURE':
      return {
        transaction: [],
        loading: false,
        error: 'Error getting transaction'
      };
    case 'CREATE_TRANSACTION_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        transaction: [...state.transaction, action.transaction]
      };
    case 'CREATE_TRANSACTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default TransactionReducer;
