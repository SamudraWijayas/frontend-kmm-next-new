import { DateValue } from "@nextui-org/react";

interface ICaberawit {
  id?: string;
  nama?: string;
  jenjangId?: string;
  tgl_lahir?: staring | DateValue;
  jenis_kelamin?: string;
  gol_darah?: string;
  nama_ortu?: string;
  foto?: string | FileList | null | undefined;
  kelasJenjangId?: string;
  kelasJenjang?: {
    id?: string;
    name?: string;
  };
  jenjangId?: string;
  jenjang?: {
    id?: string;
    name?: string;
  };
  kelompokId?: string;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string;
  daerah?: {
    id?: string;
    name?: string;
  };
}

export type { ICaberawit };
