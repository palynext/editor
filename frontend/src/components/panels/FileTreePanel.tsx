import { usePanelManager } from "@/core/panel/PanelManager";
import { useState } from "react";

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

const sampleTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "main.tsx", type: "file" },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "EditorPanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
          { name: "FileTreePanel.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "package.json",
    type: "file",
  },
];

function TreeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(true);
  const { openPanel } = usePanelManager();

  const isFolder = node.type === "folder";

  const delay = `${depth * 70}ms`;

  return (
    <div className="">
      <div
        className="cursor-pointer flex items-center gap-2 py-1 px-1 rounded-sm
           text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10
           transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.5)]
           animate-glow-item"
        style={{ animationDelay: delay }}
        onClick={() =>
          isFolder ? setOpen(!open) : openPanel("editor")
        }
      >
        {isFolder ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="text-cyan-300 drop-shadow-[0_0_6px_#00ffff]"
            style={{
              filter: "drop-shadow(0 0 4px #00ffffaa)",
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.2s",
            }}
          >
            <path fill="currentColor" d="M4 4h6l2 2h8v12H4z" opacity="0.7" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className="text-cyan-300 drop-shadow-[0_0_6px_#00ffff]"
            style={{ filter: "drop-shadow(0 0 4px #00ffffaa)" }}
          >
            <path fill="currentColor" d="M6 2h9l5 5v13H6z" opacity="0.7" />
          </svg>
        )}
        <span>{node.name}</span>
      </div>

      {isFolder && open && (
        <div
          className="ml-4 border-l border-cyan-400/40 pl-3 neon-glow-sm
           overflow-hidden transition-all duration-500
           animate-parallax-depth"
          style={{
            maxHeight: open ? "500px" : "0px",
            opacity: open ? 1 : 0,
            transform: open ? "translateZ(0)" : "translateZ(-20px)",
            transitionDelay: delay,
          }}
        >
          {node.children?.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTreePanel() {
  return sampleTree.map((node, i) => <TreeItem key={i} node={node} />);
}
