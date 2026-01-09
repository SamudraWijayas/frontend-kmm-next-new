"use client";
import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useGetAbsen from "./useGetAbsen";
import { IAbsenByGenerus } from "@/types/Absen";

// Konfigurasi locale untuk react-big-calendar
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const GetAbsen = () => {
  const { dataAbsen } = useGetAbsen();

  // Convert dataAbsen API menjadi events untuk react-big-calendar
  const events = useMemo(() => {
    if (!dataAbsen) return [];

    return dataAbsen.map((absen: IAbsenByGenerus) => {
      const date = new Date(absen.tanggal); // parse tanggal dari API
      return {
        title: absen.status, // tampilkan status sebagai judul
        start: date,
        end: date, // biar event muncul di hari itu saja
        allDay: true, // supaya full-day event
      };
    });
  }, [dataAbsen]);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">📅 Kalender Absen</h1>
        {/* Nanti bisa ditambahkan dropdown bulan */}
      </div>

      <div className="p-4 rounded-lg shadow-lg bg-white">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={["month"]}
          className="text-black rounded-lg"
          popup
        />
      </div>
    </div>
  );
};

export default GetAbsen;
