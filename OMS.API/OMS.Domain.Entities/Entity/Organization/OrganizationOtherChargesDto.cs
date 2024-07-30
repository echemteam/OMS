using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public  class OrganizationOtherChargesDto
    {
        public short? OrganizationOtherChargeId { get; set; }
        public float? HandlingFees { get; set; }
        public float? BankWireFees { get; set; }
        public float? CreditCardServiceFees { get; set; }
        public float? ColdBoxFees { get; set; }
        public float? ITNFees { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
