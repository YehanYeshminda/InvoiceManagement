import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { TypeaheadFormComponent } from './forms/typeahead-form/typeahead-form.component';
import { InvoiceDashboardComponent } from './invoice-dashboard/invoice-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrModule } from 'ngx-toastr';
import { InvoiceModalComponent } from './invoice-modal/invoice-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    TypeaheadFormComponent,
    InvoiceDashboardComponent,
    DatePickerComponent,
    InvoiceModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
