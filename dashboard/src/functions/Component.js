import axios from './Axios';

export async function getAllRole() {
  const res = await axios.get('Component/SelectAllRole');
  return res.data;
}
export async function getAllPayment() {
  const res = await axios.get('Component/SelectAllPayment');
  return res.data;
}
export async function getAllCategory() {
  const res = await axios.get('Component/SelectAllCategory');
  return res.data;
}
export async function getAllBrands() {
  const res = await axios.get('Component/SelectAllBrand');
  return res.data;
}
export async function getAllUtilities() {
  const res = await axios.get('Component/SelectAllUtil');
  return res.data;
}
export async function getAllState() {
  const res = await axios.get('Component/SelectAllState');
  return res.data;
}
