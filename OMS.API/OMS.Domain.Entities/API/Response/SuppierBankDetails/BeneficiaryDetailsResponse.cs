using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SuppierBankDetails
{
    public class BeneficiaryDetailsResponse
    {
        public int? AddressId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public short? CountryId { get; set; }
        public string? ZipCode { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
    }
}
