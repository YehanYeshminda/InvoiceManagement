﻿using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvoiceController : BaseApiController
    {
        private readonly IInvoiceInterface _invoiceInterface;

        public InvoiceController(IInvoiceInterface invoiceInterface)
        {
            _invoiceInterface = invoiceInterface;
        }

        [HttpGet("invoiceD")]
        public async Task<ActionResult<IEnumerable<TblInvoiceD>>> GetInvoicesD()
        {
            return await _invoiceInterface.GetInvoicesD();
        }

        [HttpGet("invoiceH")]
        public async Task<ActionResult<IEnumerable<TblInvoiceH>>> GetInvoicesH()
        {
            return await _invoiceInterface.GetInvoicesH();
        }

        [HttpGet("invoiceD/{id}")]
        public async Task<ActionResult<TblInvoiceD>> GetInvoiceD(int id)
        {
            return await _invoiceInterface.GetInvoiceD(id);
        }

        [HttpGet("invoiceH/{id}")]
        public async Task<ActionResult<TblInvoiceH>> GetInvoiceH(string id)
        {
            return await _invoiceInterface.GetInvoiceH(id);
        }

        [HttpPost("invoiceH")]
        public async Task<ActionResult<TblInvoiceH>> AddInvoiceH(TblInvoiceH invoiceH)
        {
            if (invoiceH == null)
            {
                return BadRequest();
            }

            var alreadyInvoiceWithRegNo = await _invoiceInterface.GetInvoiceH(invoiceH.InvoiceNo);

            if (alreadyInvoiceWithRegNo != null)
            {
                return BadRequest("Already Invoice No exist");
            }

            var invoice = new TblInvoiceH
            {
                InvoiceNo = invoiceH.InvoiceNo,
                Date = invoiceH.Date,
                TotalAmount = invoiceH.TotalAmount,
            };

            _invoiceInterface.AddInvoiceH(invoice);
            await _invoiceInterface.SaveAllAsync();

            return Ok(invoice);
            
        }

        [HttpPost("invoiceD")]
        public async Task<ActionResult<TblInvoiceD>> AddInvoiceD(TblInvoiceD invoiceD)
        {
            if (invoiceD == null)
            {
                return BadRequest();
            }

            var invoiceHNo = await _invoiceInterface.GetInvoiceH(invoiceD.InvoiceNo);

            if (invoiceHNo == null)
            {
                return NotFound("Invoice No not found");
            }

            var invoice = new TblInvoiceD
            {
                InvoiceNo = invoiceHNo.InvoiceNo,
                Item = invoiceD.Item,
                Qty = invoiceD.Qty,
                Rate = invoiceD.Rate,
            };

            invoiceHNo.TotalAmount += invoiceD.Qty * invoiceD.Rate;

            _invoiceInterface.AddInvoiceD(invoice);
            await _invoiceInterface.SaveAllAsync();

            return Ok(invoice);
        }


        [HttpPut("invoiceH")]
        public async Task<ActionResult<TblInvoiceH>> UpdateTblH(TblInvoiceH tblInvoiceH)
        {
            var exisitingInvoice = await _invoiceInterface.GetInvoiceH(tblInvoiceH.InvoiceNo);

            if (exisitingInvoice == null)
            {
                return NotFound("Unable to find invoice no");
            }

            exisitingInvoice.TotalAmount = tblInvoiceH.TotalAmount;

            _invoiceInterface.UpdateTblH(exisitingInvoice);
            await _invoiceInterface.SaveAllAsync();
            return Ok(exisitingInvoice);
        }

        [HttpDelete("invoiceD/{id}")]
        public async Task<ActionResult> DeleteInvoiceD(int id)
        {
            var existingInvoice = await _invoiceInterface.GetInvoiceD(id);
            if (existingInvoice == null)
            {
                return NotFound("Unable to find the invoice");
            }

            var invoiceHNo = await _invoiceInterface.GetInvoiceH(existingInvoice.InvoiceNo);
            if (invoiceHNo == null)
            {
                return NotFound("Invoice No not found");
            }

            invoiceHNo.TotalAmount -= existingInvoice.Qty * existingInvoice.Rate;

            _invoiceInterface.DeleteInvoiceD(existingInvoice);
            await _invoiceInterface.SaveAllAsync();

            return NoContent();
        }

        [HttpGet("totalAmount/{id}")]
        public async Task<ActionResult<int>> GetTotalAmount(string id)
        {
            var invoiceHNo = await _invoiceInterface.GetInvoiceH(id);
            if (invoiceHNo == null)
            {
                return NotFound("Invoice No not found");
            }
            return invoiceHNo.TotalAmount;
        }
    }
}
