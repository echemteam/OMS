using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationOtherChargesRequest
    {
        public short? OrganizationOtherChargeId {  get; set; }
        public float? HandlingFees {  get; set; }
        public float? BankWireFees { get; set; }
        public float? CreditCardServiceFees { get; set; }
        public float? ColdBoxFees { get; set; }
        public float? ITNFees {  get; set; }

    }
}
