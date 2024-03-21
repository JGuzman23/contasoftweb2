export interface Transaction {
    id?: number;
    bankNumberOut?: string;
    bankNumberIn?: string;
    amount?: number;
    debit?: number;
    credit?: number;
    noCheck?: string;
    concept?: string;
    tipo?: string;
    transactionDate?: string;
    companyId?: number;
    total?:number
}