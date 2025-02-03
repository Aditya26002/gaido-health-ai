"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "../../context/FormContext";
import { ChevronLeft, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SelectCity() {
  const { formData, updateFormData, nextStep, prevStep } = useForm();

  const popularCities = [
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Delhi",
    "Goa",
    "Kochi",
    "Kolkata",
    "Mangalore",
    "Hyderabad",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1">
          Select your city
        </h1>
      </div>

      <Input
        type="text"
        placeholder="Search city"
        value={formData.city}
        onChange={(e) => updateFormData({ city: e.target.value })}
      />

      <div>
        <h2 className="text-sm text-gray-600 mb-3">Popular cities</h2>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <Button
              key={city}
              variant={formData.city === city ? "default" : "outline"}
              onClick={() => updateFormData({ city })}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
        <Building2 className="w-6 h-6 text-gray-600" />
        <p className="text-sm text-gray-600">
          This will help us in finding the network of
          <br />
          <strong>Cashless Hospitals in your city</strong>
        </p>
      </div>

      <Button className="w-full" onClick={nextStep} disabled={!formData.city}>
        Continue
      </Button>
    </div>
  );
}
