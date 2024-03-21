import axios, { AxiosInstance } from "axios";
import { formatDateFromIso } from "../utils/dateHelper";
import Service from "../models/Service";

// api base URL
const baseURL = "http://localhost:8000/api";
//api axios  instance
export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const deleteApiToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  delete api.defaults.headers.common.Authorization;
};

export const setApiToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// login api
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    setApiToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//clients service apis

export const getClientServices = async (id: number) => {
  try {
    const response = await api.get(`/clientservicesbyclient/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Getting Client Services:", error);
    throw error;
  }
};
export const addClientService = async (formData: any) => {
  try {
    const dueDate = new Date(formData.due_date);

    const formattedDueDate = formatDateFromIso(dueDate);

    const newData = { ...formData, due_date: formattedDueDate };

    await api.post("clientservice/create", newData);
  } catch (error) {
    console.error("Error adding Client Service:", error);
    throw error;
  }
};

export const editClientService = async (id: number, formData: any) => {
  try {
    const dueDate = new Date(formData.due_date);

    const formattedDueDate = formatDateFromIso(dueDate);
    const newData = { ...formData, due_date: formattedDueDate };

    await api.put(`clientservices/edit/${id}`, newData);
  } catch (error) {
    console.error("Error adding Client Service:", error);
    throw error;
  }
};

export const deleteClientService = async (id: number) => {
  try {
    await api.delete(`/clientservices/delete/${id}`);
  } catch (error) {
    console.error("Error deleting Client:", error);
    throw error;
  }
};

export const fetchReminders = async (id: number) => {
  try {
    const response = await api.get(`/reminder/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const addReminder = async (formData: any) => {
  try {
    await api.post("/reminder/create", formData);
  } catch (error) {
    console.error("Error adding Client:", error);
    throw error;
  }
};
