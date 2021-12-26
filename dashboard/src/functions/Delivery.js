import axios from './Axios';

export async function getAllServices() {
  const res = await axios.get('Delivery/SelectAllService');
  return res.data;
}
export async function getAllShipper() {
  const res = await axios.get('Delivery/SelectAllShipper');
  return res.data;
}
export async function getAllShippingDepartment() {
  const res = await axios.get('Delivery/SelectAllShippingDepartment');
  return res.data;
}
