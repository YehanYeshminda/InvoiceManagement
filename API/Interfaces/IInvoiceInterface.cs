using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IInvoiceInterface
    {
        Task<ActionResult<IEnumerable<TblInvoiceD>>> GetInvoicesD();
        Task<ActionResult<IEnumerable<TblInvoiceH>>> GetInvoicesH();
        Task<TblInvoiceD> GetInvoiceD(int id);
        Task<TblInvoiceH> GetInvoiceH(string id);
        void AddInvoiceH(TblInvoiceH invoiceH);
        void AddInvoiceD(TblInvoiceD invoiceD);
        Task<bool> SaveAllAsync();
        void UpdateTblH(TblInvoiceH tblInvoiceH);
    }
}
