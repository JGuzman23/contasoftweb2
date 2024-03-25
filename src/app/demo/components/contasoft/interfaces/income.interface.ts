import { Product } from "./product.interface";

export interface Income
 {
    id?:number|null;
    subtotal?:number |null;
    total?:number | null;
    itbis?:number| null;
    nota?:string| null;
    date?:string| null;
    ncf?:string| null;
    invoiceNumber?:string| null;
    products?:Product[]| null;
    rnc?:string|null
    empresa?:string|null
    direccion?:string|null

 }