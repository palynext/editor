export type PanelID = string;

export interface PanelDescriptor {
  id: PanelID;
  title: string;
  component: any; // React.ComponentType or similar
  defaultSize?: { w: number; h: number };
  dock?: "left" | "right" | "bottom" | "top" | "float";
}

export type PanelInstance = {
  title?: string;
  instanceId: string;
  panelId: PanelID;
  position: "dock" | "float";
  dockSide?: "left" | "right" | "bottom" | "top";
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  zIndex?: number;
};
