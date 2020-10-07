export default interface Columns {
    id:
      | ""
      | "status"
      | "co_cli"
      | "fact_num"
      | "fec_emis"
      | "fec_venc"
      | "descrip"
      | "total_fac"
      | "tipo"
      | "fec_emis_fact"
      | "co_cli2"
      | "idPago"
      | "acumulado"
      | "saldo"
      | "portal_id"
      | "iStatusDisabled";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
  component?: any;
  isHandleSubRow?: boolean;
  }

//   {
//     "status": "1",
//     "co_cli": "A-1713            ",
//     "fact_num": "185768",
//     "fec_emis": "2020-03-02T00:00:00-04:00",
//     "fec_venc": "2020-03-02T00:00:00-04:00",
//     "descrip": "Facturacion Automatica 3/2020",
//     "saldo": "10750238.08",
//     "total_fac": "10750238.08",
//     "tipo": "P-FACT",
//     "fec_emis_fact": "2020-03-02T00:00:00-04:00",
//     "co_cli2": "6976369   ",
//     "iStatusDisabled": "0",
//     "acumulado": "10750238.08"
// }