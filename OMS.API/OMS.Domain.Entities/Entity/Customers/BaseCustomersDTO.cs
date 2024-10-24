﻿namespace OMS.Domain.Entities.Entity.Customers
{
    public class BaseCustomersDto
    {
        public int? CustomerId { get; set; }
        public string? Name { get; set; }
        public short? GroupTypeId { get; set; }
        public short? TerritoryId { get; set; }
        public short? CountryId { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? TaxId { get; set; }
        public bool? IsBuyingForThirdParty { get; set; }
    }
}
