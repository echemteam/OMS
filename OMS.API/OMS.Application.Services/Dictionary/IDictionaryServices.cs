
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Dictionary
{
    public interface IDictionaryServices
    {
        Task<AddEntityDto<int>> AddEditDictionary(AddEditDictonaryRequest requestData,short CurrentUserId);
        Task<EntityList<DictionaryListResponse>> GetAllDictionary(ListEntityRequest<BaseFilter> requestData);
        Task<GetDictionaryResponse> GetDictionaryByDictonaryId(int dictionaryId);
        Task<AddEntityDto<int>> DeleteDictionary(int dictionaryId , short CurrentUserId);
    }
}
