﻿namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationOtherSettingsRequest
    {
        public int? OrganizationOtherSettingId { get; set; }
        public byte? OrganizationId { get; set; }
        public byte? DefaultPaymentTerms { get; set; }
        public string? FedexAccountDetail { get; set; }
    }
}
