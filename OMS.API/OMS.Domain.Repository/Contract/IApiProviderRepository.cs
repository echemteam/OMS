using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiProviderRepository
    {
        Task<AddEntityDto<int>> AddEditApiProvider(ApiProviderDto apiProvider);
        Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId);
        Task<AddEntityDto<int>> DeleteApiProvider(int providerId, int deletedBy);
        Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData);
    }
}
