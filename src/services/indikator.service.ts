import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IIndikator } from "@/types/Indikator";

const indikatorServices = {
  getIndikator: (params?: string) =>
    instance.get(`${endpoint.INDIKATOR}?${params}`),
  addIndikator: (payload: IIndikator) =>
    instance.post(endpoint.INDIKATOR, payload),
  getIndikatorById: (id: string) => instance.get(`${endpoint.INDIKATOR}/${id}`),
  deleteIndikator: (id: string) =>
    instance.delete(`${endpoint.INDIKATOR}/${id}`),
  updateIndikator: (id: string, payload: IIndikator) =>
    instance.put(`${endpoint.INDIKATOR}/${id}`, payload),
};

export default indikatorServices;
