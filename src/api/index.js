import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export { ENDPOINTS, apiClient };

export const getVendorProducts = () => {
  return apiClient.get(ENDPOINTS.VENDOR_PRODUCTS);
};

export const getVendorProductById = (id) => {
  return apiClient.get(`${ENDPOINTS.VENDOR_PRODUCTS}${id}/`);
};

export const addVendorProduct = (productData) => {
  return apiClient.post(ENDPOINTS.VENDOR_PRODUCTS, productData);
};

export const updateVendorProduct = (id, data) => {
  return apiClient.put(`${ENDPOINTS.VENDOR_PRODUCTS}${id}/`, data);
};

export const deleteVendorProduct = (id) => {
  return apiClient.delete(`${ENDPOINTS.VENDOR_PRODUCTS}${id}/`);
};

export const vendorCustomerSignup = (payload) => {
  return apiClient.post(ENDPOINTS.CUSTOMER_SIGNUP, payload);
};

export const searchCustomer = (q) => {
  const config = {};
  const trimmedQuery = q ? q.trim() : null;

  if (trimmedQuery) {
    config.params = { q: trimmedQuery };
  }

  return apiClient.get(ENDPOINTS.SEARCH_CUSTOMER, config);
};

export const vendorOrdersList = (page) => {
  return apiClient.get(`${ENDPOINTS.VENDOR_ORDERS}?page=${page}&is_placed=True`);
};

export const createVendorOrder = (payload) => {
  return apiClient.post(ENDPOINTS.VENDOR_ORDERS, payload);
};

export const updateVendorOrderPayment = (orderId, payload) => {
  return apiClient.patch(`${ENDPOINTS.VENDOR_ORDERS}${orderId}/`, payload);
};

export const getCatalog = (page = 1, q = "") => {
  return apiClient.get(ENDPOINTS.CATALOG, {
    params: { page, q },
  });
};

export const getCombos = () => {
  return apiClient.get(ENDPOINTS.COMBOS);
};

export const getStages = () => {
  return apiClient.get(ENDPOINTS.STAGES);
};

export const getTopSellingProducts = () => {
  return apiClient.get(ENDPOINTS.TOP_SELLING_PRODUCTS);
};

export const getDebtors = () => {
  return apiClient.get(ENDPOINTS.DEBTORS);
};

export const getSalesSummary = (params = {}) => {
  return apiClient.get(ENDPOINTS.SALES_SUMMARY, { params });
};

export const getMonthlyEarnings = () => {
  return apiClient.get(ENDPOINTS.MONTHLY_EARNINGS);
};

export const payDebt = (payload) => {
  return apiClient.post(ENDPOINTS.PAY_DEBT, payload);
};

export const getTransactions = (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined)
  );

  return apiClient.get(ENDPOINTS.TRANSACTIONS, { params: cleanParams });
};

export const downloadOrderPDF = async (orderId) => {
  const response = await apiClient.get(ENDPOINTS.ORDER_PDF(orderId), {
    responseType: "blob",
  });

  return response;
};
