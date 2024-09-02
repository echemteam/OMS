using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Implementation
{
    internal class DictionaryRepository :BaseRepository<Dictionary>, IDictionaryRepository
    {
        #region SP Name
        const string ADDEDITDICTIONARY = "AddEditDictionary";
        const string GETALLDICTIONARY = "GetAllDictionary";
        const string GETDICTIONARYBYDICTIONARYID = "GetDictionaryByDictioryId";
        #endregion
        public DictionaryRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        #region Dictionary Repository
        public async Task<AddEntityDto<int>> AddEditDictionary(DictionaryDto addEditDictonaryDto)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITDICTIONARY, new
            {
                addEditDictonaryDto.DictionaryId,
                addEditDictonaryDto.Key,
                addEditDictonaryDto.Value,
            }, CommandType.StoredProcedure);
        }
        #endregion

        public async Task<EntityList<DictionaryListResponse>> GetAllDictionary(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<DictionaryListResponse>(GETALLDICTIONARY, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }

        public async Task<GetDictionaryResponse> GetDictionaryByDictonaryId(int dictionaryId)
        {
            GetDictionaryResponse dictionary = await _context.GetFrist<GetDictionaryResponse>(GETDICTIONARYBYDICTIONARYID, new
            {
                dictionaryId
            }, CommandType.StoredProcedure);
            return dictionary;
        }

    }
}
