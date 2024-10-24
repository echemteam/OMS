﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("Customers")]
    public class Customers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? CustomerId { get; set; }
        public short? GroupTypeId { get; set; }

        [Column("Name")]
        public string? Name { get; set; }
        [Column("TerritoryId")]
        public short? TerritoryId { get; set; }
        [Column("RefCode")]
        public string? RefCode { get; set; }

        [Column("ListCode")]
        public string? ListCode { get; set; }
        [Column("Website")]
        public string? Website { get; set; }
        [Column("IndustryTypeId")]
        public short? IndustryTypeId { get; set; }
        [Column("CountryId")]
        public short? CountryId { get; set; }
        [Column("TaxId")]
        public string? TaxId { get; set; }
        [Column("StatusId")]
        public short? StatusId { get; set; }

        [Column("ApprovedAt")]
        public DateTime? ApprovedAt { get; set; }

        [Column("ApprovedBy")]
        public short? ApprovedBy { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
        [Column("IsDeleted")]
        public bool? IsDeleted { get; set; }

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
    }
}
