using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.Entity.ApiEventParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventParameterRepository
    {
        Task<AddEntityDto<int>> AddEditApiEventParameter(ApiEventParameterDto requestData);
        Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventParametersId);
        Task<AddEntityDto<int>> DeleteApiEventParameter(int apiEventParametersId, int deletedBy);
        Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData);

    }
}
