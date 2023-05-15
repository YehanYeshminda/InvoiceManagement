import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceD } from '../models/invoice';
import { Observable, catchError, noop, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-invoice-dashboard',
  templateUrl: './invoice-dashboard.component.html',
  styleUrls: ['./invoice-dashboard.component.css'],
})
export class InvoiceDashboardComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formInvoiceD: FormGroup = new FormGroup({});
  invoiceD$: Observable<InvoiceD[]> = of([]);
  bsModalRef?: BsModalRef;
  totalAmount = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.intializeForm();
    this.intializedFormInvoiceD();
    this.loadInvoiceD();
  }

  intializeForm() {
    this.form = this.fb.group({
      invoiceNo: ['', [Validators.required]],
      date: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
    });

    this.form.get('invoiceNo')?.valueChanges.subscribe((value) => {
      this.updateTotalAmount(value);
    });
  }

  intializedFormInvoiceD() {
    this.formInvoiceD = this.fb.group({
      item: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      totalAmountDb: ['', [Validators.required]],
    });
  }

  saveInvoice() {
    this.invoiceService.saveInvoiceH(this.form.value).subscribe({
      next: (data) => {
        this.toastr.success('Invoice Saved Successfully');
      },
      error: (err) => {
        this.toastr.error('Invoice No already exists!');
      },
    });
  }

  loadInvoiceD() {
    this.invoiceD$ = this.invoiceService.getInvoiceD();
  }

  saveInvoiceD() {
    const invoiceNo = this.form.get('invoiceNo')?.value;

    if (invoiceNo === '') {
      this.toastr.error('Please enter Invoice No!');
      return;
    }

    const data = {
      invoiceNo: invoiceNo,
      ...this.formInvoiceD.value,
    };

    this.invoiceService.saveInvoiceD(data).subscribe({
      next: (data) => {
        this.loadInvoiceD();
        this.updateTotalAmount(data.invoiceNo);
        this.toastr.success('Invoice Details Saved Successfully');
      },
      error: (err) => {
        this.toastr.error('Invalid Invoice No!');
      },
    });
  }

  deleteItem(id: number, invoiceNo: string) {
    if (confirm('Are you sure to delete ')) {
      this.invoiceService.deleteInvoiceD(id).subscribe({
        next: () => {
          this.loadInvoiceD();
          this.updateTotalAmount(invoiceNo);
          this.toastr.success('Invoice Details Deleted Successfully');
        },
        error: (err) => {
          this.toastr.error('Invalid Invoice No!');
        },
      });
    }
  }

  updateTotalAmount(id: string) {
    if (id.length === 3) {
      this.invoiceService.getTotalAmountBasedOnInvoice(id).subscribe({
        next: (response) => {
          this.totalAmount = response;
        },
      });
    }
  }

  // openEditInvoiceDModal(invoiceD: InvoiceD) {
  //   const initialState: ModalOptions = {
  //     initialState: {
  //       data: invoiceD,
  //     },
  //   };
  //   this.bsModalRef = this.modalService.show(
  //     InvoiceModalComponent,
  //     initialState
  //   );

  //   this.modalService.onHidden.subscribe(() => {
  //     this.loadInvoiceD();
  //   });
  // }
}
