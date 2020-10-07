export default interface Columns {
    id: "id" | "description" | "location";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
  