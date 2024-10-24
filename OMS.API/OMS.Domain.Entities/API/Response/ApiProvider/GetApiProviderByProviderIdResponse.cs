﻿namespace OMS.Domain.Entities.API.Response.ApiProvider
{
    public class GetApiProviderByProviderIdResponse
    {
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? BaseURL { get; set; }
        public string? AuthenticationType { get; set; }
    }
}
