"use client";

import { useState } from "react";
import {
  useCollection,
  useExecuteRequest,
  useUpdateRequest,
  useCreateRequest,
  useDeleteRequest,
} from "@/hooks/usePlayground";
import type { HttpMethod, SavedRequest } from "@/types/playground.types";
import type { RequestTab } from "./constants";

export function usePlaygroundWorkspace(
  projectId: string,
  collectionId: string,
) {
  const { data, isLoading, isError } = useCollection(projectId, collectionId);
  const executeRequest = useExecuteRequest(projectId, collectionId);
  const updateRequest = useUpdateRequest(projectId, collectionId);
  const createRequest = useCreateRequest(projectId, collectionId);
  const deleteRequest = useDeleteRequest(projectId, collectionId);

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<RequestTab>("Params");
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [renamingRequest, setRenamingRequest] = useState<SavedRequest | null>(
    null,
  );
  const [deletingRequest, setDeletingRequest] = useState<SavedRequest | null>(
    null,
  );

  const requests = data?.requests ?? [];
  const collection = data?.collection;

  const activeRequestId =
    selectedRequestId && requests.some((r) => r._id === selectedRequestId)
      ? selectedRequestId
      : (requests[0]?._id ?? null);

  const currentReq = requests.find((r) => r._id === activeRequestId);

  const [prevRequestId, setPrevRequestId] = useState<string | null>(null);
  const [draftMethod, setDraftMethod] = useState<HttpMethod>("GET");
  const [draftPath, setDraftPath] = useState("");
  const [draftBody, setDraftBody] = useState("");

  if (currentReq && currentReq._id !== prevRequestId) {
    setPrevRequestId(currentReq._id);
    setDraftMethod(currentReq.method);
    setDraftPath(currentReq.path);
    setDraftBody(currentReq.body ?? "");
    executeRequest.reset();
  }

  const fullUrl = `${collection?.baseUrl ?? ""}${draftPath}`;

  const isDirty =
    !!currentReq &&
    (draftMethod !== currentReq.method ||
      draftPath !== currentReq.path ||
      draftBody !== (currentReq.body ?? ""));

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
        setSelectedRequestId(res.data.request._id);
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
        if (selectedRequestId === deletingRequest._id) {
          setSelectedRequestId(null);
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
    setActiveRequestId: setSelectedRequestId,
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
