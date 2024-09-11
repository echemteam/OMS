using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;


namespace OMS.Application.Services.Dictionary
{
    public class DictionaryServices : BaseServices, IDictionaryServices
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region constructor
        public DictionaryServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion
        public async Task<AddEntityDto<int>> AddEditDictionary(AddEditDictonaryRequest requestData, short CurrentUserId)
        {
            DictionaryDto dictionaryDto = requestData.ToMapp<AddEditDictonaryRequest, DictionaryDto>();
            dictionaryDto.CreatedBy = CurrentUserId;
            return await repositoryManager.dictionaryRepository.AddEditDictionary(dictionaryDto);
        }
        public async Task<EntityList<DictionaryListResponse>> GetDictionary(ListEntityRequest<BaseFilter> requestData)
        {
            return await repositoryManager.dictionaryRepository.GetDictionary(requestData);
        }
        public async Task<GetDictionaryResponse> GetDictionaryByDictonaryId(int dictionaryId)
        {
            return await repositoryManager.dictionaryRepository.GetDictionaryByDictonaryId(dictionaryId);
        }
        public async Task<AddEntityDto<int>> DeleteDictionary(int dictionaryId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.dictionaryRepository.DeleteDictionary(dictionaryId, deletedBy);
        }
    }
}
