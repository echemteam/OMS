using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationShippingChargesRequest
    {
        public short? OrganizationShippingChargeId {  get; set; }
        public float? DomesticOvernight {  get; set; }
        public float? DomesticSecondDay {  get; set; }
        public float? DomesticGround { get; set; }
        public float? InternationalPriority {  get; set; }
        public float? InternationalEconomy { get; set; }

    }
}
