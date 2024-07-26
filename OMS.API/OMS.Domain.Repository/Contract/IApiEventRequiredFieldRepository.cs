﻿using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.Entity.ApiEventRequiredField;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventRequiredFieldRepository
    {
        Task<AddEntityDTO<int>> AddEditApiEventRequiredField(ApiEventRequiredFieldDTO requestData);
        Task<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId);
        Task<AddEntityDTO<int>> DeleteApiEventRequiredField(int apiEventRequiredFieldId, int deletedBy);
        Task<EntityList<GetApiEventRequiredFieldsResponse>> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData);

    }
}
