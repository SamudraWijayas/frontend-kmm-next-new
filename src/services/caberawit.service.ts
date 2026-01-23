import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { ICaberawit } from "@/types/Caberawit";

const cabrawitServices = {
  getcaberawit: (params?: string) =>
    instance.get(`${endpoint.CABERAWIT}?${params}`),
  getCaberawitByKelompok: (kelompokId: string, params?: string) =>
    instance.get(
      `${endpoint.CABERAWIT}/${kelompokId}${params ? `?${params}` : ""}`
    ),
  addcaberawit: (payload: ICaberawit) =>
    instance.post(endpoint.CABERAWIT, payload),
  getcaberawitById: (id: string) => instance.get(`${endpoint.CABERAWIT}/${id}`),
  deletecaberawit: (id: string) =>
    instance.delete(`${endpoint.CABERAWIT}/${id}`),
  updatecaberawit: (id: string, payload: ICaberawit) =>
    instance.put(`${endpoint.CABERAWIT}/${id}`, payload),
};

export default cabrawitServices;
