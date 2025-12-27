"use client";

import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      {children}
      <Toaster position="top-right" />
    </AppProvider>
  );
}
