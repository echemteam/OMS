using Microsoft.Exchange.WebServices.Data;
using Microsoft.Identity.Client;
using OMS.Domain.Entities.API.Request.Organization;
using System.Net.Mail;

namespace Common.Helper.EmailHelper
{
    public class SendTestOutboundEmailHelper
    {

        public static string? SmtpUserName { get; set; }
        public static string? EmailProvider { get; set; }
        public static string? SmtpServer { get; set; }
        public static int? SmtpPort { get; set; }
        public static bool? UseSsl { get; set; }
        public static string? SmtpPassword { get; set; }
        public static SmtpDeliveryMethod DeliveryMethod { get; set; }
        public static string? ClientId { get; set; }
        public static string? ClientSecret { get; set; }
        public static string? TenantId { get; set; }

        public static void SetUpCredentials(SmtpCheckConnection emailConfig)
        {
            if (emailConfig.EmailProvider == "Office 365")
            {
                ClientId = emailConfig.ClientId;
                ClientSecret = emailConfig.ClientSecret;
                TenantId = emailConfig.TenantId;
                SmtpUserName = emailConfig.SmtpUserName;
            }
            else
            {
                SmtpUserName = emailConfig.SmtpUserName;
                EmailProvider = emailConfig.EmailProvider;
                SmtpServer = emailConfig.SmtpServer;
                SmtpPort = emailConfig.SmtpPort;
                UseSsl = emailConfig.UseSsl;
                SmtpPassword = emailConfig.SmtpPassword;
            }
        }

