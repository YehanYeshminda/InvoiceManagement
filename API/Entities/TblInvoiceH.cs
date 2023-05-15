using System;
using System.Collections.Generic;

namespace API.Entities
{
    public partial class TblInvoiceH
    {
        public int Id { get; set; }
        public string? InvoiceNo { get; set; }
        public DateTime? Date { get; set; }
        public int? TotalAmount { get; set; }
    }
}
