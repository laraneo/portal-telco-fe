export default interface Columns {
  id:
    | "idPago"
    | "dFechaRegistro"
    | "NroReferencia"
    | "sDescripcion"
    | "nMonto"
    | "Login"
    | "codBancoOrigen"
    | "Destino"
    | "cNombreBanco"
    | "codCuentaDestino"
    | "dFechaPago"
    | "Moneda"
    | "status";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  component?: any;
}
// "nMonto": "112.21",
// "NroReferencia": "54535341",
// "sDescripcion": "prueba 2",
// "status": "0",
// "Login": "A-1713",
// "codBancoOrigen": "039   ",
// "cNombreBanco": "BANCAMIGA                                                   ",
// "codCuentaDestino": "030   ",
// "Destino": "BANCO NACIONAL DE CREDITO - 01910001412101055983",
// "dFechaPago": "2019-10-30T00:00:00-04:00",