"use client";

import { Tab, Tabs } from "@heroui/react";
import DaerahTab from "./DaerahTab";
import DesaTab from "./DesaTab";
import KelompokTab from "./KelompokTab";

const User = () => {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="daerah" title="Daerah">
        <DaerahTab />
      </Tab>
      <Tab key="desa" title="Desa">
        <DesaTab />
      </Tab>
      <Tab key="kelompok" title="Kelompok">
        <KelompokTab />
      </Tab>
    </Tabs>
  );
};

export default User;
