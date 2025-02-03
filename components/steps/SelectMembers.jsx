"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "../../context/FormContext";
import { User, Users, Baby, Heart, Plus, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export function SelectMembers() {
  const { formData, updateFormData, nextStep } = useForm();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMember, setCustomMember] = useState("");

  const memberTypes = [
    { type: "Self", icon: User, color: "bg-blue-50 text-blue-400" },
    { type: "Wife", icon: Heart, color: "bg-red-50 text-red-400" },
    { type: "Son", icon: Baby, color: "bg-green-50 text-green-400" },
    { type: "Daughter", icon: Baby, color: "bg-purple-50 text-purple-400" },
    { type: "Father", icon: Users, color: "bg-orange-50 text-orange-400" },
    { type: "Mother", icon: Users, color: "bg-pink-50 text-pink-400" },
  ];

  const toggleMember = (type, custom = false) => {
    const exists = formData.members.some((m) => m.type === type);
    if (exists) {
      updateFormData({
        members: formData.members.filter((m) => m.type !== type),
      });
    } else {
      updateFormData({
        members: [...formData.members, { type, custom }],
      });
    }
  };

  const addCustomMember = () => {
    if (
      customMember &&
      !formData.members.some((m) => m.type === customMember)
    ) {
      toggleMember(customMember, true);
      setCustomMember("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Find the best plan for your family
      </h1>

      <div className="flex justify-center gap-4">
        <Button
          variant={formData.gender === "Male" ? "default" : "outline"}
          onClick={() => updateFormData({ gender: "Male" })}
        >
          Male
        </Button>
        <Button
          variant={formData.gender === "Female" ? "default" : "outline"}
          onClick={() => updateFormData({ gender: "Female" })}
        >
          Female
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">
          Select members you want to insure
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memberTypes.map(({ type, icon: Icon, color }) => {
            const isSelected = formData.members.some((m) => m.type === type);
            return (
              <button
                key={type}
                onClick={() => toggleMember(type)}
                className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-colors
                  ${
                    isSelected
                      ? "bg-gray-50 border-black font-semibold"
                      : "border-gray-200 hover:border-black"
                  }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span>{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="text-sm font-semibold cursor-pointer flex items-center"
          onClick={() => setShowCustomInput(!showCustomInput)}
        >
          More members
          <ChevronDown
            className={`w-4 h-4 inline-block ml-1 transition-transform duration-300 ${
              showCustomInput ? "-rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`grid transition-all duration-300 ${
          showCustomInput
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex gap-2 py-2">
            <Input
              placeholder="Enter custom member type"
              value={customMember}
              onChange={(e) => setCustomMember(e.target.value)}
            />
            <Button onClick={addCustomMember} disabled={!customMember}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {formData.members.some((m) => m.custom) && (
        <div className="space-y-2">
          <h3 className="font-medium">Custom Members:</h3>
          {formData.members
            .filter((m) => m.custom)
            .map((member) => (
              <div
                key={member.type}
                className="flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <span>{member.type}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMember(member.type)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
        </div>
      )}

      <Button
        className="w-full"
        onClick={nextStep}
        disabled={formData.members.length === 0}
      >
        Continue
      </Button>

      <p className="text-sm text-center text-gray-500">
        By clicking on "Continue", you agree to our{" "}
        <a href="#" className="text-black hover:underline">
          Privacy Policy
        </a>
        ,{" "}
        <a href="#" className="text-black hover:underline">
          Terms of Use
        </a>{" "}
        &{" "}
        <a href="#" className="text-black hover:underline">
          Disclaimer
        </a>
      </p>
    </div>
  );
}
