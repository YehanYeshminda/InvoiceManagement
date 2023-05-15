import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceH } from '../models/invoice';
import { Observable } from 'rxjs';
import { InvoiceD } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  saveInvoiceH(invoiceH: InvoiceH): Observable<InvoiceH> {
    return this.http.post<InvoiceH>(
      'https://localhost:5001/api/invoice/invoiceH',
      invoiceH
    );
  }

  saveInvoiceD(invoiceD: InvoiceD): Observable<InvoiceD> {
    return this.http.post<InvoiceD>(
      'https://localhost:5001/api/invoice/invoiceD',
      invoiceD
    );
  }

  getInvoiceH(): Observable<InvoiceH[]> {
    return this.http.get<InvoiceH[]>(
      'https://localhost:5001/api/invoice/invoiceH'
    );
  }

  getInvoiceD(): Observable<InvoiceD[]> {
    return this.http.get<InvoiceD[]>(
      'https://localhost:5001/api/invoice/invoiceD'
    );
  }

  getInvoiceHById(id: string): Observable<InvoiceH> {
    return this.http.get<InvoiceH>(
      'https://localhost:5001/api/invoice/invoiceH/' + id
    );
  }

  getInvoiceDById(id: number): Observable<InvoiceD> {
    return this.http.get<InvoiceD>(
      'https://localhost:5001/api/invoice/invoiceH/' + id
    );
  }

  updateInvoiceD(invoiceD: InvoiceD): Observable<InvoiceD> {
    return this.http.put<InvoiceD>(
      'https://localhost:5001/api/invoice/InvoiceD',
      invoiceD
    );
  }

  deleteInvoiceD(id: number): Observable<InvoiceD> {
    return this.http.delete<InvoiceD>(
      'https://localhost:5001/api/invoice/invoiceD/' + id
    );
  }

  getTotalAmountBasedOnInvoice(id: string): Observable<number> {
    return this.http.get<number>(
      'https://localhost:5001/api/invoice/totalAmount/' + id
    );
  }
}
