﻿namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationOtherSettingsByIdResponse
    {
        public int? OrganizationOtherSettingId { get; set; }
        public byte? OrganizationId { get; set; }
        public string? Name { get; set; }
        public string? DefaultPaymentTerms { get; set; }
        public string? FedexAccountDetail { get; set; }
    }
}
