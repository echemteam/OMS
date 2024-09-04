using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Customers
{
    public class CustomersDto : BaseCustomersDto, ICustomers, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Column("RefCode")]
        public string? RefCode { get; set; }

        [Column("ListCode")]
        public string? ListCode { get; set; }
        [Column("IndustryTypeId")]
        public short? IndustryTypeId { get; set; }
        [Column("StatusId")]
        public short? StatusId { get; set; }
        [Column("Note")]
        public string? Note { get; set; }
        [Column("ApprovedAt")]
        public DateTime? ApprovedAt { get; set; }
        [Column("ApprovedBy")]
        public short? ApprovedBy { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
        [Column("IsDeleted")]
        public bool? IsDeleted { get; set; }
        [Column("InActiveReason")]
        public string? InActiveReason { get; set; }
        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }
        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }
        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }
        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }
        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }
        [Column("ResponsibleUserId")]
        public short? ResponsibleUserId { get; set; }
        [Column("IsSubCustomer")]
        public bool? IsSubCustomer { get; set; }
        [Column("IncotermId")]
        public byte? IncotermId { get; set; }
        public long? CustomerNoteId { get; set; }
    }
}
