"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext(undefined);

const initialFormData = {
  gender: "Male",
  members: [{ type: "Self" }],
  city: "",
  medicalConditions: [],
  whatsappUpdates: false,
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <FormContext.Provider
      value={{ formData, currentStep, updateFormData, nextStep, prevStep }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within FormProvider");
  return context;
};
