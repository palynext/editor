import { useState } from "react";
import { EventsOnce } from "../../../wailsjs/runtime/runtime";

export default function Footer() {
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  EventsOnce("cpuMonitor", (data: string) => {
    setCpu(data);
  });

  EventsOnce("ramMonitor", (data: string) => {
    setRam(data);
  });

  return (
    <div className="flex flex-row justify-end p-1 gap-1 text-[11px] text-cyan-400 border-t border-cyan-400/30 bg-gray-900/50">
      {cpu && <p>{cpu}</p>}
      {ram && <p>{ram}</p>}
    </div>
  );
}
