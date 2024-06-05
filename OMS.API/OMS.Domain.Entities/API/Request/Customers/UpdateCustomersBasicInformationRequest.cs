using OMS.Domain.Entities.Entity.Customers;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomersBasicInformationRequest: BaseCustomersDTO
    {
        public int? CustomerId { get; set; }
    }
}
