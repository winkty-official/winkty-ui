"use client";
import { CodeExamples } from "@/components/docs/code-examples";
import { usageExamples } from "@/components/layout/auth-form/examples";
import React from "react";

const AuthIndex = () => {
  return (
    <div>
      <CodeExamples examples={usageExamples} />
    </div>
  );
};

export default AuthIndex;
