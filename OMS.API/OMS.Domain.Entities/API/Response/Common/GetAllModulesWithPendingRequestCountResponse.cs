namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllModulesWithPendingRequestCountResponse
    {
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public int? RequestCount { get; set; }
    }
}
