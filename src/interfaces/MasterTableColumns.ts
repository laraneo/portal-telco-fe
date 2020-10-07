export default interface MasterTableColumns {
    id: "id" | "description";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }