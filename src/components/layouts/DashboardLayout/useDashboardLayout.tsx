import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDashboardLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Di App Router, router selalu tersedia, jadi ini opsional
    setIsReady(true);
  }, []);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });
  return {
    dataProfile,
  };
};

export default useDashboardLayout;
