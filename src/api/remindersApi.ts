import { api } from "./apiIndex"

export const deleteReminder = async (id: number) => {
  await api.delete(`/reminder/${id}`);
} 