using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationShippingChargesDto
    {
        public short? OrganizationShippingChargeId { get; set; }
        public float? DomesticOvernight { get; set; }
        public float? DomesticSecondDay { get; set; }
        public float? DomesticGround { get; set; }
        public float? InternationalPriority { get; set; }
        public float? InternationalEconomy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
