"use client";
import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";
import React from "react";

const ManagerSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManager] = useUpdateManagerSettingsMutation();
  if (isLoading) return <div>Loading...</div>;

  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateManager({
        cognitoId: authUser?.userInfo.cognitoId,
        ...data,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log("authUser:", authUser);
  return <SettingsForm initialData={initialData} onSubmit={handleSubmit} userType="manager"/>
};

export default ManagerSettings;
