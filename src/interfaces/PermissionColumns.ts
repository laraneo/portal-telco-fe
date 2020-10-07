export default interface PermissionColumns {
    id: "id" | "name" | "slug" | "description";
    label: string;
    minWidth?: number;
    align?: "left" |"right";
    component: any;
  }