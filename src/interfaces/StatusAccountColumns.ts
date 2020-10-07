export default interface Columns {
    id:
      | "co_cli"
      | "fact_num"
      | "fec_emis"
      | "descrip"
      | "total_fac"
      | "saldo"
      | "tipo"
      | "acumulado";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    component?: any;
  }
  