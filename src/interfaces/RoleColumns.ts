export default interface RoleColumns {
    id: "id" | "name" | "slug" | "description";
    label: string;
    minWidth?: number;
    align?: "left" |"right";
    component: any;
  }