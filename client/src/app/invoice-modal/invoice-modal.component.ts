import { Component, OnInit } from '@angular/core';
import { InvoiceD } from '../models/invoice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css'],
})
export class InvoiceModalComponent implements OnInit {
  data: InvoiceD | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    private modelService: BsModalService
  ) {}

  ngOnInit(): void {
    this.intializedFormInvoiceD();
    this.loadPatchData();
  }

  intializedFormInvoiceD() {
    this.form = this.fb.group({
      invoiceNo: ['', [Validators.required]],
      item: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
  }

  loadPatchData() {
    this.form.patchValue({
      invoiceNo: this.data?.invoiceNo,
      item: this.data?.item,
      rate: this.data?.rate,
      qty: this.data?.qty,
    });
  }

  updateInvoiceD() {
    this.invoiceService.updateInvoiceD(this.form.value).subscribe({
      next: (data) => {
        this.toastr.success('Invoice Updated Successfully');
        this.modelService.hide();
      },
      error: (err) => {
        this.toastr.error('Unable to find Invoice to update');
      },
    });
  }
}
