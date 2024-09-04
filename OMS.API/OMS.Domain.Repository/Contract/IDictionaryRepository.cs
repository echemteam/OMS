using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Shared.Entities.CommonEntity;


namespace OMS.Domain.Repository.Contract
{
    public interface IDictionaryRepository
    {

        Task<AddEntityDto<int>> AddEditDictionary(DictionaryDto requestData);
        Task<EntityList<DictionaryListResponse>> GetDictionary(ListEntityRequest<BaseFilter> requestData);
        Task<GetDictionaryResponse> GetDictionaryByDictonaryId(int dictionaryId);
        Task<AddEntityDto<int>> DeleteDictionary(int dictionaryId,short deletedBy);
    }
}
