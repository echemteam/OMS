﻿namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSupplierBasicInformationByIdResponse
    {
        public int? SupplierId { get; set; }
        public short? GroupTypeId { get; set; }
        public string? GroupType { get; set; }
        public short? SupplierTypeId { get; set; }
        public string? SupplierType { get; set; }
        public string? Name { get; set; }
        public string? DbaName { get; set; }
        public short? TerritoryId { get; set; }
        public string? Website { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? TaxId { get; set; }
        public short? StatusId { get; set; }
        public string? Status { get; set; }
        public string? Territory { get; set; }
        public string? EmailAddress { get; set; }
        public string? ResponsibleUserId { get; set; }
        public string? ResponsibleUserName { get; set; }
        public byte? IncotermId { get; set; }
        public string? IncotermName { get; set; }
        public string? Base64File { get; set; }
        public string? AttachmentName { get; set; }
        public string? ListCode { get; set; }
        public string? RefCode { get; set; }
    }
}
