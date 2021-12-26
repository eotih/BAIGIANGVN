import axios from './Axios';

export async function getAllField() {
  const res = await axios.get('Article/SelectAllField');
  return res.data;
}
export async function getAllPosts() {
  const res = await axios.get('Article/SelectAllPost');
  return res.data;
}
export async function getPostBySlug(Slug) {
  const res = await axios.get(`Article/GetPostBySlug?Slug=${Slug}`);
  return res.data;
}
