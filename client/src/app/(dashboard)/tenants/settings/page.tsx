"use client";
import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import React from "react";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant] = useUpdateTenantSettingsMutation();
  if (isLoading) return <div>Loading...</div>;

  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateTenant({
        cognitoId: authUser?.userInfo.cognitoId,
        ...data,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log("authUser:", authUser);
  return <SettingsForm initialData={initialData} onSubmit={handleSubmit} userType="tenant"/>
};

export default TenantSettings;
