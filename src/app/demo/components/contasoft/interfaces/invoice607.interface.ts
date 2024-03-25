export interface Invoice606
 {
    id?: number;
    rncCedulaPasaporte?: string | '';
    tipoIdentificacion?: number | 0;
    numeroComprobanteFiscal?: string | '';
    numeroComprobanteFiscalModificado?: string | '';
    tipoIngreso?: number | '';
    fechaComprobante?: string | '';
    fechaRetencion?: string | '';
    montoFacturado?: number | 0;
    itbisFacturado?: number | 0;
    itbisRetenidoporTerceros?: number | 0;
    itbisPercibido?: number | 0;
    retencionRentaporTerceros?: number | 0;
    isrPercibido?: number | 0;
    impuestoSelectivoalConsumo?: number | 0;
    otrosImpuestos_Tasas?: number | 0;
    montoPropinaLegal?: number | 0;
    efectivo?: number | 0;
    cheque_Transferencia_Deposito?: number | 0;
    tarjetaDebito_Credito?: number | 0;
    ventaACredito?: number | 0;
    bonosOCertificadosRegalo?: number | 0;
    permuta?: number | 0;
    otrasFormasVentas?: number | 0;
    status?:string|null;
    companyID?: number;
}