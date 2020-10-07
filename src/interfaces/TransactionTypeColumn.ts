export default interface MasterTableColumns {
    id: "id" | "description" | "rate";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }