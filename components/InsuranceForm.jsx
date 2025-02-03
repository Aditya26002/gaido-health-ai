"use client";

import { FormProvider } from "../context/FormContext";
import { SelectMembers } from "./steps/SelectMembers";
import { SelectAge } from "./steps/SelectAge";
import { SelectCity } from "./steps/SelectCity";
import { MedicalHistory } from "./steps/MedicalHistory";
import { Confirmation } from "./steps/Confirmation";
import { useForm } from "../context/FormContext";

function FormSteps() {
  const { currentStep } = useForm();

  const steps = [
    <SelectMembers key="members" />,
    <SelectAge key="age" />,
    <SelectCity key="city" />,
    <MedicalHistory key="medical" />,
    <Confirmation key="confirmation" />,
  ];

  return steps[currentStep];
}

export function InsuranceForm() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-6">
          <FormSteps />
        </div>
      </div>
    </FormProvider>
  );
}
