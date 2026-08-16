"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import RequestsSidebar from "./_components/RequestsSidebar";
import OmniboxBar from "./_components/OmniboxBar";
import RequestBuilderPanel from "./_components/RequestBuilderPanel";
import ResponseViewer from "./_components/ResponseViewer";
import NewRequestModal from "./_components/NewRequestModal";
import RenameRequestModal from "./_components/RenameRequestModal";
import DeleteRequestDialog from "./_components/DeleteRequestDialog";
import { usePlaygroundWorkspace } from "./_components/usePlaygroundWorkspace";
import { ApiError } from "@/lib/apiClient";

export default function PlaygroundCollectionPage() {
  const params = useParams<{ projectId: string; collectionId: string }>();

  const {
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
  } = usePlaygroundWorkspace(params.projectId, params.collectionId);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-56px-48px)] items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={24} />
      </div>
    );
  }

  if (isError || !collection) {
    return (
      <div className="flex h-[calc(100vh-56px-48px)] flex-col items-center justify-center text-center">
        <p className="text-sm text-error">
          Couldn&apos;t load this collection. It may not exist or you may not
          have access.
        </p>
      </div>
    );
  }

  const executeErrorMessage =
    executeRequest.error instanceof ApiError
      ? executeRequest.error.message
      : undefined;

  return (
    <div className="flex h-[calc(100vh-56px-48px)] gap-4 overflow-hidden">
      <RequestsSidebar
        collectionName={collection.name}
        requests={requests}
        activeRequestId={activeRequestId}
        onSelectRequest={setActiveRequestId}
        onAddRequest={() => setIsNewRequestModalOpen(true)}
        onRenameRequest={setRenamingRequest}
        onDeleteRequest={setDeletingRequest}
      />

      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <OmniboxBar
          method={draftMethod}
          onMethodChange={setDraftMethod}
          fullUrl={fullUrl}
          onPathChange={setDraftPath}
          baseUrl={collection.baseUrl ?? ""}
          onSend={handleSend}
          isSending={executeRequest.isPending}
          onSave={handleSave}
          isSaving={updateRequest.isPending}
          isDirty={isDirty}
        />

        <div className="flex flex-1 gap-4 overflow-hidden">
          <RequestBuilderPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            method={draftMethod}
            headers={currentReq?.headers}
            body={draftBody}
            onBodyChange={setDraftBody}
          />
          <ResponseViewer
            result={displayedResult}
            isError={executeRequest.isError}
            errorMessage={executeErrorMessage}
            isStale={isShowingStaleResult}
          />
        </div>
      </div>

      <NewRequestModal
        open={isNewRequestModalOpen}
        onClose={() => setIsNewRequestModalOpen(false)}
        onCreate={handleCreateRequest}
        isPending={createRequest.isPending}
        isError={createRequest.isError}
      />

      <RenameRequestModal
        open={!!renamingRequest}
        initialName={renamingRequest?.name ?? ""}
        onClose={() => setRenamingRequest(null)}
        onRename={handleRenameRequest}
        isPending={updateRequest.isPending}
        isError={updateRequest.isError}
      />

      <DeleteRequestDialog
        open={!!deletingRequest}
        requestName={deletingRequest?.name ?? ""}
        onClose={() => setDeletingRequest(null)}
        onConfirm={handleConfirmDelete}
        isPending={deleteRequest.isPending}
      />
    </div>
  );
}
