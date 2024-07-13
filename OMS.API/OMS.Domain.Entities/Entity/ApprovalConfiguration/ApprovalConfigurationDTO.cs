﻿namespace OMS.Domain.Entities.Entity.ApprovalConfiguration
{
    public class ApprovalConfigurationDTO
    {
        public int ApprovalConfigurationId { get; set; }
        public string? RuleName { get; set; }
        public int? ModuleId { get; set; }
        public int? FunctionalityId { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public byte? ApproverRoleId { get; set; }
        public string? ApprovalAction { get; set; }
    }
}