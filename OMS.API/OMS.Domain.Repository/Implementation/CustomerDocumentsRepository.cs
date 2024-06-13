using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomerDocumentsRepository : BaseRepository<CustomerDocuments>, ICustomerDocumentsRepository
    {
        #region SP Name
        const string ADDCUSTOMERDOCUMENTS = "AddCustomerDocuments";
        #endregion

        public CustomerDocumentsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Customer Documents Repository 
        public async Task<AddEntityDTO<int>> AddCustomerDocuments(CustomerDocumentsDTO customerDocuments)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERDOCUMENTS, new
            {
                customerDocuments.Name,
                customerDocuments.DocumentTypeId,
                customerDocuments.CustomerId,
                customerDocuments.Attachment,
                customerDocuments.CreatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
