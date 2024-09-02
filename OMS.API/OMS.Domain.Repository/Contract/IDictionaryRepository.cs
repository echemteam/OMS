using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.Dictionary;
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
    }
}
