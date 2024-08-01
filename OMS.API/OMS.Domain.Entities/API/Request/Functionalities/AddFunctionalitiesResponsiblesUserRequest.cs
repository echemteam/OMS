namespace OMS.Domain.Entities.API.Request.Functionalities
{
    public class AddFunctionalitiesResponsiblesUserRequest
    {
        public int? FunctionalityId { get; set; }
        public short? ResponsibleUserId { get; set; }
    }
}
