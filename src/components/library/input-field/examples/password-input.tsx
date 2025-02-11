"use client";

import React, { useState } from "react";
import InputField from "@/components/base/inputs/input-field";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <InputField
        label="Email"
        placeholder="Enter your email"
        InputProps={{
          startAdornment: <Mail className="h-4 w-4" />,
        }}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        InputProps={{
          startAdornment: <Lock className="h-4 w-4" />,
          endAdornment: (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          ),
        }}
      />
    </div>
  );
};

export default PasswordInput;
