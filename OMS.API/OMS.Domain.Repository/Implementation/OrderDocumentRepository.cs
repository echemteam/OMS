using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderDocument;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderDocumentRepository : BaseRepository<OrderItems>, IOrderDocumentRepository
    {
        #region SP Name
        const string ADDORDERDOCUMENT = "AddOrderDocument";
        #endregion

        public OrderDocumentRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDto<int>> AddOrderDocumnet(OrderDocumentDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERDOCUMENT, new
            {
                requestData.OrderId,
                requestData.DocumentName,
                requestData.DocumentType,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
    }
}
