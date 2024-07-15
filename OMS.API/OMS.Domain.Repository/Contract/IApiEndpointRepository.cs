using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.Entity.ApiEndpoint;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEndpointRepository
    {
        Task<AddEntityDTO<int>> AddEditApiEndpoint(ApiEndpointDTO apiEndpoint);
        Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId);
        Task<AddEntityDTO<int>> DeleteApiEndpoint(int endpointId, int deletedBy);
        Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(ListEntityRequest<BaseFilter> requestData);

    }
}
