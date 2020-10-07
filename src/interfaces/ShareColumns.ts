export default interface ShareColumns {
  id:
    | "id"
    | "share_number"
    | "status"
    | "partner"
    | "titular"
    | "facturador"
    | "fiador"
    | "payment_method"
    | "share_type"
    | "father_share";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  component?: any;
}
