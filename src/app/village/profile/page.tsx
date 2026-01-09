import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Admin/Profile/Profile";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="DESA" title="Update Profile">
      <Profile />
    </DashboardLayout>
  );
};

export default ListUsersPage;
