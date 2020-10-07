export default interface Columns {
    id: "id" | "name" | "slug" | "description" | "order" | "show_mobile";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
  