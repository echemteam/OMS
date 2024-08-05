using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Address
{
    public class AddressDTO : BaseAddressDTO, IAddress, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? AddressId { get; set; }
        [Column("CustomerId")]
        public int? CustomerId { get; set; }

        [Column("IsVerified")]
        public bool? IsVerified { get; set; }
        [Column("VerifiedBy")]
        public short? VerifiedBy { get; set; }

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
