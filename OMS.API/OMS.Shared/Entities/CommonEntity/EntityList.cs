namespace OMS.Shared.Entities.CommonEntity
{
    public class EntityList<T>
    {
        public List<T>? DataSource { get; set; }
        public int TotalRecord { get; set; }
    }
}
