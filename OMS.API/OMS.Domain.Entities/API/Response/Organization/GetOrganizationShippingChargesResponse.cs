using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationShippingChargesResponse
    {
        public short? OrganizationShippingChargeId { get; set; }
        public decimal? DomesticOvernight { get; set; }
        public decimal? DomesticSecondDay { get; set; }
        public decimal? DomesticGround { get; set; }
        public decimal? InternationalPriority { get; set; }
        public decimal? InternationalEconomy { get; set; }
    }
}
