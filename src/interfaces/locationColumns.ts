export default interface Columns {
    id: "id" | "description" | "status";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }