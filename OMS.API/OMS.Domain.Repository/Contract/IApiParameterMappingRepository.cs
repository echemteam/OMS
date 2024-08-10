using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.Entity.ApiParameterMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiParameterMappingRepository
    {
        Task<AddEntityDto<int>> AddApiParameterMapping(ApiParameterMappingDto requestData);
        Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData);
        Task<AddEntityDto<int>> DeleteApiParameterMapping(int apiParameterMappingId, int deletedBy);

    }
}
