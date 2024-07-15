using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.APIConfiguration
{
    public interface IApiConfigurationService
    {
        Task<AddEntityDTO<int>> AddEditApiProvider(AddEditApiProviderRequest requestData, short CurrentUserId);
        Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId);
        Task<AddEntityDTO<int>> DeleteApiProvider(int providerId, short CurrentUserId);
        Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData);
    }
}
