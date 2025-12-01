import { useState } from "react";
import { EventsOnce } from "../../../wailsjs/runtime/runtime";
import { usePanelManager } from "../../core/panel/PanelManager";

export default function Footer() {
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const { panels, focusPanel, closePanel } = usePanelManager();
  EventsOnce("cpuMonitor", (data: string) => {
    setCpu(data);
  });

  EventsOnce("ramMonitor", (data: string) => {
    setRam(data);
  });

  return (
    <div className="flex flex-row justify-between p-1 gap-1 text-[11px] text-cyan-400">
      <div>
        {panels.length > 0 && (
          <div className="flex flex-row gap-2 ml-4">
            {panels.map((p) => (
              <button
                key={p.instanceId}
                onClick={() => focusPanel(p.instanceId)}
                className="px-2 py-px rounded-sm bg-cyan-900/40 
                         hover:bg-cyan-700/40 text-cyan-300 
                         border border-cyan-400/30 text-[11px] 
                         transition-all"
              >
                <div className="flex items-center gap-1">
                  <span>{p.title ?? "Unknown"}</span>
                  <span
                    className="text-red-300 hover:text-red-400 ml-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Call closePanel if available
                      if (typeof closePanel !== "undefined")
                        closePanel(p.instanceId);
                    }}
                  >
                    ✕
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 mr-4">
        {cpu && <p>{cpu}</p>}
        {ram && <p>{ram}</p>}
      </div>
    </div>
  );
}
