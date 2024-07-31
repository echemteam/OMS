namespace OMS.Domain.Entities.API.Response.Functionalities
{
    public class GetFunctionalitiesResponsiblesResponse
    {
        public int? FunctionalitiesResponsiblesId { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public short? ResponsibleUserId { get; set; }
        public string? ResponsibleUserName { get; set; }

    }
}
