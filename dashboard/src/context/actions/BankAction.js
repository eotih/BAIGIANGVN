const getBankStart = () => ({
  type: 'GET_BANK_START'
});
const getBankSuccess = (bank) => ({
  type: 'GET_BANK_SUCCESS',
  bank
});
const getBankFailure = (error) => ({
  type: 'GET_BANK_FAILURE',
  error
});
const createBankStart = () => ({
  type: 'CREATE_BANK_START'
});
const createBankSuccess = (bank) => ({
  type: 'CREATE_BANK_SUCCESS',
  status: bank.status,
  message: bank.message,
  bank: bank.bank
});
const createBankFailure = (error) => ({
  type: 'CREATE_BANK_FAILURE',
  error
});
const updateBankStart = () => ({
  type: 'UPDATE_BANK_START'
});
const updateBankSuccess = (bank) => ({
  type: 'UPDATE_BANK_SUCCESS',
  status: bank.status,
  message: bank.message,
  bank: bank.bank
});
const updateBankFailure = (error) => ({
  type: 'UPDATE_BANK_FAILURE',
  error
});
const deleteBankStart = () => ({
  type: 'DELETE_BANK_START'
});
const deleteBankSuccess = (bank) => ({
  type: 'DELETE_BANK_SUCCESS',
  status: bank.status,
  message: bank.message,
  bank: bank.bank
});
const deleteBankFailure = (error) => ({
  type: 'DELETE_BANK_FAILURE',
  error
});

export {
  getBankStart,
  getBankSuccess,
  getBankFailure,
  createBankStart,
  createBankSuccess,
  createBankFailure,
  updateBankStart,
  updateBankSuccess,
  updateBankFailure,
  deleteBankStart,
  deleteBankSuccess,
  deleteBankFailure
};
