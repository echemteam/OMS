using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class MailingAddressResponce
    {
        public int? AddressId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? ZipCode { get; set; }
    }
}
