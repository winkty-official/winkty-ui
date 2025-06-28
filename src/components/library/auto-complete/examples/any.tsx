"use client";
import Autocomplete from "@/components/ui/auto-complete";
import { useState } from "react";
import predefinedSkills from "../data/allSkills.json";

export function SkillsInputExample() {
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skills Input with Custom Values</h2>
      <Autocomplete
        multiSelect
        options={predefinedSkills}
        value={skills}
        onChange={setSkills as (value: string | string[] | null) => void}
        placeholder="Select or type your skills..."
        any={true} // Allow custom skill input
      />
      <p>
        Selected skills:{" "}
        {skills.length > 0
          ? skills.map((skill) => skill).join(", ")
          : "None"}
      </p>
    </div>
  );
}
