interface IIndikator {
  id?: string;
  kelasJenjangId?: string;
  kelasJenjang?: {
    id: string;
    name: string;
  };
  kategoriIndikatorId?: string;
  kategoriIndikator?: {
    id: string;
    name: string;
  };
  indikator?: string;
  semester?: string;
  jenisPenilaian?: string;
}

export type { IIndikator };
