import { Invoice607 } from "./invoice607.interface";
import { InvoiceProduct } from "./product.interface";

export interface Income
 {
    id?:number|null;
    note?:string| null;
    invoiceNumber?:string| null;
    companyName?:string|null
    companyAddress?:string|null
    status?:string|null
    products?:InvoiceProduct[]| null;
    invoice607?:Invoice607
    companyID?:number
 }