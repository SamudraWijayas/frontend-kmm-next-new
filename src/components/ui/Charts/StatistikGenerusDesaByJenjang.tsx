"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface StatistikItem {
  kelompokId: string;
  kelompokNama: string;
  jenjangId: string;
  jenjangNama: string;
  total: number;
}

interface Props {
  data: StatistikItem[] | undefined;
  loading?: boolean;
}

const StatistikGenerusDesaByJenjang = ({ data, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-48 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-gray-400">Data statistik belum tersedia</p>;
  }

  // X-axis → jenjang
  const jenjangLabels = Array.from(
    new Set(data.map((item) => item.jenjangNama))
  );

  // garis → kelompok
  const kelompokList = Array.from(
    new Set(data.map((item) => item.kelompokNama))
  );

  // 🎨 warna persis seperti LineVillage
  const borderColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
  ];

  const backgroundColors = [
    "rgba(255, 99, 132, 0.1)",
    "rgba(54, 162, 235, 0.1)",
    "rgba(255, 206, 86, 0.1)",
    "rgba(75, 192, 192, 0.1)",
    "rgba(153, 102, 255, 0.1)",
  ];

  const datasets = kelompokList.map((kelompok, index) => ({
    label: kelompok,
    data: jenjangLabels.map((jenjang) => {
      const found = data.find(
        (d) => d.kelompokNama === kelompok && d.jenjangNama === jenjang
      );
      return found ? found.total : 0;
    }),
    borderColor: borderColors[index % borderColors.length],
    backgroundColor: backgroundColors[index % backgroundColors.length],
    fill: true,
    tension: 0.3,
    pointRadius: 4,
  }));

  const chartData = {
    labels: jenjangLabels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          display: !isMobile,
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: isMobile ? 0 : 12,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatistikGenerusDesaByJenjang;
