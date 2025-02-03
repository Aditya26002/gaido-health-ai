"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "../../context/FormContext";
import {
  ChevronLeft,
  User,
  Users,
  Baby,
  Heart,
  HelpCircle,
} from "lucide-react";

export function SelectAge() {
  const { formData, updateFormData, nextStep, prevStep } = useForm();

  const updateMemberAge = (type, age) => {
    updateFormData({
      members: formData.members.map((m) =>
        m.type === type ? { ...m, age: Number.parseInt(age) } : m
      ),
    });
  };

  const ages = Array.from({ length: 100 }, (_, i) => i + 1);

  const getMemberIcon = (type) => {
    switch (type) {
      case "Self":
        return User;
      case "Wife":
        return Heart;
      case "Son":
      case "Daughter":
        return Baby;
      case "Father":
      case "Mother":
        return Users;
      default:
        return HelpCircle;
    }
  };

  const getMemberColor = (type) => {
    switch (type) {
      case "Self":
        return "bg-blue-50 text-blue-400";
      case "Wife":
        return "bg-red-50 text-red-400";
      case "Son":
        return "bg-green-50 text-green-400";
      case "Daughter":
        return "bg-purple-50 text-purple-400";
      case "Father":
        return "bg-orange-50 text-orange-400";
      case "Mother":
        return "bg-pink-50 text-pink-400";
      default:
        return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-center flex-1">
          Select age of covered member(s)
        </h1>
      </div>

      <div className="space-y-4">
        {formData.members.map((member) => {
          const Icon = getMemberIcon(member.type);
          const color = getMemberColor(member.type);
          return (
            <div key={member.type} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600 block mb-1">
                  {member.type}'s age
                </label>
                <Select
                  value={member.age?.toString()}
                  onValueChange={(value) => updateMemberAge(member.type, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {ages.map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} yr
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        className="w-full"
        onClick={nextStep}
        disabled={!formData.members.every((m) => m.age)}
      >
        Continue
      </Button>
    </div>
  );
}
