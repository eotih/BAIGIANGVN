/* eslint-disable prettier/prettier */
import JWTDecode from "jwt-decode";
import axios from './Axios';

const token = JWTDecode(localStorage.getItem('token'));
export async function infoUserLogin() {
  const res = await axios.get(`Organization/GetAccountById?AccountID=${token.nameid[0]}`);
  return res.data;
}
export async function getAllAccount() {
  const res = await axios.get('Organization/SelectAllAccount');
  return res.data;
}
export async function getAllBanner() {
  const res = await axios.get('Organization/SelectAllBanner');
  return res.data;
}
export async function getAllOrganization() {
  const res = await axios.get('Organization/SelectAllOrganization');
  return res.data;
}
