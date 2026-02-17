"use client";

import { Button } from "@heroui/react";
import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallButton() {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  // Don't show button if already installed or not installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <Button
      color="primary"
      variant="flat"
      size="sm"
      startContent={<Download size={16} />}
      onPress={installApp}
      className="ml-2"
    >
      Instal App
    </Button>
  );
}
