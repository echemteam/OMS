using Common.Helper.Enum;

namespace OMS.Framework.Model
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string? Message { get; set; }
        public APIResponceCode StatusCode { get; set; }

    }
}
