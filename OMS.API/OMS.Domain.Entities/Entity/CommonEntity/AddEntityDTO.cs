namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class AddEntityDto<T>
    {
        public T? KeyValue { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
