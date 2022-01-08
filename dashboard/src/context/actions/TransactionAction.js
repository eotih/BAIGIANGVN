const getTransactionStart = () => ({
  type: 'GET_TRANSACTION_START'
});
const getTransactionSuccess = (transaction) => ({
  type: 'GET_TRANSACTION_SUCCESS',
  transaction
});
const getTransactionFailure = (error) => ({
  type: 'GET_TRANSACTION_FAILURE',
  error
});
const createTransactionStart = () => ({
  type: 'CREATE_TRANSACTION_START'
});
const createTransactionSuccess = (transaction) => ({
  type: 'CREATE_TRANSACTION_SUCCESS',
  status: transaction.status,
  message: transaction.message,
  transaction: transaction.transaction_history
});
const createTransactionFailure = (error) => ({
  type: 'CREATE_TRANSACTION_FAILURE',
  error
});

export {
  getTransactionStart,
  getTransactionSuccess,
  getTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure
};
