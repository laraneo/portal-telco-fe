export default interface ProductColumn {
    id: "id" | "description" | "price";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
  