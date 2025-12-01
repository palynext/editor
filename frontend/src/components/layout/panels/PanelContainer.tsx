import React, { useEffect } from "react";
import { usePanelManager } from "../../../core/panel/PanelManager";
import DockArea from "./DockArea";
import FloatingPanel from "./FloatingPanel";
import { panelRegistry } from "@/core/panel/PanelRegistry";
import { PanelDescriptor } from "@/core/panel/PanelTypes";
import { EventsOn } from "../../../../wailsjs/runtime";
import FileTreePanel from "@/components/panels/FileTreePanel";
import EditorPanel from "@/components/panels/EditorPanel";
import TerminalPanel from "@/components/panels/TerminalPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function PanelContainer() {
  const { panels, openPanel } = usePanelManager();

  // Register defatult panels here if needed
  const editor: PanelDescriptor = {
    id: "editor",
    title: "Editor",
    component: EditorPanel,
    dock: "float",
  };

  const fileTree: PanelDescriptor = {
    id: "filetree",
    title: "File Tree",
    component: FileTreePanel,
    dock: "left",
  };

  const consolePanel: PanelDescriptor = {
    id: "console",
    title: "Terminal",
    component: TerminalPanel,
    dock: "bottom",
  };

  EventsOn("openPanel", (data: any) => {
    console.log("🚀 ~ PanelContainer ~ data:", data);
    openPanel(data.id, data.dock);
  });

  useEffect(() => {
    // Open default panels on mount
    panelRegistry.register(editor);
    panelRegistry.register(fileTree);
    panelRegistry.register(consolePanel);

    // Cleanup function to unregister panels if needed
    return () => {
      panelRegistry.unregister(editor.id);
      panelRegistry.unregister(fileTree.id);
      panelRegistry.unregister(consolePanel.id);
    };
  }, []);

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          {panels
            .filter((p) => p.position === "float")
            .map((panel) => (
              <FloatingPanel key={panel.instanceId} panel={panel} />
            ))}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
