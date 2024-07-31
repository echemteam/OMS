using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationOtherChargesResponse
    {
        public byte? OrganizationOtherChargeId { get; set; }
        public decimal? HandlingFees { get; set; }
        public decimal? BankWireFees { get; set; }
        public decimal? CreditCardServiceFees { get; set; }
        public decimal? ColdBoxFees { get; set; }
        public decimal? ITNFees { get; set; }
        public byte? DefaultPaymentTerms { get; set; }
    }
}
