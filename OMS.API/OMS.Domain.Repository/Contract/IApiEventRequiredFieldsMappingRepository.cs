using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.Entity.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventRequiredFieldsMappingRepository
    {
        Task<AddEntityDTO<int>> AddApiEventRequiredFieldsMapping(ApiEventRequiredFieldsDTO requestData);
        Task<EntityList<GetApiEventRequiredFieldsMappingsResponse>> GetApiEventRequiredFieldsMappings(GetApiEventRequiredFieldsMappingsRequest requestData);
        Task<AddEntityDTO<int>> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId, int deletedBy);

    }
}
