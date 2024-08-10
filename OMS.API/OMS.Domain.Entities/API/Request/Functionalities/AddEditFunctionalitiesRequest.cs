namespace OMS.Domain.Entities.API.Request.Functionalities
{
    public class AddEditFunctionalitiesRequest
    {
        public int? FunctionalityId { get; set; }
        public int? ModuleId { get; set; }
        public string? Name { get; set; }
    }
}
