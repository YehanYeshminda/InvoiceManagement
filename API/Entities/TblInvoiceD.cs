using System;
using System.Collections.Generic;

namespace API.Entities
{
    public partial class TblInvoiceD
    {
        public int Id { get; set; }
        public string? InvoiceNo { get; set; }
        public string? Item { get; set; }
        public int? Rate { get; set; }
        public int? Qty { get; set; }
    }
}
