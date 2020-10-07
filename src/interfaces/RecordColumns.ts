export default interface Columns {
    id: "id" | "description" | "type" | "created" | "days" | "blocked" | "expiration_date";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }