using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.Dictionary;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
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


    }
}
