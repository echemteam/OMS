﻿namespace OMS.Domain.Entities.API.Response.Approval
{
    public class GetApprovalConfigurationResponse
    {
        public int ApprovalConfigurationId { get; set; }
        public string? RuleName { get; set; }
        public int ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public int FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public int TableId { get; set; }
        public string? TableName { get; set; }
        public int FunctionalitiesFieldId { get; set; }
        public string? FieldName { get; set; }
        public int FunctionalityEventId { get; set; }
        public string? EventName { get; set; }
        public bool IsFunctional { get; set; }
    }
}
