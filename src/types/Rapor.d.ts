export interface IRaporGenerus {
  caberawit: {
    id: number;
    nama: string;
    jenjangId: string;
    kelasJenjangId: string;
    tgl_lahir: string;
    jenis_kelamin: string;
    gol_darah: string;
    nama_ortu: string;
    foto: string | null;
    kelompokId: string;
    desaId: string;
    daerahId: string;
    createdAt: string;
    updatedAt: string;
    kelasJenjang: {
      id: string;
      jenjangId: string;
      name: string;
      urutan: number | null;
      createdAt: string;
      updatedAt: string;
    };
  };

  indikator: {
    id: string;
    indikator: string;
    status: string | null;
    raporId: string | null;
  }[];
}

export interface ITA {
  id?: string;
  name?: string;
}

export interface IRapor {
  caberawitId?: number;
  kelasJenjangId?: string;
  tahunAjaran?: string;
  semester?: string;
  rapor: {
    indikatorKelasId?: string;
    status?: string;
    nilaiPengetahuan?: number | null;
    nilaiKeterampilan?: number | null;
  }[];
}
