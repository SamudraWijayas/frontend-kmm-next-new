"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatistikItem {
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const CountStatistikGenerusDaerah = ({ data, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 640);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-gray-400 text-sm">
        Data statistik belum tersedia
      </div>
    );
  }

  const labels = data.map((d) => d.jenjangNama);
  const values = data.map((d) => d.total);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      {/* container ukuran tetap */}
      <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64">
        <Pie
          data={{
            labels,
            datasets: [
              {
                label: "Jumlah Generus",
                data: values,
                backgroundColor: [
                  "#6366F1",
                  "#22C55E",
                  "#F59E0B",
                  "#EF4444",
                  "#06B6D4",
                  "#A855F7",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false, // 🔑 ini kuncinya
            plugins: {
              legend: {
                position: isMobile ? "bottom" : "right",
                labels: {
                  font: { size: 11 },
                  boxWidth: 12,
                },
              },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.label}: ${ctx.raw} generus`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CountStatistikGenerusDaerah;
