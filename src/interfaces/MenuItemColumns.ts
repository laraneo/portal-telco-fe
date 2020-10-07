export default interface Columns {
  id:
    | "id"
    | "name"
    | "slug"
    | "description"
    | "route"
    | "main"
    | "order"
    | "father"
    | "icons"
    | "show_mobile"
    | "show_desk";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  component?: any;
}
