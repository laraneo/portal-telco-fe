export default interface MasterTableColumns {
    id: "id" | "titular" | "ci" | "card_number" | "sec_code" | "expiration_date" | "bank" | "card" | "order" | "orderDetail";
    label: string;
    minWidth?: number;
    align?: "right" | "left";
    component?: any;
  }