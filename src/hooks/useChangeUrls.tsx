"use client";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import useDebounce from "./useDebounce";

const useChangeUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  // ✅ Ambil params langsung dari useSearchParams (reactive & stabil)
  const currentLimit = searchParams.get("limit") ?? String(LIMIT_DEFAULT);

  const currentPage = searchParams.get("page") ?? String(PAGE_DEFAULT);

  const currentSearch = searchParams.get("search") ?? "";

  const currentCategory = searchParams.get("category") ?? "";

  const currentIsOnline = searchParams.get("isOnline") ?? "";

  const currentIsFeatured = searchParams.get("isFeatured") ?? "";

  // ✅ Helper update URL yang aman
  const setParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      const currentUrl = `${pathname}?${searchParams.toString()}`;

      if (newUrl !== currentUrl) {
        router.replace(newUrl);
      }
    },
    [pathname, router, searchParams],
  );

  // =========================
  // Handlers
  // =========================

  const handleChangePage = (page: number) => {
    setParams({ page });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    setParams({ limit: selectedLimit, page: PAGE_DEFAULT });
  };

  const handleChangeCategory = (category: string) => {
    setParams({ category, page: PAGE_DEFAULT });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    setParams({ isOnline, page: PAGE_DEFAULT });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    setParams({ isFeatured, page: PAGE_DEFAULT });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    debounce(() => {
      setParams({ search, page: PAGE_DEFAULT });
    }, DELAY);
  };

  const handleClearSearch = () => {
    setParams({ search: "", page: PAGE_DEFAULT });
  };

  const isParamsReady = !!currentLimit && !!currentPage;

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,

    isParamsReady,
  };
};

export default useChangeUrl;
