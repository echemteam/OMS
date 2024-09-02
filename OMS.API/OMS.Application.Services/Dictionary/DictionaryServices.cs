using Common.Helper.Extension;
using OMS.Application.Services.Customers;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public async Task<AddEntityDto<int>> AddEditDictionary(AddEditDictonaryRequest requestData)
        {
            DictionaryDto dictionaryDto = requestData.ToMapp<AddEditDictonaryRequest, DictionaryDto>();
         //   dictionaryDto.CreatedBy = CurrentUserId;
            return await repositoryManager.dictionaryRepository.AddEditDictionary(dictionaryDto);
        }
        public async Task<EntityList<DictionaryListResponse>> GetAllDictionary(ListEntityRequest<BaseFilter> requestData)
        {
            return await repositoryManager.dictionaryRepository.GetAllDictionary(requestData);
        }
    }
}
