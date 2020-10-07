export default interface Columns {
  id: "id" | "description" | "parameter" | "value" | "eliminable";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  component?: any;
}
