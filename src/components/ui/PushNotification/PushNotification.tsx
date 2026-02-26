"use client";
import { subscribePush } from "@/libs/push";
import { useEffect } from "react";

export default function PushNotification() {
  useEffect(() => {
    async function init() {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered");

        await subscribePush(); // INI HARUS DIPANGGIL
      }
    }
    init();
  }, []);

  return null;
}
