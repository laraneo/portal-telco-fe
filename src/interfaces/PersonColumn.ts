export default interface PersonColumn {
  id:
    | ""
    | "id"
    | "name"
    | "last_name"
    | "primary_email"
    | "rif_ci"
    | "passport"
    | "expiration_date"
    | "birth_date"
    | "representante"
    | "address"
    | "telephone1"
    | "telephone2"
    | "phone_mobile1"
    | "phone_mobile2"
    | "secondary_email"
    | "fax"
    | "city"
    | "state"
    | "postal_code"
    | "type_person"
    | "gender"
    | "marital_status"
    | "country"
    | "professions"
    | "status_person"
    | "relationship"
    | "relation"
    | "shares"
    | "card_number"
    | "isPartner"
    | "relationship";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  component?: any;
}
