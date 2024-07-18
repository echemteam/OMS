using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.Entity.ApiAuthentication;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiAuthenticationRepository
    {
        Task<AddEntityDTO<int>> AddEditApiAuthentication(ApiAuthenticationDTO apiAuthentication);

        Task<GetApiAuthenticationByAuthIdResponse> GetApiAuthenticationByAuthId(int authId);
        Task<AddEntityDTO<int>> DeleteApiAuthentication(int authId, int deletedBy);
        Task<EntityList<GetApiAuthenticationsResponse>> GetApiAuthentications(ListEntityRequest<BaseFilter> requestData);

    }
}
