using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.API.Request.Contact
{
    public class AddEditContactRequest
    {
        public int? ContactId { get; set; }
        public int? CustomerId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

    }
}
