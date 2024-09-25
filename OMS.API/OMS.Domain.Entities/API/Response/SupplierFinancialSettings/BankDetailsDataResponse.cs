using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class BankDetailsDataResponse
    {
        public string? BankName { get; set; }
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
        public string? AccountType { get; set; }
        public string? AccountNumber { get; set; }
        public string? RoutingNumber { get; set; }
        public string? SwiftCode { get; set; }
        public string? IbanNumber { get; set; }
        public string? SortCode { get; set; }
        public string? BsbNumber { get; set; }
        public string? BranchCode { get; set; }
        public bool? IsAddressInUs { get; set; }
    }
}
