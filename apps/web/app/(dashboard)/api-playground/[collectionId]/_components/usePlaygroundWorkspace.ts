"use client";

import { useState } from "react";
import { REQUESTS, RequestTab } from "./constants";

export function usePlaygroundWorkspace() {
  const [activeRequest, setActiveRequest] = useState("req_2");
  const [activeTab, setActiveTab] = useState<RequestTab>("Body");

  const currentReq = REQUESTS.find((req) => req.id === activeRequest);

  return {
    activeRequest,
    setActiveRequest,
    activeTab,
    setActiveTab,
    currentReq,
  };
}
