import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IGenerus } from "@/types/Generus";

const generusServices = {
  getGenerus: (params?: string) =>
    instance.get(`${endpoint.GENERUS}?${params}`),
  addGenerus: (payload: IGenerus) => instance.post(endpoint.GENERUS, payload),
  getGenerusById: (id: string) => instance.get(`${endpoint.GENERUS}/${id}`),
  deleteGenerus: (id: string) => instance.delete(`${endpoint.GENERUS}/${id}`),
  updateGenerus: (id: string, payload: IGenerus) =>
    instance.put(`${endpoint.GENERUS}/${id}`, payload),
};

export default generusServices;
