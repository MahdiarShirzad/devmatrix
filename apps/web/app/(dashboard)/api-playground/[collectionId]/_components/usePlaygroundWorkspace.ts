"use client";

import { useEffect, useState } from "react";
import {
  useCollection,
  useExecuteRequest,
  useUpdateRequest,
  useCreateRequest,
  useDeleteRequest,
} from "@/hooks/usePlayground";
import type { HttpMethod, SavedRequest } from "@/types/playground.types";
import type { RequestTab } from "./constants";

export function usePlaygroundWorkspace(collectionId: string) {
  const { data, isLoading, isError } = useCollection(collectionId);
  const executeRequest = useExecuteRequest(collectionId);
  const updateRequest = useUpdateRequest(collectionId);
  const createRequest = useCreateRequest(collectionId);
  const deleteRequest = useDeleteRequest(collectionId);

  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<RequestTab>("Params");
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [renamingRequest, setRenamingRequest] = useState<SavedRequest | null>(
    null,
  );
  const [deletingRequest, setDeletingRequest] = useState<SavedRequest | null>(
    null,
  );

  // Draft fields the user can edit before sending — seeded from the
  // selected saved request, written back to the server via handleSave.
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

  // Reset drafts (and any in-flight execution result) whenever the selected request changes
  useEffect(() => {
    if (currentReq) {
      setDraftMethod(currentReq.method);
      setDraftPath(currentReq.path);
      setDraftBody(currentReq.body ?? "");
      executeRequest.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReq?._id]);

  const fullUrl = `${collection?.baseUrl ?? ""}${draftPath}`;

  const isDirty =
    !!currentReq &&
    (draftMethod !== currentReq.method ||
      draftPath !== currentReq.path ||
      draftBody !== (currentReq.body ?? ""));

  // Prefer a fresh execution result; fall back to the persisted lastResponse
  // for this request so switching back to it still shows something.
  const displayedResult = executeRequest.data?.data ?? currentReq?.lastResponse;
  const isShowingStaleResult =
    !executeRequest.data?.data && !!currentReq?.lastResponse;

  const handleSend = () => {
    executeRequest.mutate({
      method: draftMethod,
      url: fullUrl,
      headers: currentReq?.headers,
      body: draftMethod === "GET" ? undefined : draftBody,
      requestId: activeRequestId ?? undefined,
    });
  };

  const handleSave = () => {
    if (!activeRequestId || !isDirty) return;

    updateRequest.mutate({
      id: activeRequestId,
      method: draftMethod,
      path: draftPath,
      body: draftBody,
    });
  };

  const handleCreateRequest = (payload: {
    name: string;
    method: HttpMethod;
    path: string;
  }) => {
    createRequest.mutate(payload, {
      onSuccess: (res) => {
        setActiveRequestId(res.data.request._id);
        setIsNewRequestModalOpen(false);
      },
    });
  };

  const handleRenameRequest = (name: string) => {
    if (!renamingRequest) return;

    updateRequest.mutate(
      { id: renamingRequest._id, name },
      {
        onSuccess: () => setRenamingRequest(null),
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!deletingRequest) return;

    deleteRequest.mutate(deletingRequest._id, {
      onSuccess: () => {
        // If the deleted request was active, clear selection so the
        // "pick first request" effect can choose a new one.
        if (activeRequestId === deletingRequest._id) {
          setActiveRequestId(null);
        }
        setDeletingRequest(null);
      },
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
    handleSave,
    isDirty,
    updateRequest,
    isNewRequestModalOpen,
    setIsNewRequestModalOpen,
    handleCreateRequest,
    createRequest,
    displayedResult,
    isShowingStaleResult,
    renamingRequest,
    setRenamingRequest,
    handleRenameRequest,
    deletingRequest,
    setDeletingRequest,
    handleConfirmDelete,
    deleteRequest,
  };
}
