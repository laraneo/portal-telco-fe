export default interface PersonColumn {
    id: "id" | "name" | "email" | "username" | "roles" | "username_legacy";
    label: string;
    minWidth?: number;
    align?: "left" |"right";
    component: any;
  }