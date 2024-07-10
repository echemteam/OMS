using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApprovalConfigurationRepository : BaseRepository<Customers>, IApprovalConfigurationRepository
    {
        #region SP Name
        const string ADDCUSTOMERSBASICINFORMATION = "AddCustomersBasicInformation";
        #endregion

        public ApprovalConfigurationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Approval Configuration Repository
        #endregion
    }
}
