import Service from "../models/Service";
import { api } from "./apiIndex";

export const fetchServices = async () => {
  try {
    const response = await api.get("/services");

    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const editService = async (service: any, id: number) =>
  await api.put(`/services/${id}`, service);

export const addService = async (service: any) => {
  try {
    await api.post("/services/create", service);
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const getServiceById = async (id: number) => {
  const response = await api.get(`/services/${id}`);
  return new Service(response.data.data);
};

export const deleteService = async (id: number) => {
  try {
    await api.delete(`/services/delete/${id}`);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
