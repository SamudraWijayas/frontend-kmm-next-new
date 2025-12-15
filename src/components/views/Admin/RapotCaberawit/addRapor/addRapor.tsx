import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddRapor from "./useAddRapor";
import { ITA } from "@/types/Rapor";

interface IIndikator {
  indikatorId?: string;
  indikator: string;
  nilaiPengetahuan?: number | null;
  nilaiKeterampilan?: number | null;
}

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchRapor: () => void;
}

const AddRapor = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchRapor,
}: PropTypes) => {
  const {
    control,
    handleSubmit,
    errors,
    isPendingMutateAddRapor,
    isSuccessMutateAddRapor,
    handleAddRapor,
    raporFields,
    dataIndikator,
    dataTA,
  } = useAddRapor();

  useEffect(() => {
    if (isSuccessMutateAddRapor) {
      onClose();
      refetchRapor();
    }
  }, [isSuccessMutateAddRapor, onClose, refetchRapor]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleAddRapor)}>
        <ModalContent>
          <ModalHeader>Add Rapor</ModalHeader>
          <ModalBody>
            {/* Caberawit ID is taken from route params and not shown in the form */}

            {/* Kelas Jenjang */}
            <Controller
              name="kelasJenjangId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Kelas Jenjang"
                  isInvalid={!!errors.kelasJenjangId}
                  errorMessage={errors.kelasJenjangId?.message}
                  className="mb-2"
                />
              )}
            />

            {/* Tahun Ajaran */}
            <Controller
              name="tahunAjaran"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full mb-2"
                  size="sm"
                  placeholder="Tahun Ajaran"
                  selectedKeys={
                    field.value ? new Set([String(field.value)]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string | undefined;
                    field.onChange(selected || "");
                  }}
                  variant="flat"
                  items={[
                    ...(dataTA || []).map((ta: ITA) => ({
                      key: ta.id,
                      label: ta.name,
                    })),
                  ]}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              )}
            />

            {/* Semester */}
            <Controller
              name="semester"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Semester"
                  selectedKeys={
                    field.value ? new Set([field.value]) : new Set()
                  }
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0])
                  }
                  items={["GANJIL", "GENAP"].map((s) => ({ key: s, label: s }))}
                >
                  {(item) => <SelectItem>{item.label}</SelectItem>}
                </Select>
              )}
            />

            {/* Rapor Array */}
            {/* Render semua indikator dari raporFields */}
            {raporFields.map((field, index) => {
              // cari data indikator asli dari dataIndikator
              const indikatorFlat =
                dataIndikator?.data?.indikator.flatMap(
                  (kategori: any) => kategori.indikator
                ) || [];

              const ind = indikatorFlat[index];
              const indikatorName = ind?.indikator || "Tidak diketahui";
              const hasIndikator = !!ind?.indikatorId;

              return (
                <div
                  key={field.id}
                  className={`mb-5 p-4 rounded-2xl shadow-sm border ${
                    hasIndikator
                      ? "border-gray-200 bg-white"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Indikator</span>

                    <span
                      className={`px-2 py-1 text-[10px] rounded-full font-medium ${
                        hasIndikator
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {hasIndikator ? "Tersedia" : "Tidak tersedia"}
                    </span>
                  </div>

                  <p
                    className={`font-semibold text-sm mb-3 ${
                      hasIndikator ? "text-gray-800" : "text-red-600"
                    }`}
                  >
                    {indikatorName}
                  </p>

                  {/* Hidden */}
                  <Controller
                    name={`rapor.${index}.indikatorKelasId`}
                    control={control}
                    render={({ field }) => <input {...field} type="hidden" />}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Controller
                      name={`rapor.${index}.nilaiPengetahuan`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={String(field.value ?? "")}
                          label="Nilai Pengetahuan"
                          disabled={!hasIndikator}
                        />
                      )}
                    />

                    <Controller
                      name={`rapor.${index}.nilaiKeterampilan`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={String(field.value ?? "")}
                          label="Nilai Keterampilan"
                          disabled={!hasIndikator}
                        />
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
              disabled={isPendingMutateAddRapor}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateAddRapor}
            >
              {isPendingMutateAddRapor ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Rapor"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddRapor;
