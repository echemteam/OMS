namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class AddEntityDTO<T>
    {
        public T? KeyValue { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
