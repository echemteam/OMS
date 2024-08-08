using OMS.Domain.Entities.Entity.Customers;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomersBasicInformationRequest : BaseCustomersDto
    {
        public short? ResponsibleUserId { get; set; }
    }
}
