export default interface ShareMovementColumns {
    id:
      | "id"
      | "status"
      | "created"
      | "location"
      | "card_number"
      | "person"
      | "share"
      | "guest"
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
  