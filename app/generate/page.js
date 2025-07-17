// app/generate/page.js
"use client";
import { Suspense } from "react";
import GenerateForm from "./GenerateForm";

export default function GeneratePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateForm />
    </Suspense>
  );
}
