"use client";
import { useForm } from "../../context/FormContext";
import { Check } from "lucide-react";

export function Confirmation() {
  const { formData } = useForm();

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold">Thank you for your submission!</h1>

      <div className="space-y-4 text-left bg-gray-50 p-6 rounded-lg">
        <h2 className="font-semibold">Your Details:</h2>
        <div className="space-y-2">
          <p>Gender: {formData.gender}</p>
          <p>
            Members:{" "}
            {formData.members.map((m) => `${m.type} (${m.age}yr)`).join(", ")}
          </p>
          <p>City: {formData.city}</p>
          {formData.medicalConditions.length > 0 && (
            <p>Medical Conditions: {formData.medicalConditions.join(", ")}</p>
          )}
          <p>WhatsApp Updates: {formData.whatsappUpdates ? "Yes" : "No"}</p>
        </div>
      </div>

      <p className="text-gray-600">
        We will process your information and get back to you shortly with the
        best insurance plans for your family.
      </p>
    </div>
  );
}
