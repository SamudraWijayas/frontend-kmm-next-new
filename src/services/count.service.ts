import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";

const countServices = {
  CountDaerahForAdmin: () => instance.get(`${endpoint.COUNT}/daerah`),
  CountDesaForAdmin: () => instance.get(`${endpoint.COUNT}/desa`),
  CountKelompokForAdmin: () => instance.get(`${endpoint.COUNT}/kelompok`),
};

export default countServices;
