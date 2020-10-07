export default interface PersonRelationColumns {
    id: "id" | "description" | "inverse_relation";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }