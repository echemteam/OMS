namespace Common.Helper.Enum
{
    public enum APIResponceCode
    {
        OK = 200,
        BAD_REQUEST = 400,
        UnAthorize = 401,
        NOT_FOUND = 404,
        //If server just point the duplicate
        RecordExist = 409,
        INTERNAL_SERVER_ERROR = 500,
        InValidRequest = 600

    }
}
