using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEventMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventMappingRepository
    {
        Task<AddEntityDTO<int>> AddApiEventMapping(ApiEventMappingDTO requestData);
        Task<EntityList<GetApiEventMappingsResponse>> GetApiEventMappings(GetApiEventMappingsRequest requestData);

    }
}
