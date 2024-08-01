using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Supplier
{
    public class SupplierDTO : BaseSuppliersDTO, ISupplier, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {

        [Column("GroupTypeId")]
        public short? GroupTypeId { get; set; }

        [Column("SupplierTypeId")]
        public short? SupplierTypeId { get; set; }

        [Column("Name")]
        public string? Name { get; set; }

        [Column("DbaName")]
        public string? DbaName { get; set; }

        [Column("TerritoryId")]
        public short? TerritoryId { get; set; }

        [Column("RefCode")]
        public string? RefCode { get; set; }

        [Column("ListCode")]
        public string? ListCode { get; set; }

        [Column("Website")]
        public string? Website { get; set; }

        [Column("CountryId")]
        public short? CountryId { get; set; }

        [Column("TaxId")]
        public string? TaxId { get; set; }

        [Column("StatusId")]
        public short? StatusId { get; set; }

        [Column("BillingCurrency")]
        public string? BillingCurrency { get; set; }
        [Column("InActiveReason")]
        public string? InActiveReason { get; set; }

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

        [Column("IsDeleted")]
        public bool? IsDeleted { get; set; }
        [Column("Note")]
        public string? Note { get; set; }
        [Column("EmailAddress")]
        public string? EmailAddress { get; set; }

        [Column("ApprovedAt")]
        public DateTime? ApprovedAt { get; set; }
        [Column("ApprovedBy")]
        public short? ApprovedBy { get; set; }
        [Column("ResponsibleUserId")]
        public short? ResponsibleUserId { get; set; }
    }
}
