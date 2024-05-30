namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class ListEntityRequest<T>
       where T : class
    {
        public PaginationDto? Pagination { get; set; }
        public T? Filters { get; set; }
    }
}
