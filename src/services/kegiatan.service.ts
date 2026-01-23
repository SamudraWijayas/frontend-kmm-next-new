import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKegiatan } from "@/types/Kegiatan";

const kegiatanServices = {
  getKegiatan: () => instance.get(`${endpoint.KEGIATAN}`),
  getKegiatanByFilter: (params: string) =>
    instance.get(`${endpoint.KEGIATAN}/filter?${params}`),
  addKegiatan: (payload: IKegiatan) =>
    instance.post(endpoint.KEGIATAN, payload),
  getKegiatanById: (id: string) => instance.get(`${endpoint.KEGIATAN}/${id}`),
  deleteKegiatan: (id: string) => instance.delete(`${endpoint.KEGIATAN}/${id}`),
  updateKegiatan: (id: string, payload: IKegiatan) =>
    instance.put(`${endpoint.KEGIATAN}/${id}`, payload),
};

export default kegiatanServices;
