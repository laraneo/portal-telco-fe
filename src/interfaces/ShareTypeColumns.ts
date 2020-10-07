export default interface ShareTypeColumns {
    id: "id" | "description" | "code";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }