import Contact from "../models/Contact";
import { api } from "./apiIndex";

export const fetchContacts = async (withDefault: boolean = true) => {
  try {
    const route = withDefault ? "/contacts" : "contacts/not-default";
    const response = await api.get(route);

    return response.data.map((contact: any) => new Contact(contact));
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getContactById = async (id: number) => {
  const response = await api.get(`/contacts/${id}`);
  return new Contact(response.data.data);
};

export const createContact = async (contact: any) => {
  await api.post("/contacts/create", contact);
};

export const editContact = async (contact: any, id: number) => {
  await api.put(`/contacts/edit/${id}`, contact);
};

export const deleteContact = async (id: number) => {
  await api.delete(`contacts/delete/${id}`);
};

export const getContactsByServiceId = async (serviceId: number) => {
  const response = await api.get(`/services/${serviceId}/contacts`);
  const mappedData = response.data.data.map(
    (contactServiceInfo: any) => new Contact(contactServiceInfo.contact)
  );
  return mappedData;
};

export const addContactsToClientService = async (
  contactIds: any,
  serviceId: number
) => {
  await api.post(`/services/${serviceId}/contacts`, contactIds);
};
