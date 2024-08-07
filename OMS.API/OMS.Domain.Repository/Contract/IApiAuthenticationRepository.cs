using OMS.Domain.Entities.API.Request.ApiAuthentication;
using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.Entity.ApiAuthentication;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiAuthenticationRepository
    {
        Task<AddEntityDto<int>> AddEditApiAuthentication(ApiAuthenticationDto apiAuthentication);

        Task<GetApiAuthenticationByAuthIdResponse> GetApiAuthenticationByAuthId(int authId);
        Task<AddEntityDto<int>> DeleteApiAuthentication(int authId, int deletedBy);
        Task<EntityList<GetApiAuthenticationsResponse>> GetApiAuthentications(GetApiAuthenticationsRequest requestData);

    }
}
