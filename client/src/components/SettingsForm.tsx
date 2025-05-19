import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";

const SettingsForm = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = ()=>{
    setEditMode(!editMode);
    if(!editMode){
      form.reset(initialData);
    }
  }

  const handleSubmit = async (data: SettingsFormData) => {
    try {
      await onSubmit(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="pt-8 pb-5 px-8">
      <div className="mb-5">
        <h1 className="text-xl font-semibold">
          {`${userType.charAt(0).toUpperCase() + userType.slice(1)}Settings`}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account settings and personal information.
        </p>
      </div>
      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <CustomFormField name="name" label="Name" disabled={!editMode}/>
          <CustomFormField name="email" label="Email" disabled={!editMode} type="email"/>
          <CustomFormField name="phoneNumber" label="Phone Number" disabled={!editMode}/>
          <div className="pt-4 flex justify-between">
            <Button type = "button" variant="outline" onClick={toggleEditMode} className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              {editMode ? "Cancel" : "Edit"}
            </Button>
            {editMode && (
              <Button type="submit" className="bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Save Changes
              </Button>
            )}
          </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsForm;
