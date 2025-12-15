import { IDataKegiatan, IKegiatanForm } from "@/types/Kegiatan";
import React, { useEffect } from "react";
import useUpdateTab from "./useUpdateTab";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import { IDesa } from "@/types/Desa";
import { IDaerah } from "@/types/Daerah";
import { IKelompok } from "@/types/Kelompok";
import { IJenjang } from "@/types/Jenjang";

interface PropTypes {
  dataKegiatan: IDataKegiatan;
  onUpdate: (data: IKegiatanForm) => void;
  isPendingUpdate: boolean;
}

const UpdateTab = ({ dataKegiatan, onUpdate, isPendingUpdate }: PropTypes) => {
  const {
    controlUpdateKegiatan,
    handleSubmitUpdateKegiatan,
    errorsUpdateKegiatan,
    setValueUpdateKegiatan,
    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
  } = useUpdateTab();

  const k = dataKegiatan?.kegiatan;

  const desaList = dataDesa?.data?.data || [];
  const daerahList = dataDaerah?.data?.data || [];
  const kelompokList = dataKelompok?.data?.data || [];
  const jenjangList = dataJenjang?.data?.data || [];

  // Set initial values
  useEffect(() => {
    if (!k) return;

    setValueUpdateKegiatan("name", k.name || "");
    setValueUpdateKegiatan("tingkat", k.tingkat || "");
    setValueUpdateKegiatan("desaId", k.desaId ?? undefined);
    setValueUpdateKegiatan("daerahId", k.daerahId ?? undefined);
    setValueUpdateKegiatan("kelompokId", k.kelompokId ?? undefined);
    setValueUpdateKegiatan(
      "jenjangIds",
      (k.sasaran
        ?.map((s) => s.jenjang?.id)
        .filter((id): id is string => id != null) as string[]) || []
    );

    if (k.startDate) {
      setValueUpdateKegiatan(
        "startDate",
        typeof k.startDate === "string"
          ? parseDate(k.startDate.split("T")[0])
          : k.startDate
      );
    }

    if (k.endDate) {
      setValueUpdateKegiatan(
        "endDate",
        typeof k.endDate === "string"
          ? parseDate(k.endDate.split("T")[0])
          : k.endDate
      );
    }
  }, [k, setValueUpdateKegiatan]);

  // Render field sesuai tingkat DB
  const renderConditionalField = () => {
    switch (k?.tingkat) {
      case "DESA":
        return (
          <Skeleton isLoaded={!!k.desaId}>
            <Controller
              name="desaId"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  selectedKey={field.value ?? ""}
                  defaultItems={desaList}
                  label="Desa"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errorsUpdateKegiatan.desaId}
                  errorMessage={errorsUpdateKegiatan.desaId?.message}
                  onSelectionChange={field.onChange}
                  placeholder="Search desa here..."
                >
                  {(desa: IDesa) => (
                    <AutocompleteItem key={desa.id}>
                      {desa.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
        );
      case "DAERAH":
        return (
          <Skeleton isLoaded={!!k.daerahId}>
            <Controller
              name="daerahId"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  selectedKey={field.value ?? ""}
                  defaultItems={daerahList}
                  label="Daerah"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errorsUpdateKegiatan.daerahId}
                  errorMessage={errorsUpdateKegiatan.daerahId?.message}
                  onSelectionChange={field.onChange}
                  placeholder="Search daerah here..."
                >
                  {(daerah: IDaerah) => (
                    <AutocompleteItem key={daerah.id}>
                      {daerah.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
        );
      case "KELOMPOK":
        return (
          <Skeleton isLoaded={!!k.kelompokId}>
            <Controller
              name="kelompokId"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Kelompok"
                  variant="bordered"
                  value={field.value ?? ""}
                >
                  {kelompokList.map((k: IKelompok) => (
                    <SelectItem key={k.id}>{k.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </Skeleton>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl lg:w-2/3">
      <CardHeader className="flex flex-col items-start space-y-2 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Kegiatan Information
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Manage and update information of this kegiatan{" "}
        </p>
      </CardHeader>

      <CardBody className="p-6">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmitUpdateKegiatan(onUpdate)}
        >
          <Skeleton isLoaded={!!k}>
            <Controller
              name="name"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Nama Kegiatan"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={!!errorsUpdateKegiatan.name}
                  errorMessage={errorsUpdateKegiatan.name?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!k}>
            <Controller
              name="startDate"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ?? null}
                  label="Start Date"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  isInvalid={!!errorsUpdateKegiatan.startDate}
                  errorMessage={errorsUpdateKegiatan.startDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!k}>
            <Controller
              name="endDate"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ?? null}
                  label="End Date"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  isInvalid={!!errorsUpdateKegiatan.endDate}
                  errorMessage={errorsUpdateKegiatan.endDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!k}>
            <Controller
              name="tingkat"
              control={controlUpdateKegiatan}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Tingkat"
                  variant="bordered"
                  className="rounded-xl"
                  labelPlacement="outside"
                  type="text"
                  isDisabled
                />
              )}
            />
          </Skeleton>

          {renderConditionalField()}

          <Skeleton isLoaded={!!k}>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Jenjang</label>
              {jenjangList.map((jenj: IJenjang) => {
                const jenjId = jenj.id!;
                return (
                  <Controller
                    key={jenjId}
                    name="jenjangIds"
                    control={controlUpdateKegiatan}
                    render={({ field }) => {
                      const checked = field.value?.includes(jenjId) ?? false;
                      return (
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={jenjId}
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  jenjId,
                                ]);
                              } else {
                                field.onChange(
                                  (field.value || []).filter(
                                    (id: string) => id !== jenjId
                                  )
                                );
                              }
                            }}
                          />
                          {jenj.name}
                        </label>
                      );
                    }}
                  />
                );
              })}
            </div>
          </Skeleton>

          <div className="flex justify-end">
            <Button
              color="primary"
              size="lg"
              className="disabled:bg-default-500 rounded-xl px-6 font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              type="submit"
              disabled={isPendingUpdate || !k?.id}
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default UpdateTab;
