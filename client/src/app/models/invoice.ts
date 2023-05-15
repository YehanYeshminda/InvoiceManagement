export interface InvoiceD {
  id: number;
  invoiceNo: string;
  item: string;
  rate: number;
  qty: number;
}

export interface InvoiceH {
  id: number;
  invoiceNo: string;
  date: string;
  totalAmount: number;
}
