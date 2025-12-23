import axios from "axios";

const API_BASE = "https://api.chatmate.site/auth"; // change to deployed backend URL

export const buyTool = (data, token) =>
  axios.post(`${API_BASE}/buy`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPurchases = (token) =>
  axios.get(`${API_BASE}/purchases`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approvePurchase = (id, token) =>
  axios.patch(`${API_BASE}/approve/${id}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