        public static async Task<bool> SendEmail(SmtpCheckConnection emailConfig)
        {
            SetUpCredentials(emailConfig);
            bool IsMailSend = false;
            try
            {
                if (emailConfig.EmailProvider == "Office 365")
                {
                    MailMessage mailMesg = new()
                    {
                        Body = emailConfig.Body,
                        Subject = emailConfig.Subject,
                        From = new MailAddress(SmtpUserName!),
                        IsBodyHtml = true
                    };
                    string[]? to = null;
                    if (!string.IsNullOrEmpty(emailConfig.EmailTo))
                    {
                        to = emailConfig.EmailTo.Split(';');
                        foreach (string? item in to)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                mailMesg.To.Add(item);
                            }
                        }
                    }
                    #region Send CC Email
                    //if (!string.IsNullOrEmpty(emailDetails.EmailCC))
                    //{
                    //    cc = emailDetails.EmailCC.Split(';');
                    //    foreach (string? item in cc)
                    //    {
                    //        if (!string.IsNullOrEmpty(item))
                    //        {
                    //            mailMesg.To.Add(item);
                    //        }
                    //    }
                    //}
                    //if (!string.IsNullOrEmpty(emailDetails.EmailBCC))
                    //{
                    //    bcc = emailDetails.EmailBCC.Split(';');
                    //    foreach (string? item in bcc)
                    //    {
                    //        if (!string.IsNullOrEmpty(item))
                    //        {
                    //            mailMesg.To.Add(item);
                    //        }
                    //    }
                    //}
                    //emailDetails.EmailId = 0;
                    #endregion

                    AccessParameters accessparam = new();
                    accessparam.ClientId = ClientId;
                    accessparam.ClientSecret = ClientSecret;
                    accessparam.TenantId = TenantId;
                    var accesstoken = GetAccessToken(accessparam);

                    string? MailUser = SmtpUserName;

                    var ews = new ExchangeService(getCorrectTimeZone())
                    {
                        Credentials = new OAuthCredentials(accesstoken),
                        Url = new Uri("https://outlook.office365.com/EWS/Exchange.asmx"),
                        ImpersonatedUserId = new ImpersonatedUserId(ConnectingIdType.SmtpAddress, SmtpUserName)
                    };

                    EmailMessage emailMessage = new(ews)
                    {
                        Subject = emailConfig.Subject,
                        Body = emailConfig.Body
                    };
                    if (!String.IsNullOrEmpty(emailConfig.EmailTo))
                    {
                        foreach (string address in to)
                        {
                            if (!string.IsNullOrEmpty(address))
                                emailMessage.ToRecipients.Add(address);
                        }
                    }
                    #region Send CC Email Code
                    //if (!String.IsNullOrEmpty(emailDetails.EmailCC))
                    //{
                    //    foreach (string address in cc)
                    //    {
                    //        if (!string.IsNullOrEmpty(address))
                    //            emailMessage.CcRecipients.Add(address);
                    //    }
                    //}

                    //if (!String.IsNullOrEmpty(emailDetails.EmailBCC))
                    //{
                    //    foreach (string address in bcc)
                    //    {
                    //        if (!string.IsNullOrEmpty(address))
                    //            emailMessage.BccRecipients.Add(address);
                    //    }
                    //}

                    //if (AttachmentsValues.Count > 0)
                    //{
                    //    foreach (KeyValuePair<string, string> entry in this.AttachmentsValues)
                    //    {
                    //        emailMessage.Attachments.AddFileAttachment(entry.Key, entry.Value);
                    //    }

                    //}
                    //if (AppoitmentValues.Count > 0)
                    //{
                    //    foreach (KeyValuePair<string, MemoryStream> entry in this.AppoitmentValues)
                    //    {
                    //        emailMessage.Attachments.AddFileAttachment(entry.Key, entry.Value);
                    //    }

                    //}
                    #endregion

                    emailMessage.Save();
                    emailMessage.Load(new PropertySet(ItemSchema.MimeContent));
                    emailMessage.Load(new PropertySet(BasePropertySet.IdOnly));
                    System.Threading.Thread.Sleep(50);
                    emailMessage.SendAndSaveCopy();
                    IsMailSend = true;


                }
                else
                {
                    MailMessage mailMesg = new()
                    {
                        Body = emailConfig.Body,
                        Subject = emailConfig.Subject,
                        IsBodyHtml = true
                    };
                    string[] to = emailConfig.EmailTo!.Split(';');
                    if (!String.IsNullOrEmpty(emailConfig.EmailTo))
                    {
                        foreach (string address in to)
                        {
                            if (!string.IsNullOrEmpty(address))
                                mailMesg.To.Add(new MailAddress(address));
                        }
                    }
                    #region Send CC Email Code For Gmail and Other
                    //string[] cc = emailDetails.EmailCC!.Split(';');
                    //string[] bcc = emailDetails.EmailBCC!.Split(';');
                    //if (!String.IsNullOrEmpty(emailDetails.EmailCC))
                    //{
                    //    foreach (string address in cc)
                    //    {
                    //        if (!string.IsNullOrEmpty(address))
                    //            mailMesg.CC.Add(new MailAddress(address));
                    //    }
                    //}
                    //if (!String.IsNullOrEmpty(emailDetails.EmailBCC))
                    //{
                    //    foreach (string address in bcc)
                    //    {
                    //        if (!string.IsNullOrEmpty(address))
                    //            mailMesg.Bcc.Add(new MailAddress(address));
                    //    }
                    //}
                    //if (Attachments.Count > 0)
                    //{
                    //    foreach (Attachment att in Attachments)
                    //        mailMesg.Attachments.Add(att);
                    //}

                    #endregion

                    SmtpClient objSMTP = new();
                    mailMesg.From = new MailAddress(SmtpUserName!);
                    if (!string.IsNullOrEmpty(SmtpUserName))
                    {
                        System.Net.NetworkCredential creditial = new(SmtpUserName, SmtpPassword);
                        objSMTP.Credentials = creditial;
                    }
                    objSMTP.Host = SmtpServer!;
                    objSMTP.EnableSsl = (bool)UseSsl!;
                    objSMTP.Port = (int)SmtpPort!;
                    objSMTP.DeliveryMethod = DeliveryMethod;
                    objSMTP.Send(mailMesg);
                    IsMailSend = true;
                }

            }
            catch (Exception ex)
            {
                return IsMailSend = false;
                //throw ex; // Rethrow the exception
            }

            return IsMailSend;
        }

        public class AccessParameters
        {
            public string? TenantId { get; set; }
            public string? ClientId { get; set; }
            public string? ClientSecret { get; set; }
            public string[] Scopes { get; set; } = { "https://outlook.office365.com/.default" };
        }

        public static string GetAccessToken(AccessParameters accessParameters)
        {
            try
            {
                var cca = ConfidentialClientApplicationBuilder
                    .Create(accessParameters.ClientId)
                    .WithClientSecret(accessParameters.ClientSecret)
                    .WithTenantId(accessParameters.TenantId)
                    .Build();

                AuthenticationResult authResult = null!;
                try
                {
                    authResult = cca.AcquireTokenForClient(accessParameters.Scopes).ExecuteAsync().Result;
                    return authResult.AccessToken;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        static TimeZoneInfo getCorrectTimeZone()
        {
            return TimeZoneInfo.CreateCustomTimeZone("Time zone to workaround a bug", TimeZoneInfo.Local.BaseUtcOffset, "Time zone to workaround a bug", "Time zone to workaround a bug");
        }
    }
}
