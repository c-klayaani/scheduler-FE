import Client from "../models/Client";
import { api } from "./apiIndex";

export const fetchClients = async () => {
  try {
    let url = "/clients";
    const response = await api.get(url);
    return response.data.data.map((client: any) => new Client(client));
  } catch (error) {
    console.error("Error fetching Client:", error);
    throw error;
  }
};

export const getClientById = async (id: number) => {
  const response = await api.get(`/clients/${id}`);

  return new Client(response.data.data);
};

export const addClient = async (formData: any) => {
  try {
    await api.post("/clients/create", formData);
  } catch (error) {
    console.error("Error adding Client:", error);
    throw error;
  }
};

export const editClient = async (id: number, formData: any) => {
  try {
    await api.put(`/clients/edit/${id}`, formData);
  } catch (error) {
    console.error("Error Editing Client:", error);
    throw error;
  }
};

export const deleteClient = async (id: number) => {
  try {
    await api.delete(`/clients/delete/${id}`);
  } catch (error) {
    console.error("Error deleting Client:", error);
    throw error;
  }
};
