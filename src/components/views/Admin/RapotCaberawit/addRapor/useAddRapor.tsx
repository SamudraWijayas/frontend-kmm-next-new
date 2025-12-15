import { useForm, useFieldArray } from "react-hook-form";
import { IRapor } from "@/types/Rapor";
import { ToasterContext } from "@/contexts/ToasterContext";
import raporServices from "@/services/rapor.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const schema = yup.object().shape({
  kelasJenjangId: yup.string().required("Kelas Jenjang wajib diisi"),
  tahunAjaran: yup.string().required("Tahun Ajaran wajib diisi"),
  semester: yup.string().required("Semester wajib diisi"),
  rapor: yup
    .array()
    .of(
      yup.object().shape({
        indikatorKelasId: yup.string().required("Indikator Kelas wajib diisi"),
        nilaiPengetahuan: yup.number().nullable(),
        nilaiKeterampilan: yup.number().nullable(),
      })
    )
    .required(),
});

const useAddRapor = () => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();
  const id = params?.id as string;

  const { data: dataIndikator } = useQuery({
    queryKey: ["Indikator", id],
    queryFn: async () => {
      const res = await raporServices.getRaporLengkapByCaberawit(id);
      return res.data;
    },
  });

  const { data: dataTA } = useQuery({
    queryKey: ["TA"],
    queryFn: async () => {
      const res = await raporServices.getTA();
      return res.data.data;
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kelasJenjangId: "",
      tahunAjaran: "",
      semester: "",
      rapor: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rapor",
  });

  const populatedRef = useRef(false);

  // Auto-populate rapor dari indikator backend
  useEffect(() => {
    if (!dataIndikator || populatedRef.current) return;

    const kategoriList = dataIndikator?.data?.indikator || [];
    const semuaIndikator = kategoriList.flatMap(
      (kategori: any) => kategori.indikator
    );

    populatedRef.current = true;
    remove();

    semuaIndikator.forEach((ind: any) => {
      append({
        indikatorKelasId: ind.indikatorId,
        nilaiPengetahuan: ind.nilaiPengetahuan ?? null,
        nilaiKeterampilan: ind.nilaiKeterampilan ?? null,
      });
    });
  }, [append, dataIndikator, remove]);

  const {
    mutate: mutateAddRapor,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (payload: IRapor) => {
      return await raporServices.addRapor(payload);
    },
    onError: (err) => {
      setToaster({
        type: "error",
        message: err.message || "Gagal menambah rapor",
      });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Berhasil menambah rapor" });
      reset();
    },
  });

  const handleAddRapor = (data: IRapor) => {
    const caberawitId = Number(id) || dataIndikator?.data?.caberawit?.id;
    if (!caberawitId) {
      setToaster({ type: "error", message: "caberawitId tidak ditemukan" });
      return;
    }

    const payload = {
      ...data,
      caberawitId: caberawitId,
      kelasJenjangId: String(data.kelasJenjangId),
      tahunAjaran: String(data.tahunAjaran),
      semester: String(data.semester),
      rapor: (data.rapor as IRapor["rapor"]).map((item) => ({
        indikatorKelasId: item.indikatorKelasId,
        nilaiPengetahuan: Number(item.nilaiPengetahuan ?? null),
        nilaiKeterampilan: Number(item.nilaiKeterampilan ?? null),
      })),
    };

    console.log("Submitting payload:", payload);
    mutateAddRapor(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    isPendingMutateAddRapor: isPending,
    isSuccessMutateAddRapor: isSuccess,
    isErrorMutateAddRapor: isError,
    handleAddRapor,
    raporFields: fields,
    dataIndikator,
    dataTA,
  };
};

export default useAddRapor;
