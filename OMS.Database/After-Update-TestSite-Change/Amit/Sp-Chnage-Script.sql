
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[ValidateCustomerData]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCompany]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[UpdateCustomerSubCompany]
GO
/****** Object:  StoredProcedure [dbo].[GetSubCustomerByCustomerId]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetSubCustomerByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetCustomersBasicInformationById]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetCustomers]
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetApiParameters]
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetApiEndpoints]
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[GetApiAuthentications]
GO
/****** Object:  StoredProcedure [dbo].[DeleteSubCustomer]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[DeleteSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddSubCustomer]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[AddSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSmtpSettings]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[AddEditSmtpSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationProfile]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[AddEditOrganizationProfile]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationOtherSettings]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[AddEditOrganizationOtherSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 23-07-2024 11:07:39 ******/
DROP PROCEDURE [dbo].[AddCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[GetSmtpSettings]    Script Date: 23-07-2024 13:18:15 ******/
DROP PROCEDURE [dbo].[GetSmtpSettings]
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationProfile]    Script Date: 23-07-2024 13:18:15 ******/
DROP PROCEDURE [dbo].[GetOrganizationProfile]
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationOtherSettings]    Script Date: 23-07-2024 13:18:15 ******/
DROP PROCEDURE [dbo].[GetOrganizationOtherSettings]
GO
/****** Object:  StoredProcedure [dbo].[GetAllApproveCustomerForLinking]    Script Date: 23-07-2024 13:18:15 ******/
DROP PROCEDURE [dbo].[GetAllApproveCustomerForLinking]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 23-07-2024 11:07:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCustomersBasicInformation]                        
@Name VARCHAR(200),                        
@GroupTypeId SMALLINT,                        
@TerritoryId VARCHAR(150),                        
@CountryId SMALLINT,                        
@EmailAddress VARCHAR(255),                        
@Website NVARCHAR(250),                          
@Note VARCHAR(200),                            
@TaxId VARCHAR(15),                    
@CreatedBy SMALLINT,          
@IsBuyingForThirdParty bit,        
@ResponsibleUserId SMALLINT        
                              
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                        
    DECLARE @keyId AS INT                                
                   
        IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)                         
        BEGIN                    
         SELECT CAST(0 AS INT) as KeyValue,                                                        
            'Customer already exists.' as ErrorMessage                         
        END                    
        ELSE                  
            BEGIN                  
            INSERT INTO [dbo].[Customers]                              
            (                        
            Name,                      
            GroupTypeId,                        
            TerritoryId,                        
            CountryId,                        
            Website,                                               
            TaxId,                         
            StatusId,                
            IsActive,                
            CreatedBy,                              
            CreatedAt,          
            IsBuyingForThirdParty,        
            ResponsibleUserId        
            )                              
            VALUES                            
            (                        
            @Name,                      
            @GroupTypeId,                           
            @TerritoryId,                        
            @CountryId,                        
            @Website,                                               
            @TaxId,                          
            1,                
            1,                
            @CreatedBy,                              
            GETDATE(),          
            @IsBuyingForThirdParty,        
            @ResponsibleUserId        
            )                              
                              
            SET  @keyId = SCOPE_IDENTITY()                                      
                              
            SELECT @keyId as KeyValue,                                       
            'Customer Added' as ErrorMessage                                 
            END                  
            IF @keyId > 0                        
            BEGIN                        
            INSERT INTO [dbo].[Emails](EmailAddress,OwnerId,OwnerTypeId,CreatedBy,CreatedAt)                        
            VALUES(@EmailAddress,@keyId,1,@CreatedBy,GETDATE())                        
                        
            IF @keyId > 0 AND @Note != NULL                 
            INSERT INTO [dbo].[CustomerNotes](Note,CustomerId,CreatedBy,CreatedAt)                        
            VALUES(@Note,@keyId,@CreatedBy,GETDATE())
            END
   
                 
                              
END TRY                                          
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
 RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                        
