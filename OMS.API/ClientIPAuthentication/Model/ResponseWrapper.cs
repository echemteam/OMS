using ClientIPAuthentication.Enum;

namespace ClientIPAuthentication.Model
{
    public class ResponseWrapper<T>
    {
        public ResponseType ResponseType { get; set; }
        public T? ResponseData { get; set; }
        public bool IsEnType { get; set; }

    }
}
