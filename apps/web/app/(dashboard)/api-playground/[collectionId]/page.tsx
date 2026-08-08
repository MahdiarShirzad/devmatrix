"use client";

import RequestsSidebar from "./_components/RequestsSidebar";
import OmniboxBar from "./_components/OmniboxBar";
import RequestBuilderPanel from "./_components/RequestBuilderPanel";
import ResponseViewer from "./_components/ResponseViewer";
import { usePlaygroundWorkspace } from "./_components/usePlaygroundWorkspace";

export default function PlaygroundCollectionPage() {
  const {
    activeRequest,
    setActiveRequest,
    activeTab,
    setActiveTab,
    currentReq,
  } = usePlaygroundWorkspace();

  return (
    <div className="flex h-[calc(100vh-56px-48px)] gap-4 overflow-hidden">
      <RequestsSidebar
        activeRequest={activeRequest}
        onSelectRequest={setActiveRequest}
      />

      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <OmniboxBar currentReq={currentReq} />

        <div className="flex flex-1 gap-4 overflow-hidden">
          <RequestBuilderPanel activeTab={activeTab} onTabChange={setActiveTab} />
          <ResponseViewer />
        </div>
      </div>
    </div>
  );
}
