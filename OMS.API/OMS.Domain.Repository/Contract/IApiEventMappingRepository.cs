using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEventMapping;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventMappingRepository
    {
        Task<AddEntityDto<int>> AddApiEventMapping(ApiEventMappingDto requestData);
        Task<GetApiEventMappingsResponse> GetApiEventMappings(GetApiEventMappingsRequest requestData);
        Task<AddEntityDto<int>> DeleteApiEventMapping(int apiEventMappingId, int deletedBy);
    }
}
