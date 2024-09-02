using Microsoft.AspNetCore.Mvc;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.API.Response.Dictionary;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Application.Services.Dictionary
{
    public interface IDictionaryServices
    {
        Task<AddEntityDto<int>> AddEditDictionary(AddEditDictonaryRequest requestData);
        Task<EntityList<DictionaryListResponse>> GetAllDictionary(ListEntityRequest<BaseFilter> requestData);
    }
}
