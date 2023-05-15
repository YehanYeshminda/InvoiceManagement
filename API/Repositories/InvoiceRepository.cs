using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class InvoiceRepository : IInvoiceInterface
    {
        private readonly NormalInvoiceSavingDbContext _context;

        public InvoiceRepository(NormalInvoiceSavingDbContext context)
        {
            _context = context;
        }

        public void AddInvoiceD(TblInvoiceD invoiceD)
        {
            _context.TblInvoiceDs.Add(invoiceD);
        }

        public void AddInvoiceH(TblInvoiceH invoiceH)
        {
            _context.TblInvoiceHs.Add(invoiceH);
        }

        public async Task<TblInvoiceD> GetInvoiceD(int id)
        {
            var invoiceD = await _context.TblInvoiceDs.SingleOrDefaultAsync(x => x.Id == id);
            return invoiceD;
        }

        public async Task<TblInvoiceH> GetInvoiceH(string id)
        {
            var invoiceH = await _context.TblInvoiceHs.FirstOrDefaultAsync(x => x.InvoiceNo == id);
            return invoiceH;
        }

        public async Task<ActionResult<IEnumerable<TblInvoiceD>>> GetInvoicesD()
        {
            return await _context.TblInvoiceDs.ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<TblInvoiceH>>> GetInvoicesH()
        {
            return await _context.TblInvoiceHs.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateTblH(TblInvoiceH tblInvoiceH)
        {
            _context.Entry(tblInvoiceH).State = EntityState.Modified;
        }
    }
}
