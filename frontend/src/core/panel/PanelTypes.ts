export type PanelID = string;

export interface PanelDescriptor {
  id: PanelID;
  title: string;
  component: React.FC<any>;
  defaultSize?: { w: number; h: number };
  dock?: "left" | "right" | "bottom" | "top" | "float";
}

export type PanelInstance = {
  instanceId: string;
  panelId: PanelID;
  position: "dock" | "float";
  dockSide?: "left" | "right" | "bottom" | "top";
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};
