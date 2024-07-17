
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[ValidateCustomerData]
GO
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetUsers]
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetSuppliers]
GO
/****** Object:  StoredProcedure [dbo].[GetRolesMappingByRoleId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetRolesMappingByRoleId]
GO
/****** Object:  StoredProcedure [dbo].[GetRoles]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetRoles]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetCustomers]
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetContactByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApprovalConfigurationByApprovalConfigurationId]
GO
/****** Object:  StoredProcedure [dbo].[GetApiProviders]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiProviders]
GO
/****** Object:  StoredProcedure [dbo].[GetApiProviderByProviderId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiProviderByProviderId]
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiParameters]
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameterByParameterId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiParameterByParameterId]
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiEndpoints]
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpointByEndpointId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiEndpointByEndpointId]
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiAuthentications]
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthenticationByAuthId]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetApiAuthenticationByAuthId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllModules]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetAllModules]
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalitiesFields]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetAllFunctionalitiesFields]
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalities]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetAllFunctionalities]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAPIProviders]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetAllAPIProviders]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAPIEndpoints]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[GetAllAPIEndpoints]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiProvider]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[DeleteApiProvider]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiParameter]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[DeleteApiParameter]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiEndpoint]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[DeleteApiEndpoint]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiAuthentication]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[DeleteApiAuthentication]
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierNotes]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddSupplierNotes]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditSupplierBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApprovalConfiguration]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditApprovalConfiguration]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiProvider]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditApiProvider]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiParameter]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditApiParameter]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiEndpoint]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditApiEndpoint]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiAuthentication]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddEditApiAuthentication]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerNotes]    Script Date: 17-07-2024 17:31:47 ******/
DROP PROCEDURE [dbo].[AddCustomerNotes]
GO
DROP PROCEDURE [dbo].[GetApiParameterByParameterId]
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierNotes]    Script Date: 17-07-2024 17:39:22 ******/
DROP PROCEDURE [dbo].[AddSupplierNotes]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerNotes]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE  [dbo].[AddCustomerNotes]  
 -- Add the parameters for the stored procedure here  
  @CustomerId int,   
  @Note nvarchar(1000),  
  @CreatedBy smallint  
As  
 BEGIN        
 SET NOCOUNT ON;        
 BEGIN TRY                  
  IF EXISTS (SELECT CustomerNoteId FROM [dbo].[CustomerNotes] WHERE Note=@Note AND CustomerId=@CustomerId)        
   BEGIN        
      SELECT CAST(0 AS SMALLINT) as KeyValue,                 
     'Notes EXISTS ' as ErrorMessage           
   END        
  ELSE        
  BEGIN         
   DECLARE @keyId AS BIGINT          
        
     INSERT INTO [dbo].[CustomerNotes]        
     (  
      CustomerId,  
      Note,  
      CreatedBy,  
    CreatedAt  
     )        
     VALUES      
     (  
    @CustomerId,  
    @Note ,  
    @CreatedBy,   
    GETDATE()  
     )        
     SET  @keyId = SCOPE_IDENTITY()                
     SELECT @keyId as KeyValue,                 
     'Note Added' as ErrorMessage           
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
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditApiAuthentication]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
    
