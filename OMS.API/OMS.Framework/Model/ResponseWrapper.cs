namespace OMS.Framework.Model
{
    public enum ResponseType
    {
        Object = 0,
        String = 1
    }

    /// <summary>
    /// This will use to wrap the response 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResponseWrapper<T>
    {
        public ResponseType ResponseType { get; set; }
        public T? ResponseData { get; set; }
        public bool IsEnType { get; set; }

    }
}
