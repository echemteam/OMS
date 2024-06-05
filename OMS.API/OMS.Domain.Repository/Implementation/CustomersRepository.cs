using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomersRepository : BaseRepository<Customers>, ICustomersRepository
    {
        #region SP Name
        const string ADDCUSTOMERSBASICINFORMATION = "AddCustomersBasicInformation";
        const string UPDATECUSTOMERSBASICINFORMATION = "UpdateCustomersBasicInformation";
        #endregion

        public CustomersRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Customers Repository
        public async Task<AddEntityDTO<int>> AddCustomersBasicInformation(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSBASICINFORMATION, new
            {
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.InvoiceSubmissionInstruction,
                customers.Note,
                customers.IsCompany,
                customers.RefCode,
                customers.ListCode,
                customers.TaxId,
                customers.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERSBASICINFORMATION, new
            {
                customers.CustomerId,
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.InvoiceSubmissionInstruction,
                customers.Note,
                customers.IsCompany,
                customers.RefCode,
                customers.ListCode,
                customers.TaxId,
                customers.UpdatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
