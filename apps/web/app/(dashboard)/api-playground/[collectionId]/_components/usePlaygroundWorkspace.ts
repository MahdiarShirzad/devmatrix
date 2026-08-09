"use client";

import { useEffect, useState } from "react";
import { useCollection, useExecuteRequest } from "@/hooks/usePlayground";
import type { HttpMethod, SavedRequest } from "@/types/playground.types";
import type { RequestTab } from "./constants";

export function usePlaygroundWorkspace(collectionId: string) {
  const { data, isLoading, isError } = useCollection(collectionId);
  const executeRequest = useExecuteRequest();

  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<RequestTab>("Params");

  // Draft fields the user can edit before sending — seeded from the
  // selected saved request, but not written back until they explicitly save.
  const [draftMethod, setDraftMethod] = useState<HttpMethod>("GET");
  const [draftPath, setDraftPath] = useState("");
  const [draftBody, setDraftBody] = useState("");

  const requests = data?.requests ?? [];
  const collection = data?.collection;

  // Pick the first request once the collection loads, if nothing is selected yet
  useEffect(() => {
    if (!activeRequestId && requests.length > 0) {
      setActiveRequestId(requests[0]._id);
    }
  }, [requests, activeRequestId]);

  const currentReq: SavedRequest | undefined = requests.find(
    (r) => r._id === activeRequestId,
  );

  // Reset drafts whenever the selected request changes
  useEffect(() => {
    if (currentReq) {
      setDraftMethod(currentReq.method);
      setDraftPath(currentReq.path);
      setDraftBody(currentReq.body ?? "");
    }
  }, [currentReq]);

  const fullUrl = `${collection?.baseUrl ?? ""}${draftPath}`;

  const handleSend = () => {
    executeRequest.mutate({
      method: draftMethod,
      url: fullUrl,
      headers: currentReq?.headers,
      body: draftMethod === "GET" ? undefined : draftBody,
    });
  };

  return {
    isLoading,
    isError,
    collection,
    requests,
    activeRequestId,
    setActiveRequestId,
    activeTab,
    setActiveTab,
    currentReq,
    draftMethod,
    setDraftMethod,
    draftPath,
    setDraftPath,
    draftBody,
    setDraftBody,
    fullUrl,
    handleSend,
    executeRequest,
  };
}
