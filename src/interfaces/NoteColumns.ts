export default interface Columns {
    id: "id" | "description" | "created" | "status" | "department";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }