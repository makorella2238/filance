"use client";

import React, { useEffect } from "react";
import "./globals.css";
import { mainService } from "@/services/main.service";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      mainService.setAuthHeader(token);
    }
  }, []);

  return <>{children}</>;
}
