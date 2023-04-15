"use client";

import React from "react";
import Sidebar from "./Sidebar";
import PageContainer from "./PageContainer";

function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}

export default App;