END CATCH                                        
END 
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationOtherSettings]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
CREATE PROCEDURE [dbo].[AddEditOrganizationOtherSettings]           
@OrganizationOtherSettingId INT,    
@OrganizationId TINYINT,    
@DefaultPaymentTerms TINYINT,    
@FedexAccountDetail VARCHAR(255),    
@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationOtherSettingId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationOtherSettings]WHERE [OrganizationOtherSettingId] = @OrganizationOtherSettingId)          
            BEGIN          
                UPDATE [dbo].[OrganizationOtherSettings]    
                SET          
                    [OrganizationId] = @OrganizationId,    
                    [DefaultPaymentTerms] = @DefaultPaymentTerms,    
                    [FedexAccountDetail] = @FedexAccountDetail,    
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationOtherSettingId] = @OrganizationOtherSettingId    
                          
                SELECT @OrganizationOtherSettingId AS KeyValue,             
                'Organization Other Settings Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationOtherSettingId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationOtherSettings]    
            (                   
                OrganizationId,    
                DefaultPaymentTerms,    
                FedexAccountDetail,    
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @OrganizationId,    
                @DefaultPaymentTerms,    
                @FedexAccountDetail,    
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Other Settings added' AS ErrorMessage;          
        END          
          
                 
    END TRY                              
    BEGIN CATCH                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                                
        DECLARE @ErrorState INT = ERROR_STATE();                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                
    END CATCH;          
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationProfile]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE PROCEDURE [dbo].[AddEditOrganizationProfile]       
@OrganizationId TINYINT,
@Name VARCHAR(255),
@Logo VARCHAR(255),
@AddressLine1 VARCHAR(255),
@AddressLine2 VARCHAR(255),
@CityId INT,
@StateId INT,
@CountryId SMALLINT,
@ZipCode INT,
@CreatedBy SMALLINT
AS      
BEGIN      
    SET NOCOUNT ON;                  
    BEGIN TRY                                  
        DECLARE @keyId AS INT;      
      
        IF @OrganizationId > 0      
        BEGIN      
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationProfile] WHERE OrganizationId = @OrganizationId)      
            BEGIN      
                UPDATE [dbo].[OrganizationProfile]      
                SET      
                    [Name] = @Name,
                    [Logo] = @Logo,
                    [AddressLine1] = @AddressLine1,
                    [AddressLine2] = @AddressLine2,
                    [CityId] = @CityId,
                    [StateId] = @StateId,
                    [CountryId] = @CountryId,
                    [ZipCode] = @ZipCode,
                    [UpdatedAt] = GETDATE(),
                    [UpdatedBy] = @CreatedBy 
                WHERE      
                    [OrganizationId] = @OrganizationId
                      
                SELECT @OrganizationId AS KeyValue,         
                'Organization Profile Updated' AS ErrorMessage;      
            END      
            ELSE      
            BEGIN      
                SELECT @OrganizationId AS KeyValue,         
                  'NO RECORD FOUND' AS ErrorMessage;      
            END      
        END      
        ELSE      
        BEGIN      
            INSERT INTO [dbo].[OrganizationProfile]
            (               
               Name,
                Logo,
                AddressLine1,
                AddressLine2,
                CityId,
                StateId,
                CountryId,
                ZipCode,
                CreatedBy,
                CreatedAt
            )                  
            VALUES                
            (              
                @Name,
                @Logo,
                @AddressLine1,
                @AddressLine2,
                @CityId,
                @StateId,
                @CountryId,
                @ZipCode,
                @CreatedBy,
                GETDATE()  
            );                  
                  
            SET @keyId = SCOPE_IDENTITY();      
         
            SELECT @keyId AS KeyValue,         
            'Organization Profile added' AS ErrorMessage;      
        END      
      
             
    END TRY                          
    BEGIN CATCH                            
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                            
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                            
        DECLARE @ErrorState INT = ERROR_STATE();                            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                            
    END CATCH;      
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditSmtpSettings]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
CREATE PROCEDURE [dbo].[AddEditSmtpSettings]           
@SMTPSettingId SMALLINT,    
@OrganizationId TINYINT,    
@EmailProvider VARCHAR(255),    
@SMTPServer VARCHAR(255),    
@SMTPPort INT,    
@SMTPUsername VARCHAR(255),    
@SMTPPassword VARCHAR(255),    
@UseSSL BIT,    
@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @SMTPSettingId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[SMTPSettings] WHERE [SMTPSettingId] = @SMTPSettingId)          
            BEGIN          
                UPDATE [dbo].[SMTPSettings]          
                SET          
                    [OrganizationId] = @OrganizationId,  
                    [EmailProvider] = @EmailProvider,  
                    [SmtpServer] = @SmtpServer,  
                    [SmtpPort] = @SmtpPort,  
                    [SmtpUserName] = @SmtpUserName,  
                    [SmtpPassword] = @SmtpPassword,  
                    [UseSsl] = @UseSsl,  
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                    [SMTPSettingId] = @SMTPSettingId    
                          
                SELECT @SMTPSettingId AS KeyValue,             
                'SMTP Settings Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @SMTPSettingId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[SMTPSettings]    
            (                   
                OrganizationId,    
                EmailProvider,    
                SmtpServer,    
                SmtpPort,    
                SmtpUserName,    
                SmtpPassword,    
                UseSsl,    
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @OrganizationId,    
                @EmailProvider,    
                @SmtpServer,    
                @SmtpPort,    
                @SmtpUserName,    
                @SmtpPassword,    
                @UseSsl,    
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'SMTP Settings added' AS ErrorMessage;          
        END          
          
                 
    END TRY                              
    BEGIN CATCH                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                                
        DECLARE @ErrorState INT = ERROR_STATE();                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                
    END CATCH;          
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddSubCustomer]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddSubCustomer]                
@CustomerId int,  
@SubCustomerId int                
AS                
BEGIN                
 SET NOCOUNT ON;                