CREATE PROCEDURE [dbo].[AddEditApiAuthentication]    
@AuthId int,
@ProviderId int NULL,
@AuthKey nvarchar(255) NULL,
@ClientId nvarchar(255) NULL,
@ClientSecret nvarchar(255) NULL,
@TokenEndpoint nvarchar(255) NULL,
@TokenExpires datetime NULL,
@CreatedBy smallint    
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
    DECLARE @keyId AS INT    
                
    IF @AuthId > 0               
    BEGIN    
            UPDATE [dbo].[APIAuthentication]    
            SET                   
            [ProviderId] = @ProviderId,
            [AuthKey] = @AuthKey,
            [ClientId] = @ClientId,
            [ClientSecret] = @ClientSecret,
            [TokenEndpoint] = @TokenEndpoint,
            [TokenExpires] = @TokenExpires, 
            [UpdatedBy] = @CreatedBy,  
            [UpdatedAt] = GETDATE()  
            WHERE [AuthId] = @AuthId;       
                     
            SET @keyId = @AuthId;    
                     
            SELECT @keyId AS KeyValue,               
            'APIAuthentication Updated' AS ErrorMessage     
    
    END    
    ELSE    
    BEGIN                 
            INSERT INTO [dbo].[APIAuthentication]    
            (                            
                ProviderId,
                AuthKey,
                ClientId,
                ClientSecret,
                TokenEndpoint,
                TokenExpires,   
                CreatedBy,    
                CreatedAt           
            )                                  
            VALUES                                
            (                            
                @ProviderId,
                @AuthKey,
                @ClientId,
                @ClientSecret,
                @TokenEndpoint,
                @TokenExpires,    
                @CreatedBy,    
                GETDATE()          
            )                                  
            SET  @keyId = SCOPE_IDENTITY()                                          
                                                    
            SELECT @keyId as KeyValue,                                             
            'APIAuthentication Added' as ErrorMessage    
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
/****** Object:  StoredProcedure [dbo].[AddEditApiEndpoint]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
    
--AddEditApiProvider 0,'Document','https://localhost:44359/API','Authorize-JWT',1    
CREATE PROCEDURE [dbo].[AddEditApiEndpoint]    
@EndpointId int,  
@ProviderId int,  
@Name nvarchar(100),  
@Path nvarchar(255),  
@Method nvarchar(50),  
@Description nvarchar(MAX),  
@CreatedBy smallint   
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
    DECLARE @keyId AS INT    
                
     IF @EndpointId > 0                 
    BEGIN      
            UPDATE [dbo].[APIEndpoints]    
            SET                     
            [ProviderId] = @ProviderId,    
            [Name] = @Name,    
            [Path] = @Path,    
            [Method] = @Method,    
            [Description] = @Description,    
            [UpdatedAt] = GETDATE(),    
            [UpdatedBy] = @CreatedBy    
            WHERE  [EndpointId] = @EndpointId AND [DeletedBy] IS NULL AND [DeletedAt] IS NULL;         
                       
            SET @keyId = @EndpointId;      
                       
            SELECT @keyId AS KeyValue,                 
            'APIEndpoint Updated' AS ErrorMessage       
      
    END      
    ELSE      
    BEGIN   
        IF EXISTS (SELECT 1 FROM [dbo].[APIEndpoints] WHERE Name = @Name AND ProviderId=@ProviderId AND Path=@Path AND DeletedAt IS NULL AND DeletedBy IS NULL)            
        BEGIN                        
            SELECT CAST(0 AS INT) as KeyValue,                                                            
            'APIEndpoint already exists.' as ErrorMessage                                
        END                        
        ELSE                                     
            INSERT INTO [dbo].[APIEndpoints]    
            (      
                ProviderId,                          
                Name,    
                Path,    
                Method,    
                Description,      
                CreatedBy,      
                CreatedAt             
            )                                    
            VALUES                                  
            (     
                @ProviderId,                           
                @Name,    
                @Path,    
                @Method,    
                @Description,      
                @CreatedBy,      
                GETDATE()            
            )                                    
            SET  @keyId = SCOPE_IDENTITY()                                            
                                               
        SELECT @keyId as KeyValue,                                               
        'APIEndpoint Added' as ErrorMessage      
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
/****** Object:  StoredProcedure [dbo].[AddEditApiParameter]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
  
CREATE PROCEDURE [dbo].[AddEditApiParameter]  
@ParameterId int,
@EndpointId int NULL,
@Name nvarchar(100) NULL,
@DataType nvarchar(50) NULL,
@DefaultValue nvarchar(255) NULL,
@IsRequired bit NULL, 
@CreatedBy smallint  
AS                                
BEGIN                                
    SET NOCOUNT ON;                                
    BEGIN TRY                                          
    DECLARE @keyId AS INT  
              
    IF @ParameterId > 0             
    BEGIN  
            UPDATE [dbo].[APIParameters]  
            SET                 
            [EndpointId] = @EndpointId,
            [Name] = @Name,
            [DataType] = @DataType,
            [DefaultValue] = @DefaultValue,
            [IsRequired] = @IsRequired,
            [UpdatedBy] = @CreatedBy,
            [UpdatedAt] = GETDATE()
            WHERE [ParameterId] = @ParameterId;     
                   
            SET @keyId = @ParameterId;  
                   
            SELECT @keyId AS KeyValue,             
         'APIParameter Updated' AS ErrorMessage   
  
    END  
    ELSE  
    BEGIN               
            INSERT INTO [dbo].[APIParameters]  
            (                          
                EndpointId,
                Name,
                DataType,
                DefaultValue,
                IsRequired,  
                CreatedBy,  
                CreatedAt         
            )                                
            VALUES                              
            (                          
                @EndpointId,
                @Name,
                @DataType,
                @DefaultValue,
                @IsRequired,  
                @CreatedBy,  
                GETDATE()        
            )                                
            SET  @keyId = SCOPE_IDENTITY()                                        
                                                  
            SELECT @keyId as KeyValue,                                           
            'APIParameter Added' as ErrorMessage  
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
/****** Object:  StoredProcedure [dbo].[AddEditApiProvider]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--AddEditApiProvider 0,'Document','https://localhost:44359/API','Authorize-JWT',1
CREATE PROCEDURE [dbo].[AddEditApiProvider]
@ProviderId int,
@Name nvarchar(100) NULL,
@BaseURL nvarchar(255) NULL,
@AuthenticationType nvarchar(50) NULL,
@CreatedBy smallint
AS                              
BEGIN                              
    SET NOCOUNT ON;                              
    BEGIN TRY                                        
    DECLARE @keyId AS INT
            
    IF @ProviderId > 0           
    BEGIN
            UPDATE [dbo].[APIProviders]
            SET               
            [Name] = @Name,
            [BaseURL] = @BaseURL,
            [AuthenticationType] = @AuthenticationType,
            [UpdatedBy] = @CreatedBy,
            [UpdatedAt] = GETDATE()
            WHERE [ProviderId] = @ProviderId AND DeletedAt IS NULL AND DeletedBy IS NULL;   
                 
            SET @keyId = @ProviderId;
                 
            SELECT @keyId AS KeyValue,           
         'APIProvider Updated' AS ErrorMessage 

    END
    ELSE
    BEGIN             
        IF EXISTS (SELECT 1 FROM [dbo].[APIProviders] WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)        
        BEGIN                    
            SELECT CAST(0 AS INT) as KeyValue,                                                        
            'APIProvider already exists.' as ErrorMessage                            
        END                    
        ELSE                  
        BEGIN                  
            INSERT INTO [dbo].[APIProviders]
            (                        
                Name,
                BaseURL,
                AuthenticationType,
                CreatedBy,
                CreatedAt       
            )                              
            VALUES                            
            (                        
                @Name,
                @BaseURL,
                @AuthenticationType,
                @CreatedBy,
                GETDATE()      
            )                              
            SET  @keyId = SCOPE_IDENTITY()                                      
                              
        END                  
        SELECT @keyId as KeyValue,                                         
        'APIProvider Added' as ErrorMessage
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
/****** Object:  StoredProcedure [dbo].[AddEditApprovalConfiguration]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditApprovalConfiguration]
    @ApprovalConfigurationId INT,
    @RuleName VARCHAR(100),
    @ModuleId INT = NULL,
    @FunctionalityId INT = NULL,
    @FunctionalitiesFieldId INT = NULL,
    @ApproverRoleId TINYINT = NULL,
    @ApprovalAction VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        DECLARE @keyId AS INT;
        
        IF @ApprovalConfigurationId > 0
        BEGIN
            IF EXISTS (SELECT 1 FROM [dbo].[ApprovalConfiguration] WHERE ApprovalConfigurationId = @ApprovalConfigurationId)
            BEGIN
                UPDATE [dbo].[ApprovalConfiguration]
                SET
                    RuleName = @RuleName,
                    ModuleId = @ModuleId,
                    FunctionalityId = @FunctionalityId,
                    FunctionalitiesFieldId = @FunctionalitiesFieldId,
                    ApproverRoleId = @ApproverRoleId,
                    ApprovalAction = @ApprovalAction
                WHERE ApprovalConfigurationId = @ApprovalConfigurationId;
                
                SET @keyId = @ApprovalConfigurationId;

                SELECT @keyId AS KeyValue,
                'Approval configuration updated' AS ErrorMessage;
            END
        END
        ELSE
        BEGIN
            INSERT INTO [dbo].[ApprovalConfiguration]
            (
                RuleName,
                ModuleId,
                FunctionalityId,
                FunctionalitiesFieldId,
                ApproverRoleId,
                ApprovalAction
            )
            VALUES
            (
                @RuleName,
                @ModuleId,
                @FunctionalityId,
                @FunctionalitiesFieldId,
                @ApproverRoleId,
                @ApprovalAction
            );
            
            SET @keyId = SCOPE_IDENTITY();
        END
        
        SELECT @keyId AS KeyValue,
        'Approval configuration added' AS ErrorMessage;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditCustomersBasicInformation]
@CustomerId INT,
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
@ResponsibleUserId SMALLINT,
@IsSubCompany bit
                              
AS                              
BEGIN                              
    SET NOCOUNT ON;                              
    BEGIN TRY                                        
            DECLARE @keyId AS INT
            DECLARE @NoteId AS BIGINT;                                                
            
            IF @CustomerId > 0           
            BEGIN
                IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE CustomerId = @CustomerId)          
                BEGIN 
                    UPDATE [dbo].[Customers]            
                    SET               
                    Name = @Name,            
                    GroupTypeId = @GroupTypeId,            
                    TerritoryId = @TerritoryId,            
                    CountryId = @CountryId,            
                    Website = @Website,                      
                    TaxId = @TaxId,              
                    UpdatedBy = @CreatedBy,            
                    UpdatedAt = GETDATE(),      
                    IsBuyingForThirdParty = @IsBuyingForThirdParty,      
                    ResponsibleUserId = @ResponsibleUserId      
                    WHERE CustomerId = @CustomerId;   
                 
                 SET @keyId = @CustomerId;
                 
                 SELECT @keyId AS KeyValue,           
                'Customer Updated' AS ErrorMessage,
                 CAST(0 AS BIGINT) AS NoteId  
               
                -- Update or Insert Email            
                IF EXISTS (SELECT 1 FROM [dbo].[Emails] WHERE OwnerId = @CustomerId AND OwnerTypeId =1)            
                BEGIN            
                    UPDATE [dbo].[Emails]            
                    SET EmailAddress = @EmailAddress,            
                        UpdatedBy = @CreatedBy,            
                        UpdatedAt = GETDATE()            
                    WHERE OwnerId = @CustomerId AND OwnerTypeId = 1;            
                END       
                END
            END
            ELSE
            BEGIN             
                IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)                         
                BEGIN                    
                    SELECT CAST(0 AS INT) as KeyValue,                                                        
                    'Customer already exists.' as ErrorMessage,
                    CAST(0 AS BIGINT) AS NoteId                               
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
                    ResponsibleUserId,
					IsSubCompany
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
                    @ResponsibleUserId,
					@IsSubCompany
                    )                              
                    SET  @keyId = SCOPE_IDENTITY()                                      
                              
                END                  
                IF @keyId > 0                        
                BEGIN                        
                    INSERT INTO [dbo].[Emails](EmailAddress,OwnerId,OwnerTypeId,CreatedBy,CreatedAt)                        
                    VALUES(@EmailAddress, @keyId, 1, @CreatedBy, GETDATE());                        
    
                    IF @Note IS NOT NULL  AND @Note !=''                  
                    BEGIN
                        INSERT INTO [dbo].[CustomerNotes](Note, CustomerId, CreatedBy, CreatedAt)                        
                        VALUES(@Note, @keyId, @CreatedBy, GETDATE());
                        SET @NoteId = SCOPE_IDENTITY();
                    END
                END
                SELECT @keyId as KeyValue,                                         
                'Customer Added' as ErrorMessage,
                ISNULL(@NoteId, CAST(0 AS BIGINT)) AS NoteId;    
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditSupplierBasicInformation]          
    @SupplierId INT,                         
    @Name VARCHAR(150),          
    @DbaName VARCHAR(150),                          
    @GroupTypeId SMALLINT,                          
    @SupplierTypeId SMALLINT,                          
    @TerritoryId SMALLINT,                          
    @CountryId SMALLINT,                          
    @Website NVARCHAR(250),                            
    @TaxId VARCHAR(15),                      
    @CreatedBy SMALLINT,            
    @Note VARCHAR(200),      
    @EmailAddress VARCHAR(255) ,      
    @ResponsibleUserId SMALLINT   
AS                                
BEGIN                                
    SET NOCOUNT ON;                                
    BEGIN TRY                                          
        DECLARE @keyId AS INT;
        DECLARE @NoteId AS BIGINT;                                   
                  
        IF @SupplierId > 0           
        BEGIN               
            IF EXISTS (SELECT 1 FROM [dbo].[Suppliers] WHERE SupplierId = @SupplierId)          
            BEGIN          
                UPDATE [dbo].[Suppliers]          
                SET           
                    Name = @Name,          
                    DbaName=@DbaName,          
                    GroupTypeId = @GroupTypeId,          
                    SupplierTypeId = @SupplierTypeId,          
                    TerritoryId = @TerritoryId,          
                    CountryId = @CountryId,          
                    Website = @Website,          
                    TaxId = @TaxId,          
                    UpdatedAt = GETDATE(),          
                    UpdatedBy = @CreatedBy,      
                    ResponsibleUserId=@ResponsibleUserId      
                WHERE SupplierId = @SupplierId;          
                          
                SET @keyId = @SupplierId;          
                 
                SELECT @keyId AS KeyValue,           
                'Supplier Updated' AS ErrorMessage,
                 CAST(0 AS BIGINT) AS NoteId         
                 
                 UPDATE [dbo].[Emails]              
                 SET EmailAddress = @EmailAddress,              
                 UpdatedBy = @CreatedBy,              
                 UpdatedAt = GETDATE()              
                 WHERE OwnerId = @SupplierId AND OwnerTypeId = 2;          
            END          
        END          
        ELSE          
        BEGIN          
            BEGIN         
                IF EXISTS (SELECT 1 FROM [dbo].[Suppliers]   WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)                         
                BEGIN                    
                 SELECT CAST(0 AS INT) as KeyValue,                                                        
                 'Supplier already exists.' as ErrorMessage,
                  CAST(0 AS BIGINT) AS NoteId                           
                END                    
                ELSE                   
                INSERT INTO [dbo].[Suppliers]                                
                (                          
                    Name,          
                    DbaName,                        
                    GroupTypeId,                          
                    SupplierTypeId,          
                    TerritoryId,                          
                    CountryId,                          
                    Website,                            
                    TaxId,                           
                    StatusId,                   
                    CreatedAt,            
                    CreatedBy,      
                    ResponsibleUserId      
                )                                
                VALUES                              
                (                          
                    @Name,          
                    @DbaName,                        
                    @GroupTypeId,                             
                    @SupplierTypeId,          
                    @TerritoryId,                          
                    @CountryId,                          
                    @Website,                             
                    @TaxId,                            
                  1,                    
                    GETDATE(),            
                    @CreatedBy ,      
                    @ResponsibleUserId      
                );                                
                                
                SET @keyId = SCOPE_IDENTITY();                                        
                                
            END;                    
                                
           IF @keyId > 0                          
            BEGIN        
                INSERT INTO [dbo].[Emails](EmailAddress, OwnerId, OwnerTypeId, CreatedBy, CreatedAt)                      
                VALUES(@EmailAddress, @keyId, 2, @CreatedBy, GETDATE());

                IF @Note IS NOT NULL  AND @Note !=''           
                BEGIN
                    INSERT INTO [dbo].[SupplierNotes](Note, SupplierId, CreatedBy, CreatedAt)                          
                    VALUES(@Note, @keyId, @CreatedBy, GETDATE());
                    
                    SET @NoteId = SCOPE_IDENTITY();
                END
            END
            SELECT @keyId as KeyValue,                                         
            'Supplier Added' as ErrorMessage,
            ISNULL(@NoteId, CAST(0 AS BIGINT)) AS NoteId;    
        END                 
                                
    END TRY                                            
    BEGIN CATCH                                          
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                          
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();                                          
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();                                          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                          
    END CATCH;                                          
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierNotes]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[AddSupplierNotes]   
 -- Add the parameters for the stored procedure here  
  @SupplierId int,   
 @Note nvarchar(1000),  
  @CreatedBy smallint  
AS  
BEGIN  
  
 SET NOCOUNT ON;  
 BEGIN TRY                  
  IF EXISTS (SELECT SupplierNoteId FROM [dbo].[SupplierNotes] WHERE Note=@Note AND SupplierId=@SupplierId)        
   BEGIN        
      SELECT CAST(0 AS SMALLINT) as KeyValue,                 
     'Note EXISTS ' as ErrorMessage           
   END        
  ELSE        
  BEGIN         
   DECLARE @keyId AS BIGINT          
        
     INSERT INTO [dbo].[SupplierNotes]        
     (  
      SupplierId,  
      Note,  
      CreatedBy,  
    CreatedAt  
     )        
     VALUES      
     (  
    @SupplierId,  
    @Note ,  
    @CreatedBy,   
    GETDATE()  
     )        
     SET  @keyId = SCOPE_IDENTITY()                
     SELECT @keyId as KeyValue,                 
     'Note Added' as ErrorMessage           
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
/****** Object:  StoredProcedure [dbo].[DeleteApiAuthentication]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--DeleteApiAuthentication 1,1          
CREATE PROCEDURE [dbo].[DeleteApiAuthentication]          
 @AuthId int,         
 @DeletedBy SMALLINT          
AS          
BEGIN          
    SET NOCOUNT ON;          
          
    BEGIN TRY          
        IF EXISTS (SELECT AuthID FROM [dbo].[APIAuthentication]WHERE @AuthId= @AuthId)          
        BEGIN          
            UPDATE [dbo].[APIAuthentication]     
            SET          
                [DeletedBy] = @DeletedBy,          
                [DeletedAt] = GETDATE()          
            WHERE  [AuthId] = @AuthId AND  [DeletedBy] IS NULL AND  [DeletedAt] IS NULL         
          
            SELECT @AuthId AS KeyValue,          
            'APIAuthentication Deleted' AS ErrorMessage;          
        END          
        ELSE          
        BEGIN          
            SELECT @AuthId AS KeyValue,          
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
/****** Object:  StoredProcedure [dbo].[DeleteApiEndpoint]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
--DeleteApiEndpoint 1,1      
CREATE PROCEDURE [dbo].[DeleteApiEndpoint]      
 @EndpointId int,     
 @DeletedBy SMALLINT      
AS      
BEGIN      
    SET NOCOUNT ON;      
      
    BEGIN TRY      
        IF EXISTS (SELECT EndpointId FROM [dbo].[APIEndpoints]WHERE EndpointId= @EndpointId)      
        BEGIN      
            UPDATE [dbo].[APIEndpoints] 
            SET      
                [DeletedBy] = @DeletedBy,      
                [DeletedAt] = GETDATE()      
            WHERE  EndpointId= @EndpointId AND  [DeletedBy] IS NULL AND  [DeletedAt] IS NULL     
      
            SELECT @EndpointId AS KeyValue,      
            'APIEndpoint Deleted' AS ErrorMessage;      
        END      
        ELSE      
        BEGIN      
            SELECT @EndpointId AS KeyValue,      
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
/****** Object:  StoredProcedure [dbo].[DeleteApiParameter]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
--DeleteApiParameter 1,1        
CREATE PROCEDURE [dbo].[DeleteApiParameter]        
 @ParameterId int,       
 @DeletedBy SMALLINT        
AS        
BEGIN        
    SET NOCOUNT ON;        
        
    BEGIN TRY        
        IF EXISTS (SELECT ParameterID FROM [dbo].[APIParameters]WHERE ParameterID= @ParameterId)        
        BEGIN        
            UPDATE [dbo].[APIParameters]   
            SET        
                [DeletedBy] = @DeletedBy,        
                [DeletedAt] = GETDATE()        
            WHERE  ParameterID= @ParameterId AND  [DeletedBy] IS NULL AND  [DeletedAt] IS NULL       
        
            SELECT @ParameterId AS KeyValue,        
            'APIParameter Deleted' AS ErrorMessage;        
        END        
        ELSE        
        BEGIN        
            SELECT @ParameterId AS KeyValue,        
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
/****** Object:  StoredProcedure [dbo].[DeleteApiProvider]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
--DeleteContactEmail 1,1    
CREATE PROCEDURE [dbo].[DeleteApiProvider]    
 @ProviderId int,   
 @DeletedBy SMALLINT    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
    BEGIN TRY    
        IF EXISTS (SELECT ProviderId FROM [dbo].[APIProviders]WHERE ProviderId= @ProviderId)    
        BEGIN    
            UPDATE [dbo].[APIProviders]
            SET    
                [DeletedBy] = @DeletedBy,    
                [DeletedAt] = GETDATE()    
            WHERE ProviderId= @ProviderId  
    
            SELECT @ProviderId AS KeyValue,    
            'APIProviders Deleted' AS ErrorMessage;    
        END    
        ELSE    
        BEGIN    
            SELECT @ProviderId AS KeyValue,    
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
/****** Object:  StoredProcedure [dbo].[GetAllAPIEndpoints]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllAPIEndpoints    
CREATE PROCEDURE [dbo].[GetAllAPIEndpoints]            
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                      
                    
SELECT    
[EndpointId],  
[Name]  
 FROM [dbo].[APIEndpoints] where deletedby IS NULL AND deletedAt is NULL  
                                                
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllAPIProviders]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllAPIProviders    
CREATE PROCEDURE [dbo].[GetAllAPIProviders]            
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                      
                    
SELECT    
[ProviderId],  
[Name],
[AuthenticationType]  
 FROM [dbo].[APIProviders] where deletedby IS NULL AND deletedAt is NULL  
                                                
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalities]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllFunctionalities 1       
CREATE PROCEDURE [dbo].[GetAllFunctionalities]    
@ModuleId INT            
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                      
                    
SELECT
    FunctionalityId,
    Name                 
    FROM [dbo].[Functionalities]
    WHERE ModuleId=@ModuleId
                                              
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllFunctionalitiesFields]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllFunctionalitiesFields 1         
CREATE PROCEDURE [dbo].[GetAllFunctionalitiesFields]      
@functionalityId INT              
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                        
                      
SELECT  
    [FunctionalitiesFieldId],  
    [FieldName]
    FROM [dbo].[FunctionalitiesFields] F
    INNER JOIN [dbo].[FunctionalitiesTables] FT ON F.[FunctionalitiesTableId] = FT.[FunctionalitiesTableId]
    WHERE FT.[FunctionalityId]=@functionalityId
                                                
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllModules]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllModules
CREATE PROCEDURE [dbo].[GetAllModules]        
AS                          
BEGIN                          
 SET NOCOUNT ON;                          
BEGIN TRY                                  
                
SELECT
 ModuleId,
 ModuleName        
 FROM [dbo].[Modules]    
                                            
END TRY                                  
BEGIN CATCH                                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                  
END CATCH                           
                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthenticationByAuthId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiAuthenticationByAuthId]                  
@AuthId int                
as                  
Begin                  
SET NOCOUNT ON;                  
BEGIN TRY                  
                  
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
   WHERE [AuthId] = @AuthId  
   AND AA.DeletedBy IS NULL     
   AND AA.DeletedAt IS NULL;                  
              
END TRY                  
BEGIN CATCH                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                  
END CATCH                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiAuthentications]                                              
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
          AA.DeletedAt IS NULL AND Aa.DeletedBy IS NULL AND        
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
                AA.DeletedAt IS NULL AND Aa.DeletedBy IS NULL AND        
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
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
        @SearchText, @Offset, @PageSize;                                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpointByEndpointId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiEndpointByEndpointId]                
@EndpointId  int               
as                
Begin                
SET NOCOUNT ON;                
BEGIN TRY                
                
  SELECT              
        e.EndpointId,
        e.Name AS EndpointName,
        e.ProviderId,
        p.Name,
        e.Path,
        e.Method,
        e.Description
    FROM [dbo].[APIEndpoints] e
    LEFT JOIN [dbo].[APIProviders] p ON e.ProviderId = p.ProviderId
    WHERE e.EndpointId = @EndpointId  
    AND e.DeletedBy IS NULL 
    AND e.DeletedAt IS NULL;                
            
END TRY                
BEGIN CATCH                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
END CATCH                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApiEndpoints 1,25,'','',500 
CREATE PROCEDURE [dbo].[GetApiEndpoints]                                          
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
        AE.DeletedAt IS NULL AND AE.DeletedBy IS NULL AND    
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
                AE.DeletedAt IS NULL AND AE.DeletedBy IS NULL AND    
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
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',
        @SearchText, @Offset, @PageSize;                
                                      
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameterByParameterId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiParameterByParameterId]                
@ParameterId int              
as                
Begin                
SET NOCOUNT ON;                
BEGIN TRY                
                
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
    WHERE AP.ParameterID= @ParameterId
    AND AP.DeletedBy IS NULL 
    AND AP.DeletedAt IS NULL;                
            
END TRY                
BEGIN CATCH                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
END CATCH                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiParameters]                                            
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
        AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND      
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
             AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND      
             (      
                @SearchText = '''' OR      
                AE.Name LIKE ''%'' + @SearchText + ''%'' OR      
                AP.Name LIKE ''%'' + @SearchText + ''%''    
             )     
          
        ORDER BY  ' + @OrderBy + '                   
        OFFSET @Offset ROWS                    
        FETCH NEXT @PageSize ROWS ONLY;';                   
         
        EXEC sp_executesql @SQL,  
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
        @SearchText, @Offset, @PageSize;                                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiProviderByProviderId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiProviderByProviderId]              
@ProviderId  int             
as              
Begin              
SET NOCOUNT ON;              
BEGIN TRY              
              
  SELECT            
    ProviderId,
    Name,
    BaseURL,
    AuthenticationType
  FROM [dbo].[APIProviders]
  WHERE ProviderId = @ProviderId
  AND [DeletedBy] IS NULL AND DeletedAt  IS NULL          
          
END TRY              
BEGIN CATCH              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
END CATCH              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApiProviders]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApiProviders 1,25,'','',500 
CREATE PROCEDURE [dbo].[GetApiProviders]                                        
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
    FROM [dbo].[APIProviders] AP                     
    WHERE   
        AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND  
        (  
            @SearchText = '' OR  
            AP.Name LIKE '%' + @SearchText + '%' OR  
            AP.BaseURL LIKE '%' + @SearchText + '%' OR  
            AP.AuthenticationType LIKE '%' + @SearchText + '%'  
        )    
    
    DECLARE @SQL NVARCHAR(MAX);       
    SET @SQL='         
        SELECT                
            AP.ProviderId,  
            AP.Name,  
            AP.BaseURL,  
            AP.AuthenticationType     
        FROM [dbo].[APIProviders] AP                        
        WHERE   
                AP.DeletedAt IS NULL AND AP.DeletedBy IS NULL AND  
            (  
                @SearchText = '''' OR  
                AP.Name LIKE ''%'' + @SearchText + ''%'' OR  
                AP.BaseURL LIKE ''%'' + @SearchText + ''%'' OR  
                AP.AuthenticationType LIKE ''%'' + @SearchText + ''%''  
            )    
      
        ORDER BY ' + @OrderBy + '                
        OFFSET @Offset ROWS                
        FETCH NEXT @PageSize ROWS ONLY;';               
           
        EXEC sp_executesql @SQL,
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',
        @SearchText, @Offset, @PageSize;                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApprovalConfigurationByApprovalConfigurationId 2
CREATE PROCEDURE [dbo].[GetApprovalConfigurationByApprovalConfigurationId]
    @ApprovalConfigurationId int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT 
            AC.ApprovalConfigurationId,
            AC.RuleName,
            AC.ModuleId,
            M.ModuleName,
            AC.FunctionalityId,
            F.Name,
            AC.FunctionalitiesFieldId,
            FF.FieldName,
            AC.ApproverRoleId,
            AC.ApprovalAction
        FROM [dbo].[ApprovalConfiguration] AC
        INNER JOIN [dbo].[Modules] M ON AC.ModuleId = M.ModuleId
        INNER JOIN [dbo].[Functionalities] F ON AC.FunctionalityId = F.FunctionalityId
        INNER JOIN [dbo].[FunctionalitiesFields] FF ON AC.FunctionalitiesFieldId = FF.FunctionalitiesFieldId
        WHERE AC.ApprovalConfigurationId = @ApprovalConfigurationId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApprovalConfigurationRulesByModuleIdAndFunctionalityId 2,1
CREATE PROCEDURE [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]
    @ModuleId int,
    @FunctionalityId int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT 
            AC.ApprovalConfigurationId,
            AC.RuleName
        FROM [dbo].[ApprovalConfiguration] AC
        WHERE AC.ModuleId = @ModuleId
        AND AC.FunctionalityId = @FunctionalityId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetContactByCustomerId 1028,NULL,'4,3,2'      
CREATE PROCEDURE [dbo].[GetContactByCustomerId]                        
@CustomerId int,
@SearchText varchar(150)= NULL,
@SearchContactType varchar(100)= NULL                         
AS                        
BEGIN                        
    SET NOCOUNT ON;      
          
    BEGIN TRY 
        DECLARE @ContactTypeIdTable TABLE (ContactTypeId SMALLINT);              
                 
        IF (@SearchContactType !='' AND @SearchContactType IS NOT NULL AND LEN(@SearchContactType) > 0)
        BEGIN
            INSERT INTO @ContactTypeIdTable (ContactTypeId)              
            SELECT value              
            FROM STRING_SPLIT(@SearchContactType, ',');
        END 
                     
        SELECT            
            LCC.CustomerContactId,                    
            LCC.[CustomerId],                
            LCC.ContactId,                
            LCC.ContactTypeId,                
            CT.Type,                
            CON.FirstName,                
            CON.LastName,              
            CC.IsPrimary  
        FROM       
            [dbo].[L_CustomerContacts] LCC                
            LEFT JOIN [dbo].[Contacts] CON ON LCC.ContactId = CON.ContactId                
            LEFT JOIN [dbo].[ContactTypes] CT ON LCC.ContactTypeId = CT.ContactTypeId    
            LEFT JOIN [dbo].[L_CustomerContacts] CC ON CC.ContactId = CON.ContactId    
            OUTER APPLY (SELECT TOP 1 E.EmailAddress FROM [dbo].[Emails] E WHERE E.OwnerId = CON.ContactId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL
            ) AS E      
            --LEFT JOIN [dbo].[Emails] E ON CON.ContactId = E.OwnerId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL      
            --LEFT JOIN [dbo].[Phones] P ON CON.ContactId = P.OwnerId AND P.OwnerTypeId = 3 AND P.DeletedBy IS NULL AND P.DeletedAt IS NULL      
        WHERE        
            LCC.CustomerId = @CustomerId       
            AND CON.DeletedBy IS NULL       
            AND CON.DeletedAt IS NULL
            AND (@SearchText IS NULL OR CON.FirstName LIKE '%' + @SearchText + '%' OR CON.LastName LIKE '%' + @SearchText + '%' OR E.EmailAddress LIKE '%' + @SearchText + '%')
            AND (@SearchContactType IS NULL OR LCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))        
        ORDER BY       
            LCC.ContactId,LCC.IsPrimary,LCC.ContactTypeId DESC                    
    END TRY              
    BEGIN CATCH                  
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                  
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                  
        DECLARE @ErrorState int = ERROR_STATE()                  
              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                  
    END CATCH             
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 17-07-2024 17:31:47 ******/
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
            C.IsSubCompany
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
/****** Object:  StoredProcedure [dbo].[GetRoles]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--======================================================================                                    
   --GetRoles 1,25,'','',500                          
CREATE PROCEDURE [dbo].[GetRoles]                                            
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
        SET @OrderBy = 'R.CreatedAt DESC';    
    END   
                
    -- Get the total count                    
    SELECT @TotalCount = COUNT(*)                    
    FROM [dbo].[Roles] R                         
    WHERE             
   R.DeletedAt IS NULL AND R.DeletedBy IS NULL AND             
   (    
       @SearchText = '' OR R.RoleName LIKE '%' + @SearchText + '%'    
   )        
      
    DECLARE @SQL NVARCHAR(MAX);   
    SET @SQL='                
    SELECT    
        RoleId,    
        RoleName    
    FROM [dbo].[Roles] R                             
    WHERE             
    R.DeletedAt IS NULL AND R.DeletedBy IS NULL AND     
    (    
         @SearchText = '''' OR R.RoleName LIKE ''%'' + @SearchText + ''%''      
    )         
          
    ORDER BY ' + @OrderBy + '                   
    OFFSET @Offset ROWS                    
    FETCH NEXT @PageSize ROWS ONLY;';                   
      
    EXEC sp_executesql @SQL,    
     N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT', 
    @SearchText, @Offset, @PageSize;                                     
END 
GO
/****** Object:  StoredProcedure [dbo].[GetRolesMappingByRoleId]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetRolesMappingByRoleId 4,1,25,'','',200              
CREATE PROCEDURE [dbo].[GetRolesMappingByRoleId]                                                              
 @RoleId tinyint,            
 @PageNumber int = 1,                                              
 @PageSize int=25,          
 @SearchText NVARCHAR(200),  
 @SortString VARCHAR(250),             
 @TotalCount int OUTPUT              
AS                            
BEGIN                            
 SET NOCOUNT ON;                            
    -- Calculate the offset for pagination              
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;            
      
    DECLARE @OrderBy NVARCHAR(250) = '';    
    SET @OrderBy = @SortString   
      
    IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'UR.CreatedAt DESC';    
    END   
     
     -- Get the total count              
    SELECT @TotalCount = COUNT(*)              
    FROM [dbo].[L_UserRoles] UR    
    INNER JOIN [dbo].[Users] U ON U.UserId = UR.UserId    
    INNER JOIN [dbo].[Roles] R ON R.RoleId= UR.RoleId    
    WHERE UR.RoleId = @RoleId and UR.DeletedBy IS NULL AND UR.DeletedAt IS NULL             
    AND (@SearchText IS NULL     
    OR U.UserName LIKE '%' + @SearchText + '%'     
    OR R.RoleName LIKE '%' + @SearchText + '%');            
      
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='      
    SELECT    
        UR.UserRoleId,    
        UR.RoleId,    
        R.RoleName,    
        UR.UserId,    
        U.UserName,    
        UR.CreatedAt                
        from [dbo].[L_UserRoles] UR                 
        INNER JOIN [dbo].[Users] U ON U.UserId = UR.UserId    
        INNER JOIN [dbo].[Roles] R ON R.RoleId= UR.RoleId    
        where              
        UR.RoleId= @RoleId and              
        UR.DeletedAt IS NULL and UR.DeletedBy IS NULL          
        AND (@SearchText IS NULL OR @SearchText =''''    
            OR U.UserName LIKE ''%'' + @SearchText + ''%''     
            OR R.RoleName LIKE ''%'' + @SearchText + ''%'')           
                
    ORDER BY ' + @OrderBy + '               
    OFFSET @Offset ROWS              
    FETCH NEXT @PageSize ROWS ONLY;';                         
       
    EXEC sp_executesql @SQL,     N'@RoleId tinyint, @SearchText NVARCHAR(200), @Offset INT, @PageSize INT',     @RoleId, @SearchText, @Offset, @PageSize;                      
END   
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                  
--GetSuppliers 1,10,'','taxId,name desc','',500                     
CREATE PROCEDURE [dbo].[GetSuppliers]                        
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
        SET @OrderBy = 'SP.SupplierId DESC';    
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
    FROM [dbo].[Suppliers] SP                        
    LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId        
    LEFT JOIN [dbo].[Emails] E ON SP.SupplierId= E.OwnerId AND E.OwnerTypeId=2                
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL           
    WHERE                        
        (@StatusId = '''' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (SP.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL             
        OR SP.TaxId = @SearchText OR @SearchText IS NULL           
        OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)                          
        AND SP.DeletedBy IS NULL                   
        AND SP.DeletedAt IS NULL;                  
                  
    -- Select the data with the corrected WHERE clause                        
    SELECT                        
       SP.SupplierId,                  
       SP.Name,                  
       SP.TaxId,                  
       SP.WebSite,                  
       SP.StatusId,                  
       S.Status,                
       SIAR.InActiveReason,                
       SP.UpdatedAt ,          
       SP.ResponsibleUserId          
    FROM [dbo].[Suppliers] SP                     
    LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId        
    LEFT JOIN [dbo].[Emails] E ON SP.SupplierId= E.OwnerId AND E.OwnerTypeId=2                        
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL          
    LEFT JOIN Users U on U.UserId = SP.ResponsibleUserId          
    WHERE                        
        (@StatusId = '''' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (SP.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL            
        OR SP.TaxId = @SearchText OR @SearchText IS NULL    
        OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)                       
        AND SP.DeletedBy IS NULL                   
        AND SP.DeletedAt IS NULL                       
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
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--======================================================================                                
   --GetUsers 1,25,'a','UserName',500                      
CREATE PROCEDURE [dbo].[GetUsers]                                        
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
        SET @OrderBy = 'U.CreatedAt DESC';    
    END   
            
    -- Get the total count                
    SELECT @TotalCount = COUNT(*)                
    FROM [dbo].[Users] U                     
    WHERE   
        U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND  
        (  
            @SearchText = '' OR  
            U.UserName LIKE '%' + @SearchText + '%' OR  
            U.FirstName LIKE '%' + @SearchText + '%' OR  
            U.LastName LIKE '%' + @SearchText + '%'  
        )    
      
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='  
        SELECT                
            U.UserId,    
            U.FirstName,    
            U.LastName,    
            U.UserName,      
            U.IsActive,      
            U.CreatedAt      
        FROM [dbo].[Users] U                         
        WHERE   
            U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND  
            (  
                @SearchText = '''' OR                 U.UserName LIKE ''%'' + @SearchText + ''%'' OR                 U.FirstName LIKE ''%'' + @SearchText + ''%'' OR                 U.LastName LIKE ''%'' + @SearchText + ''%''  
            )     
      
        ORDER BY ' + @OrderBy + '   
        OFFSET @Offset ROWS                
        FETCH NEXT @PageSize ROWS ONLY;';               
           
        EXEC sp_executesql @SQL,         N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',         @SearchText, @Offset, @PageSize;                           
END 
GO
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 17-07-2024 17:31:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateCustomerData 6      
CREATE PROCEDURE [dbo].[ValidateCustomerData]      
 @CustomerId INT,
 @IsSubCompany BIT
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
	IF @IsSubCompany = 0
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
	IF @IsSubCompany = 0
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
	IF @IsSubCompany = 0
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
   
	IF @IsSubCompany = 0
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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[AddSupplierNotes]   
 -- Add the parameters for the stored procedure here  
  @SupplierId int,   
 @Note nvarchar(1000),  
  @CreatedBy smallint  
AS  
BEGIN  
  
 SET NOCOUNT ON;  
 BEGIN TRY                  
  IF EXISTS (SELECT SupplierNoteId FROM [dbo].[SupplierNotes] WHERE Note=@Note AND SupplierId=@SupplierId)        
   BEGIN        
      SELECT CAST(0 AS SMALLINT) as KeyValue,                 
     'Note EXISTS ' as ErrorMessage           
   END        
  ELSE        
  BEGIN         
   DECLARE @keyId AS BIGINT          
        
     INSERT INTO [dbo].[SupplierNotes]        
     (  
      SupplierId,  
      Note,  
      CreatedBy,  
    CreatedAt  
     )        
     VALUES      
     (  
    @SupplierId,  
    @Note ,  
    @CreatedBy,   
    GETDATE()  
     )        
     SET  @keyId = SCOPE_IDENTITY()                
     SELECT @keyId as KeyValue,                 
     'Note Added' as ErrorMessage           
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
/****** Object:  StoredProcedure [dbo].[GetApiParameterByParameterId]    Script Date: 17-07-2024 17:39:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetApiParameterByParameterId]                
@ParameterId int              
as                
Begin                
SET NOCOUNT ON;                
BEGIN TRY                
                
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
    WHERE AP.ParameterID= @ParameterId
    AND AP.DeletedBy IS NULL 
    AND AP.DeletedAt IS NULL;                
            
END TRY                
BEGIN CATCH                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
END CATCH                
END 
GO

