using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.Entity.ApiEventParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventParameterRepository
    {
        Task<AddEntityDTO<int>> AddEditApiEventParameter(ApiEventParameterDTO requestData);
        Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventId);
        Task<AddEntityDTO<int>> DeleteApiEventParameter(int parameterId, int deletedBy);
        Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData);

    }
}
