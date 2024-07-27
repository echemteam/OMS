using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.Entity.ApiParameterMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiParameterMappingRepository
    {
        Task<AddEntityDTO<int>> AddApiParameterMapping(ApiParameterMappingDTO requestData);
        Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData);
        Task<AddEntityDTO<int>> DeleteApiParameterMapping(int apiParameterMappingId, int deletedBy);

    }
}
