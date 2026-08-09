"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import RequestsSidebar from "./_components/RequestsSidebar";
import OmniboxBar from "./_components/OmniboxBar";
import RequestBuilderPanel from "./_components/RequestBuilderPanel";
import ResponseViewer from "./_components/ResponseViewer";
import { usePlaygroundWorkspace } from "./_components/usePlaygroundWorkspace";
import { ApiError } from "@/lib/apiClient";

export default function PlaygroundCollectionPage() {
  const params = useParams<{ collectionId: string }>();

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
  } = usePlaygroundWorkspace(params.collectionId);

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
        onAddRequest={() => {
          // TODO: open a "new request" modal — creation flow not built yet
        }}
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
            result={executeRequest.data?.data}
            isError={executeRequest.isError}
            errorMessage={executeErrorMessage}
          />
        </div>
      </div>
    </div>
  );
}
