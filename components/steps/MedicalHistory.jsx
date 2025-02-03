"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useForm } from "../../context/FormContext";
import { ChevronLeft, Lightbulb } from "lucide-react";

export function MedicalHistory() {
  const { formData, updateFormData, nextStep, prevStep } = useForm();

  const conditions = [
    "Diabetes",
    "Blood Pressure",
    "Heart Disease",
    "Any Surgery",
    "Thyroid",
    "Asthma",
    "Other Disease",
    "None of These",
  ];

  const toggleCondition = (condition) => {
    const current = formData.medicalConditions;
    const updated = current.includes(condition)
      ? current.filter((c) => c !== condition)
      : [...current, condition];
    updateFormData({ medicalConditions: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1">
          Medical History
        </h1>
      </div>

      <p className="text-gray-600">
        Do any member(s) have any existing illnesses for which they take regular
        medication?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((condition) => (
          <label
            key={condition}
            className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer"
          >
            <Checkbox
              checked={formData.medicalConditions.includes(condition)}
              onCheckedChange={() => toggleCondition(condition)}
            />
            <span>{condition}</span>
          </label>
        ))}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg flex gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <p className="text-sm text-yellow-800">
          We will find you plans that cover your condition.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span>Get Updates on WhatsApp</span>
        <Switch
          checked={formData.whatsappUpdates}
          onCheckedChange={(checked) =>
            updateFormData({ whatsappUpdates: checked })
          }
        />
      </div>

      <Button className="w-full" onClick={nextStep}>
        Continue
      </Button>
    </div>
  );
}
