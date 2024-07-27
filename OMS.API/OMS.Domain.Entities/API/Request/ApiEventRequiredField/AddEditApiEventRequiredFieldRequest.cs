namespace OMS.Domain.Entities.API.Request.ApiEventRequiredField
{
    public class AddEditApiEventRequiredFieldRequest
    {
        public int? ApiEventRequiredFieldId { get; set; }
        public string? FieldName { get; set; }
        public string? FieldType { get; set; }
        public string? FieldDescription { get; set; }
    }
}
