export interface InvoiceBill {
  id?: number;
  tipoID?: number; //O
  rncCedulaPasaporte?: string | null; //O
  tipoBienesYServiciosComprados?: number; //O
  numeroComprobanteFiscal?: string | null; //O
  numeroComprobanteFiscalModificado?: string | null; //N
  fechaComprobante?: string | null; //O
  fechaPago?: string | null; // N
  montoFacturadoEnServicio?: number | null; //O
  montoFacturadoEnBienes?: number | null; //O
  totalMontoFacturado?: number | null; //O
  itbisFacturado?: number | null; //O
  itbisRetenido?: number | null;//N
  itbisSujetoaProporcionalidad?: number | null;
  itbisLlevadoAlCosto?: number | null;
  itbisPorAdelantar?: number | null;
  itbisPersividoEnCompras?: number | null;
  tipoRetencionEnISR?: number | null;
  montoRetencionRenta?: number | null;
  irsPercibidoEnCompras?: number | null;
  impuestoSelectivoAlConsumo?: number | null;
  otrosImpuestosTasa?: number | null;
  montoPropinaLegal?: number | null;
  formaDePago?: number | null; //O
  companyID?:number //O
}
