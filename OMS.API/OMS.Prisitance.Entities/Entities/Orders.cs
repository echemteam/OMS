using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("Orders")]
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? OrderId { get; set; }

        [Column("OrderMethodId")]
        public byte? OrderMethodId { get; set; }

        [Column("CustomerId")]
        public int? CustomerId { get; set; }

        [Column("SubCustomerId")]
        public int? SubCustomerId { get; set; }

        [Column("PoNumber")]
        public string? PoNumber { get; set; }

        [Column("OrderReceivedDate")]
        public DateTime? OrderReceivedDate { get; set; }

        [Column("IsEndUser")]
        public bool? IsEndUser { get; set; }

        [Column("EndUserContactId")]
        public int? EndUserContactId { get; set; }

        [Column("IsInvoiceSubmission")]
        public bool? IsInvoiceSubmission { get; set; }

        [Column("InvoiceSubmissionContactId")]
        public int? InvoiceSubmissionContactId { get; set; }

        [Column("IsPurchasing")]
        public bool? IsPurchasing { get; set; }

        [Column("PurchasingContactId")]
        public int? PurchasingContactId { get; set; }

        [Column("ReferenceNumber")]
        public string? ReferenceNumber { get; set; }

        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }

        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }

        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }

        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }

        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }

    }
}
