export default interface ShareMovementColumns {
  id:
    | "id"
    | "description"
    | "rate_currency"
    | "rate"
    | "created"
    | "sale_currency"
    | "number_sale_price"
    | "number_procesed"
    | "share"
    | "transaction"
    | "partner"
    | "titular";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  component?: any;
}