BEGIN TRY                              
   DECLARE @keyId AS INT                  
         
   INSERT INTO [dbo].[SubCustomerMainCustomer]  
    (             
        CustomerId,  
        SubCustomerId       
    )                
    VALUES              
    (            
        @CustomerId,  
        @SubCustomerId       
    )                
                
   SET  @keyId = SCOPE_IDENTITY()                        
                
   SELECT @keyId as KeyValue,                         
   'Sub Customer added' as ErrorMessage                       
            
END TRY                            
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
 RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                          
END 
GO
/****** Object:  StoredProcedure [dbo].[DeleteSubCustomer]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
--DeleteSubCustomer 2,2      
CREATE PROCEDURE [dbo].[DeleteSubCustomer]      
 @SubCustomerMainCustomerId int,    
 @DeletedBy SMALLINT      
AS      
BEGIN      
    SET NOCOUNT ON;      
      
    BEGIN TRY      
        IF EXISTS (SELECT SubCustomerMainCustomerId FROM [dbo].[SubCustomerMainCustomer]WHERE [SubCustomerMainCustomerId]= @SubCustomerMainCustomerId)      
        BEGIN      
            UPDATE [dbo].[SubCustomerMainCustomer]  
            SET      
                [DeletedBy] = @DeletedBy,      
                [DeletedAt] = GETDATE()      
            WHERE SubCustomerMainCustomerId = @SubCustomerMainCustomerId    
      
            SELECT @SubCustomerMainCustomerId AS KeyValue,      
                   'Sub Customer Deleted' AS ErrorMessage;      
        END      
        ELSE      
        BEGIN      
            SELECT @SubCustomerMainCustomerId AS KeyValue,      
                   'No Record Found' AS ErrorMessage;      
        END      
    END TRY      
    BEGIN CATCH      
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();      
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();      
        DECLARE @ErrorState INT = ERROR_STATE();      
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);      
    END CATCH      
END; 
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApiAuthentications 8,1,25,'','',500
CREATE PROCEDURE [dbo].[GetApiAuthentications]     
    @ProviderId INT,                                              
    @PageNumber INT = 1,                        
    @PageSize INT = 25,                        
    @SearchText NVARCHAR(200),  
    @SortString VARCHAR(250),                         
    @TotalCount INT OUTPUT                                               
AS                                                
BEGIN                           
                      
    SET NOCOUNT ON;                        
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                        
      
    DECLARE @OrderBy NVARCHAR(250) = '';      
    SET @OrderBy = @SortString     
        
    IF @SortString = '' OR @SortString IS NULL    
    BEGIN      
    SET @OrderBy = 'AA.CreatedAt DESC';      
    END   
                                    
    -- Get the total count                        
    SELECT @TotalCount = COUNT(*)                        
    FROM [dbo].[APIAuthentication] AA         
    LEFT JOIN [dbo].[APIProviders] AP ON AP.ProviderId= AA.ProviderID                      
    WHERE           
          AA.ProviderId=@ProviderId AND AA.DeletedAt IS NULL AND Aa.DeletedBy IS NULL AND          
         (          
            @SearchText = '' OR          
            AP.Name LIKE '%' + @SearchText + '%' OR          
            AA.ClientId LIKE '%' + @SearchText + '%'OR    
            AA.ClientSecret LIKE '%' + @SearchText + '%' OR    
            AA.AuthKey LIKE '%' + @SearchText + '%'       
         )         
     
    DECLARE @SQL NVARCHAR(MAX);           
    SET @SQL='                     
        SELECT                        
            AA.AuthId,    
            AA.ProviderId,    
            AP.Name as ProviderName,    
            AP.AuthenticationType,    
            AA.AuthKey,    
            AA.ClientId,    
            AA.ClientSecret,    
            AA.TokenEndpoint,    
            AA.TokenExpires           
        FROM [dbo].[APIAuthentication] AA         
        LEFT JOIN [dbo].[APIProviders] AP ON AP.ProviderId= AA.ProviderID                               
        WHERE           
                AA.ProviderId=@ProviderId AND AA.DeletedAt IS NULL AND Aa.DeletedBy IS NULL AND                    
                (          
                @SearchText = '''' OR          
                AP.Name LIKE ''%'' + @SearchText + ''%'' OR          
                AA.ClientId LIKE ''%'' + @SearchText + ''%''OR    
                AA.ClientSecret LIKE ''%'' + @SearchText +''%'' OR    
                AA.AuthKey LIKE ''%'' + @SearchText + ''%''       
                )         
              
        ORDER BY ' + @OrderBy + '                       
        OFFSET @Offset ROWS                        
        FETCH NEXT @PageSize ROWS ONLY;';                       
         
        EXEC sp_executesql @SQL,    
        N'@ProviderId INT, @SearchText NVARCHAR(200), @Offset INT, @PageSize INT',    
        @ProviderId,@SearchText, @Offset, @PageSize;                                      
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApiEndpoints 8,1,25,'','',500   
CREATE PROCEDURE [dbo].[GetApiEndpoints] 
    @ProviderId INT,                                           
    @PageNumber INT = 1,                    
    @PageSize INT = 25,                    
    @SearchText NVARCHAR(200),  
    @SortString VARCHAR(250),                       
    @TotalCount INT OUTPUT                                           
AS                                            
BEGIN                       
                  
    SET NOCOUNT ON;                    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                    
      
    DECLARE @OrderBy NVARCHAR(250) = '';    
    SET @OrderBy = @SortString   
      
    IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'AE.CreatedAt DESC';    
    END                 
    -- Get the total count                    
    SELECT @TotalCount = COUNT(*)                    
    FROM [dbo].[APIEndpoints] AE     
    LEFT JOIN [dbo].[APIProviders] AP ON AE.ProviderId = AP.ProviderId                        
    WHERE       
        AE.ProviderId=@ProviderId AND AE.DeletedAt IS NULL AND AE.DeletedBy IS NULL AND      
        (      
            @SearchText = '' OR      
            AE.Name LIKE '%' + @SearchText + '%' OR      
            AP.Name LIKE '%' + @SearchText + '%' OR      
            AE.Path LIKE '%' + @SearchText + '%'      
        )        
     
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='              
        SELECT                    
            AE.EndpointId,    
            AE.ProviderId,    
            AP.Name,    
            AE.Name AS EndpointName,    
            AE.Path,    
            AE.Method,    
            AE.Description         
        FROM [dbo].[APIEndpoints] AE    
        LEFT JOIN [dbo].[APIProviders] AP ON AE.ProviderId = AP.ProviderId                          
        WHERE       
               AE.ProviderId=@ProviderId AND AE.DeletedAt IS NULL AND AE.DeletedBy IS NULL AND      
            (      
                @SearchText = '''' OR      
                AE.Name LIKE ''%'' + @SearchText + ''%'' OR      
                AP.Name LIKE ''%'' + @SearchText + ''%'' OR      
                AE.Path LIKE ''%'' + @SearchText + ''%''      
            )     
          
        ORDER BY ' + @OrderBy + '                
        OFFSET @Offset ROWS                    
        FETCH NEXT @PageSize ROWS ONLY;';   
  
        EXEC sp_executesql @SQL,  
        N'@ProviderId INT,@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
        @ProviderId, @SearchText, @Offset, @PageSize;                  
                                        
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApiParameters 13,1,25,'','',500
CREATE PROCEDURE [dbo].[GetApiParameters]
    @EndpointId INT,                                              
    @PageNumber INT = 1,                      
    @PageSize INT = 25,                      
    @SearchText NVARCHAR(200),  
    @SortString VARCHAR(250),                       
    @TotalCount INT OUTPUT                                             
AS                                              
BEGIN                         
                    
    SET NOCOUNT ON;                      
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                      
    DECLARE @OrderBy NVARCHAR(250) = '';      
    SET @OrderBy = @SortString     
        
    IF @SortString = '' OR @SortString IS NULL    
    BEGIN      
        SET @OrderBy = 'AP.CreatedAt DESC';      
    END                                   
    -- Get the total count                      
    SELECT @TotalCount = COUNT(*)                      
    FROM [dbo].[APIParameters] AP    
    LEFT JOIN [dbo].[APIEndpoints] AE ON AE.EndpointId = AP.EndpointId                       
    WHERE         
        AP.EndpointId=@EndpointId AND AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND        
        (        
            @SearchText = '' OR        
            AE.Name LIKE '%' + @SearchText + '%' OR        
            AP.Name LIKE '%' + @SearchText + '%'     
        )          
      
  
    DECLARE @SQL NVARCHAR(MAX);           
    SET @SQL='                 
        SELECT                      
            AP.ParameterId,    
            AP.EndpointId,    
            AE.Name AS EndpointName,    
            AP.Name,    
            AP.DataType,    
            AP.DefaultValue,    
            AP.IsRequired         
        FROM [dbo].[APIParameters] AP       
        LEFT JOIN [dbo].[APIEndpoints] AE ON AE.EndpointId = AP.EndpointId                            
        WHERE         
             AP.EndpointId=@EndpointId AND AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND        
             (        
                @SearchText = '''' OR        
                AE.Name LIKE ''%'' + @SearchText + ''%'' OR        
                AP.Name LIKE ''%'' + @SearchText + ''%''      
             )       
            
        ORDER BY  ' + @OrderBy + '                     
        OFFSET @Offset ROWS                      
        FETCH NEXT @PageSize ROWS ONLY;';                     
           
        EXEC sp_executesql @SQL,    
        N'@EndpointId INT,@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',    
        @EndpointId,@SearchText, @Offset, @PageSize;                                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomers 1,150,'','','',500                    
CREATE PROCEDURE [dbo].[GetCustomers]                          
  @PageNumber INT = 1,                          
  @PageSize INT = 25,                          
  @SearchText NVARCHAR(50) = '',   
  @SortString VARCHAR(250),                         
  @StatusId VARCHAR(15) = '',                          
  @TotalCount INT OUTPUT                          
AS                          
BEGIN                          
    SET NOCOUNT ON;                          
BEGIN TRY                        
    -- Calculate the offset for pagination                          
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                          
    DECLARE @OrderBy NVARCHAR(250) = '';      
    SET @OrderBy = @SortString     
    IF @SortString = '' OR @SortString IS NULL    
    BEGIN      
        SET @OrderBy = 'C.CustomerId DESC';      
    END     
      DECLARE @SQL NVARCHAR(MAX);  
        SET @SQL = '  
        DECLARE @StatusIdsTable TABLE (StatusId VARCHAR(15));  
  
        INSERT INTO @StatusIdsTable (StatusId)  
        SELECT value  
        FROM STRING_SPLIT(@StatusId, '','')  
        WHERE @StatusId IS NOT NULL; -- Filter out NULL values  
  
        -- Get the total count  
        SELECT @TotalCount = COUNT(*)  
        FROM [dbo].[Customers] C  
        LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId  
        LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND E.OwnerTypeId = 1  
        LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId = CIAR.CustomerId AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL  
        WHERE  
            (@StatusId = '''' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))  
            AND (C.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL  
            OR C.TaxId = @SearchText OR @SearchText IS NULL  
            OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)  
            AND C.DeletedBy IS NULL  
            AND C.DeletedAt IS NULL;  
  
        -- Select the data with the corrected WHERE clause  
        SELECT  
            C.CustomerId,  
            C.Name,  
            C.TaxId,  
            C.WebSite,  
            C.StatusId,  
            S.Status,  
            CIAR.InActiveReason,  
            C.UpdatedAt,  
            C.ResponsibleUserId,  
            U.FirstName + '' '' + U.LastName AS ResponsibleUserName,  
            C.IsSubCustomer  
        FROM [dbo].[Customers] C  
        LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId  
        LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND E.OwnerTypeId = 1  
        LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId = CIAR.CustomerId AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL  
        LEFT JOIN Users U ON U.UserId = C.ResponsibleUserId  
        WHERE  
            (@StatusId = '''' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))  
            AND (C.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL  
            OR C.TaxId = @SearchText OR @SearchText IS NULL  
            OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)  
            AND C.DeletedBy IS NULL  
            AND C.DeletedAt IS NULL  
        ORDER BY ' + @OrderBy + '  
        OFFSET @Offset ROWS  
        FETCH NEXT @PageSize ROWS ONLY;';  
  
        -- Execute the dynamic SQL  
        EXEC sp_executesql @SQL,  
        N'@StatusId VARCHAR(15), @SearchText NVARCHAR(50), @Offset INT, @PageSize INT, @OrderBy NVARCHAR(250), @TotalCount INT OUTPUT',  
        @StatusId, @SearchText, @Offset, @PageSize, @OrderBy, @TotalCount OUTPUT;  
END TRY                      
    BEGIN CATCH                          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                        
    END CATCH            
END;
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomersBasicInformationById 16            
CREATE PROCEDURE [dbo].[GetCustomersBasicInformationById]                            
 @CustomerId int            
as                            
Begin                            
SET NOCOUNT ON;                            
BEGIN TRY                            
                            
 SELECT                
  C.Name,                
  C.GroupTypeId,          
  GT.Type,                  
  C.TerritoryId,          
  T.Territory,                  
  C.CountryId,          
  CS.Name AS CountryName,               
  E.EmailAddress,            
  C.Website,            
  C.TaxId,                    
  C.IsBuyingForThirdParty,      
  C.StatusId,      
  S.Status,      
  C.ResponsibleUserId,      
  U.FirstName + ' ' + U.LastName AS ResponsibleUserName,  
  C.IsSubCustomer  
 FROM [dbo].[Customers] C            
 LEFT JOIN [dbo].[CustomerNotes] CN ON C.CustomerId = CN.CustomerId            
 LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND OwnerTypeId = 1          
 LEFT JOIN [dbo].[Countries] CS ON C.CountryId = CS.CountryId          
 LEFT JOIN [dbo].[GroupTypes] GT ON C.GroupTypeId = GT.GroupTypeId          
 LEFT JOIN [dbo].[Territories] T ON C.TerritoryId = T.TerritoryId      
 LEFT JOIN [dbo].[Status] S ON S.StatusId = C.StatusId         
 LEFT JOIN Users U ON U.UserId =C.ResponsibleUserId      
 WHERE C.CustomerId = @CustomerId            
 AND C.DeletedBy IS NULL             
 AND C.DeletedAt IS NULL                                            
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                            
END 
GO

/****** Object:  StoredProcedure [dbo].[GetSubCustomerByCustomerId]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetSubCustomerByCustomerId 1091,1,25,'','',200                    
CREATE PROCEDURE [dbo].[GetSubCustomerByCustomerId]                                                                    
 @CustomerId int,                 
 @PageNumber INT = 1,                                                    
 @PageSize INT = 25,                
 @SearchText NVARCHAR(200),        
 @SortString VARCHAR(250),                   
 @TotalCount INT OUTPUT                    
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
        
    -- Calculate the offset for pagination                    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                  
            
    -- Set the default sort order if @SortString is empty or NULL    
    DECLARE @OrderBy NVARCHAR(250) = '';          
    IF @SortString = '' OR @SortString IS NULL        
    BEGIN          
        SET @OrderBy = 'SC.SubCustomerMainCustomerId DESC';          
    END         
    ELSE    
    BEGIN    
        SET @OrderBy = @SortString;    
    END    
            
    -- Get the total count                    
    SELECT @TotalCount = COUNT(*)                    
    FROM [dbo].[SubCustomerMainCustomer] SC          
    LEFT JOIN [dbo].[Customers] C ON SC.SubCustomerId = C.[CustomerId]    
    LEFT JOIN [dbo].[Countries] CO ON C.[CountryId] = CO.CountryId          
    WHERE SC.CustomerId = @CustomerId     
      AND SC.DeletedBy IS NULL     
      AND SC.DeletedAt IS NULL                   
      AND (@SearchText IS NULL OR @SearchText = ''           
      OR C.[Name] LIKE '%' + @SearchText + '%'           
      OR CO.[Name] LIKE '%' + @SearchText + '%');                  
            
    -- Prepare the SQL query for fetching data with pagination    
    DECLARE @SQL NVARCHAR(MAX);               
    SET @SQL = '    
    SELECT          
        SC.SubCustomerMainCustomerId,    
        SC.CustomerId,    
        SC.SubCustomerId,    
        C.[Name] AS SubCustomerName,    
        CO.[Name] AS CountryName,    
        C.TaxId    
    FROM [dbo].[SubCustomerMainCustomer] SC          
    LEFT JOIN [dbo].[Customers] C ON SC.SubCustomerId = C.[CustomerId]    
    LEFT JOIN [dbo].[Countries] CO ON C.[CountryId] = CO.CountryId          
    WHERE SC.CustomerId = @CustomerId    
      AND SC.DeletedBy IS NULL     
      AND SC.DeletedAt IS NULL                   
      AND (@SearchText IS NULL OR @SearchText = ''''           
      OR C.[Name] LIKE ''%'' + @SearchText + ''%''           
      OR CO.[Name] LIKE ''%'' + @SearchText + ''%'')                     
    ORDER BY ' + @OrderBy + '                     
    OFFSET @Offset ROWS                    
    FETCH NEXT @PageSize ROWS ONLY;';                               
             
    -- Execute the dynamic SQL    
    EXEC sp_executesql @SQL,       
        N'@CustomerId INT, @SearchText NVARCHAR(200), @Offset INT, @PageSize INT',     
        @CustomerId, @SearchText, @Offset, @PageSize;                            
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCompany]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                
CREATE PROCEDURE [dbo].[UpdateCustomerSubCompany]                    
 @CustomerId INT,                         
 @IsSubCompany BIT  
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
 BEGIN TRY  
			IF @IsSubCompany = 0
			BEGIN
				UPDATE [dbo].[L_CustomerAddresses] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;      
				UPDATE [dbo].[L_CustomerContacts] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;   
                UPDATE [dbo].[CustomerDocuments] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;
				UPDATE [dbo].[Customers] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;
			END
		--ELSE 
  --      BEGIN                    
             UPDATE [dbo].[Customers] SET IsSubCompany= @IsSubCompany WHERE CustomerId = @CustomerId  
  
             SELECT @CustomerId as KeyValue,                             
             'Sub Company updated' as ErrorMessage           
        --END           
 END TRY                             
    BEGIN CATCH                              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                              
    END CATCH                         
END 
GO
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 23-07-2024 11:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateCustomerData 6      
CREATE PROCEDURE [dbo].[ValidateCustomerData]      
 @CustomerId INT,
 @IsSubCustomer BIT
AS      
BEGIN      
    DECLARE @ValidationResults TABLE      
    (      
        IsValid BIT,      
        Messages NVARCHAR(MAX)      
    );      
      
    DECLARE @IsValid BIT = 1;   
    DECLARE @CustomerName NVARCHAR(100)
    DECLARE @DeliveryAccountsId NVARCHAR(100);

    SELECT @CustomerName = Name FROM Customers WHERE CustomerId = @CustomerId AND deletedby IS NULL AND deletedAt IS NULL;  
    SELECT @DeliveryAccountsId = DeliveryAccountId FROM dbo.CustomerAccoutingSettings WHERE CustomerId = @CustomerId;      
    -- Check For Customer Basic Destils      
    --IF EXISTS (SELECT 1 FROM Customers WHERE CustomerId = @CustomerId AND TaxId IS NOT NULL)      
    --BEGIN      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (1, @CustomerName + ' has an TaxId');      
    --END      
    --ELSE      
    --BEGIN      
    --    SET @IsValid = 0;      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (0,  @CustomerName +' does not have an TaxId');      
    --END      
      
    -- Check For Customer Billing Address
	IF @IsSubCustomer = 0
	BEGIN
		IF EXISTS (SELECT 1 FROM L_CustomerAddresses WHERE CustomerId = @CustomerId AND AddressTypeId = 1)
		BEGIN
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (1, @CustomerName + ' has a Billing Address');
		END
		ELSE
		BEGIN
			SET @IsValid = 0;
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (0, @CustomerName + ' does not have a Billing Address');
		END
	END

    -- Check for Customer Shipping Address
	IF @IsSubCustomer = 0
	BEGIN
		IF EXISTS (SELECT 1 FROM L_CustomerAddresses WHERE CustomerId = @CustomerId AND AddressTypeId = 2)
		BEGIN
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (1, @CustomerName + ' has a Shipping Address');
		END
		ELSE
		BEGIN
			SET @IsValid = 0;
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (0, @CustomerName + ' does not have a Shipping Address');
		END 
	END
   
    --Check for Customer Conatact
	IF @IsSubCustomer = 0
	BEGIN
		IF EXISTS (SELECT 1 FROM [dbo].[L_CustomerContacts] WHERE CustomerId = @CustomerId AND ContactTypeId = 4)
		BEGIN
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (1, @CustomerName + ' has a Invoice Submission Contact Email');
		END
		ELSE
		BEGIN
			SET @IsValid = 0;
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (0, @CustomerName + ' does not have a Invoice Submission Contact Email');
		END
	END
   
	IF @IsSubCustomer = 0
	BEGIN
		IF EXISTS (SELECT 1 FROM [dbo].[L_CustomerContacts] WHERE CustomerId = @CustomerId AND ContactTypeId = 6)
		BEGIN
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (1, @CustomerName + ' has a Accounts Payable Contact Email');
		END
		ELSE
		BEGIN
			SET @IsValid = 0;
			INSERT INTO @ValidationResults (IsValid, Messages)
			VALUES (0, @CustomerName + ' does not have a Accounts Payable Contact Email');
		END
	END

     -- Check Customer Default Payment Terms Template
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccoutingSettings] WHERE CustomerId = @CustomerId AND PaymentTermId IS NOT NULL)
    BEGIN
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (1, @CustomerName + ' has a Default Payment Terms Template');
    END
    ELSE
    BEGIN
        SET @IsValid = 0;
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (0, @CustomerName + ' does not have a Default Payment Terms Template');
    END

    -- Check Customer Payment Method
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccoutingSettings] WHERE CustomerId = @CustomerId AND PaymentMethodId IS NOT NULL)
    BEGIN
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (1, @CustomerName + ' has a Payment Method');
    END
    ELSE
    BEGIN
        SET @IsValid = 0;
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (0, @CustomerName + ' does not have a Payment Method.');
    END

    -- Check Customer Credit Limit
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccoutingSettings] WHERE CustomerId = @CustomerId AND CreditLimit IS NOT NULL)
    BEGIN
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (1, @CustomerName + ' has a Credit Limit');
    END
    ELSE
    BEGIN
        SET @IsValid = 0;
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (0, @CustomerName + ' does not have a Credit Limit.');
    END

    -- Check Customer Billing Currency
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccoutingSettings] WHERE CustomerId = @CustomerId AND BillingCurrency IS NOT NULL)
    BEGIN
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (1, @CustomerName + ' has a Billing Currency.');
    END
    ELSE
    BEGIN
        SET @IsValid = 0;
        INSERT INTO @ValidationResults (IsValid, Messages)
        VALUES (0, @CustomerName + ' does not have a Billing Currency.');
    END

    IF @DeliveryAccountsId IS NOT NULL OR @DeliveryAccountsId != ''
    BEGIN
    -- Check if Accounting Settings are present
    SET @IsValid = 1;
    INSERT INTO @ValidationResults (IsValid, Messages)
    VALUES (1, @CustomerName + ' has Accounting Settings');

    -- Check Delivery Methods if @DeliveryAccountsId is 1 or null/empty
    IF @DeliveryAccountsId = 1 OR @DeliveryAccountsId IS NULL OR @DeliveryAccountsId = ''
    BEGIN
        IF EXISTS (SELECT * FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] WHERE CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL)
        BEGIN
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (1, @CustomerName + ' has Delivery Methods');
        END
        ELSE
        BEGIN
            SET @IsValid = 0;
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (0, @CustomerName + ' does not have Delivery Methods');
        END
    END

    -- Check Delivery Carriers if @DeliveryAccountsId is 2 or null/empty
    IF @DeliveryAccountsId = 2 OR @DeliveryAccountsId IS NULL OR @DeliveryAccountsId = ''
    BEGIN
        IF EXISTS (SELECT * FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] WHERE CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL)
        BEGIN
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (1, @CustomerName + ' has Delivery Methods');
        END
        ELSE
        BEGIN
            SET @IsValid = 0;
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (0, @CustomerName + ' does not have Delivery Methods');
        END

        IF EXISTS (SELECT * FROM [dbo].[L_CustomerDeliveryCarriers] WHERE CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL)
        BEGIN
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (1, @CustomerName + ' has Delivery Carriers');
        END
        ELSE
        BEGIN
            SET @IsValid = 0;
            INSERT INTO @ValidationResults (IsValid, Messages)
            VALUES (0, @CustomerName + ' does not have Delivery Carriers');
        END
    END
    END
    ELSE
    BEGIN
    -- @DeliveryAccountsId is not null or empty, indicating no Accounting Settings
    SET @IsValid = 0;
    INSERT INTO @ValidationResults (IsValid, Messages)
    VALUES (0, @CustomerName + ' does not have Accounting Settings');
    END
    --IF EXISTS (SELECT 1 FROM L_CustomerAddresses WHERE CustomerId = @CustomerId AND AddressId IS NOT NULL)      
    --BEGIN      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (1, @CustomerName +' has an Address');      
    --END      
    --ELSE      
    --BEGIN      
    --    SET @IsValid = 0;      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (0, @CustomerName +' does not have an Address');      
    --END      
      
    -- Check For Customer Contact      
    --IF EXISTS (SELECT 1 FROM L_CustomerContacts WHERE CustomerId = @CustomerId AND ContactId IS NOT NULL)      
    --BEGIN      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (1, @CustomerName +' has a Contact');      
    --END      
    --ELSE      
    --BEGIN      
    --    SET @IsValid = 0;      
    --    INSERT INTO @ValidationResults (IsValid, Messages)      
    --    VALUES (0, @CustomerName +' does not have a Contact');      
    --END   
    -- Return the list of validation results      
    SELECT IsValid, Messages      
    FROM @ValidationResults;      
END 
GO

/****** Object:  StoredProcedure [dbo].[GetAllApproveCustomerForLinking]    Script Date: 23-07-2024 13:18:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllApproveCustomerForLinking          
CREATE PROCEDURE [dbo].[GetAllApproveCustomerForLinking] 
@CustomerId INT                       
AS                                      
BEGIN                                      
    SET NOCOUNT ON;                                      
    BEGIN TRY         
                              
             SELECT                  
            C.[CustomerId],            
            C.[Name]                
        FROM [dbo].[Customers] C
        LEFT JOIN [dbo].[SubCustomerMainCustomer] SB ON C.CustomerId = SB.SubCustomerId 
        AND SB.CustomerId = @CustomerId
        WHERE 
            C.IsActive = 1 
            AND C.StatusId = 3 
            AND C.DeletedBy IS NULL 
            AND C.DeletedAt IS NULL 
            AND SB.SubCustomerId IS NULL                 
     END TRY                                              
BEGIN CATCH                                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                              
END CATCH                                     
                                    
END 

GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationOtherSettings]    Script Date: 23-07-2024 13:18:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetOrganizationOtherSettings   
CREATE PROCEDURE [dbo].[GetOrganizationOtherSettings]                       
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
        OOS.OrganizationOtherSettingId,    
        OOS.OrganizationId,    
        OP.Name,    
        OOS.DefaultPaymentTerms,  
        PT.PaymentTerm,    
        OOS.FedexAccountDetail    
    FROM [dbo].[OrganizationOtherSettings] OOS    
    left JOIN [dbo].[OrganizationProfile] OP ON OOS.OrganizationId = OP.OrganizationId    
    left JOIN [dbo].[PaymentTerms] PT ON OOS.DefaultPaymentTerms= PT.PaymentTermId  
    WHERE OOS.DeletedBy IS NULL AND OOS.DeletedAt IS NULL          
    ORDER BY OOS.OrganizationOtherSettingId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationProfile]    Script Date: 23-07-2024 13:18:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --GetOrganizationProfile    
CREATE PROCEDURE [dbo].[GetOrganizationProfile]                      
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT TOP 1 
        OP.OrganizationId,  
        OP.Name,  
        OP.Logo,  
        OP.AddressLine1,  
        OP.AddressLine2,  
        OP.CityId,  
        C.Name As CityName,  
        OP.StateId,  
        S.Name As StateName,  
        OP.CountryId,  
        C.Name As CountryName,  
        OP.ZipCode    
    FROM [dbo].[OrganizationProfile] OP   
    left JOIN [dbo].[Countries] C ON C.CountryId = OP.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= OP.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = OP.CityId        
    WHERE OP.DeletedBy IS NULL AND OP.DeletedAt IS NULL        
    ORDER BY OP.OrganizationId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSmtpSettings]    Script Date: 23-07-2024 13:18:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetSmtpSettings
CREATE PROCEDURE [dbo].[GetSmtpSettings]                       
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
        SS.SmtpSettingId,    
        OP.OrganizationId,    
        OP.Name,    
        SS.EmailProvider,    
        SS.SmtpServer,    
        SS.SmtpPort,    
        SS.SmtpUserName,    
        SS.SmtpPassword,    
        SS.UseSsl    
    FROM [dbo].[SMTPSettings] SS    
    left JOIN [dbo].[OrganizationProfile] OP ON SS.OrganizationId = OP.OrganizationId    
    WHERE SS.DeletedBy IS NULL AND SS.DeletedAt IS NULL          
    ORDER BY OP.OrganizationId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO

