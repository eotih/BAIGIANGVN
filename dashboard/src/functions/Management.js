import axios from './Axios';

export async function getAllCustomer() {
  const res = await axios.get(`Management/SelectAllCustomer`);
  return res.data;
}
export async function getAllContact() {
  const res = await axios.get(`Management/SelectAllContact`);
  return res.data;
}
export async function getAllProduct() {
  const res = await axios.get(`Management/SelectAllProduct`);
  return res.data;
}
export async function getAllOrder() {
  const res = await axios.get(`Management/SelectAllOrders`);
  return res.data;
}
export async function getAllOrderDetailByOrderID(OrderID) {
  const res = await axios.get(`Management/GetOrderDetailByOrderID?OrderID=${OrderID}`);
  return res.data;
}
export async function getLengthByCategory(CategoryID) {
  const res = await axios.get(`Management/GetProductByCategoryID?CategoryID=${CategoryID}`);
  return res.data;
}
export async function GetProductImageByProductName(ProductName) {
  const res = await axios.get(`Management/GetProductImageByProductName?ProductName=${ProductName}`);
  return res.data;
}

export async function getProductBySlug(Slug) {
  const res = await axios.get(`Management/GetProductBySlug?Slug=${Slug}`);
  return res.data;
}
export async function GetProductWhereProductDetailNull() {
  const res = await axios.get(`Management/GetProductWhereProductDetailNull`);
  return res.data;
}
export async function SelectAllCommentAndStar() {
  const res = await axios.get(`Management/SelectAllCommentAndStar`);
  return res.data;
}
