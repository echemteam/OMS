using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Shared.Entities.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface IDictionaryRepository
    {

        Task<AddEntityDto<int>> AddEditDictionary(DictionaryDto requestData);
        Task<EntityList<DictionaryListResponse>> GetAllDictionary(ListEntityRequest<BaseFilter> requestData);
        Task<GetDictionaryResponse> GetDictionaryByDictonaryId(int dictionaryId);
    }
}
