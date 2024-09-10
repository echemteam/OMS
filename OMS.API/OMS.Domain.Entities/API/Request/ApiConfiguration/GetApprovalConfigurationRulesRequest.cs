﻿using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiConfiguration
{
    public class GetApprovalConfigurationRulesRequest : ListEntityRequest<BaseFilter>
    {
        public int? FunctionalityId { get; set; }
    }
}
