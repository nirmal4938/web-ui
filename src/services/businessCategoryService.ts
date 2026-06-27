import axios from 'axios';

const API = import.meta.env.VITE_DEV_API_BASE_URL;

export const getBusinessCategories = async () => {
  const res = await axios.get(`${API}/business-categories`);

  return res.data.data;
};
