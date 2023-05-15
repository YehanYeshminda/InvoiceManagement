using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class NormalInvoiceSavingDbContext : DbContext
    {
        public NormalInvoiceSavingDbContext()
        {
        }

        public NormalInvoiceSavingDbContext(DbContextOptions<NormalInvoiceSavingDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblInvoiceD> TblInvoiceDs { get; set; } = null!;
        public virtual DbSet<TblInvoiceH> TblInvoiceHs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblInvoiceD>(entity =>
            {
                entity.ToTable("tblInvoiceD");

                entity.Property(e => e.InvoiceNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Item)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblInvoiceH>(entity =>
            {
                entity.ToTable("tblInvoiceH");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.InvoiceNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
