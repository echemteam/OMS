USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[ValidateCustomerData]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[UpdateCustomerSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[GetUserCheckListByEventId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetUserCheckListByEventId]
GO
/****** Object:  StoredProcedure [dbo].[GetUserCheckListBtEventId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetUserCheckListBtEventId]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierFinancialSettingsBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetSupplierFinancialSettingsBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetSubCustomerByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetSubCustomerByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetSmtpSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetSmtpSettings]
GO
/****** Object:  StoredProcedure [dbo].[GetRecipientAddressByrecipientAddressId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetRecipientAddressByrecipientAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetPaymentSettingsBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetPaymentSettingsBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationProfile]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetOrganizationProfile]
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationOtherSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetOrganizationOtherSettings]
GO
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetDetailsByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetCustomersBasicInformationById]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetCustomers]
GO
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetContactBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetContactByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetBankAddressByBankAddressId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetBankAddressByBankAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetApiParameters]
GO
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetApiEndpoints]
GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetApiAuthentications]
GO
/****** Object:  StoredProcedure [dbo].[GetAllSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetAllSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPODeliveryMethod]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetAllPODeliveryMethod]
GO
/****** Object:  StoredProcedure [dbo].[GetAllCities]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetAllCities]
GO
/****** Object:  StoredProcedure [dbo].[GetAllApproveCustomerForLinking]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetAllApproveCustomerForLinking]
GO
/****** Object:  StoredProcedure [dbo].[GetAddressByAddressId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetAddressByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetACHWireBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[GetACHWireBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[DeleteSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[DeleteSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiProvider]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[DeleteApiProvider]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiParameter]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[DeleteApiParameter]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiEndpoint]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[DeleteApiEndpoint]
GO
/****** Object:  StoredProcedure [dbo].[DeleteApiAuthentication]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[DeleteApiAuthentication]
GO
/****** Object:  StoredProcedure [dbo].[AddSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddSubCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierPaymentSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditSupplierPaymentSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierFinancialSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditSupplierFinancialSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierAccoutingSetting]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditSupplierAccoutingSetting]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSuppierBankDetails]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditSuppierBankDetails]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSmtpSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditSmtpSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOther]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditOther]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationProfile]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditOrganizationProfile]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationOtherSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditOrganizationOtherSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditCustomerSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCreditCard]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditCreditCard]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCheck]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditCheck]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiProvider]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditApiProvider]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiParameter]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditApiParameter]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiEndpoint]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditApiEndpoint]
GO
/****** Object:  StoredProcedure [dbo].[AddEditApiAuthentication]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditApiAuthentication]
GO
/****** Object:  StoredProcedure [dbo].[AddEditACHWire]    Script Date: 26-07-2024 10:13:18 ******/
DROP PROCEDURE [dbo].[AddEditACHWire]
GO
/****** Object:  StoredProcedure [dbo].[AddEditACHWire]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditACHWire]           
    @SupplierBankDetailsId INT,  
    @BankAddressId INT,  
    @RecipientAddressId INT,  
    @MessageToRecipient NVARCHAR(140),  
    @SupplierId INT,  
    @IsAddressInUs BIT,  
    @RecipientPhoneNumber VARCHAR(20),  
    @PaymentTermId TINYINT,  
    @MessageToRecipientBank NVARCHAR(75),  
    @BeneficiaryName VARCHAR(100),  
    @BankName VARCHAR(200),  
    @AccountType VARCHAR(50),  
    @AccountNumber VARCHAR(50),  
    @BranchCode VARCHAR(50),  
    @IbanNumber INT,  
    @SwiftCode VARCHAR(50),  
    @RoutingNumber VARCHAR(9),  
    @SortCode VARCHAR(6),  
    @BsbNumber VARCHAR(6),  
    @IsActive BIT,  
    @CreatedBy SMALLINT  
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
       IF @SupplierBankDetailsId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[SuppierBankDetails]WHERE SupplierBankDetailsId = @SupplierBankDetailsId)          
            BEGIN          
                UPDATE [dbo].[SuppierBankDetails]  
                SET          
                    [BankAddressId] = @BankAddressId,  
                    [RecipientAddressId] = @RecipientAddressId,  
                    [MessageToRecipient] = @MessageToRecipient,  
                    [SupplierId] = @SupplierId,  
                    [IsAddressInUs] = @IsAddressInUs,  
                    [RecipientPhoneNumber] = @RecipientPhoneNumber,  
                    [PaymentTermId] = @PaymentTermId,  
                    [MessageToRecipientBank] = @MessageToRecipientBank,  
                    [BeneficiaryName] = @BeneficiaryName,  
                    [BankName] = @BankName,  
                    [AccountType] = @AccountType,  
                    [AccountNumber] = @AccountNumber,  
                    [BranchCode] = @BranchCode,  
                    [IbanNumber] = @IbanNumber,  
                    [SwiftCode] = @SwiftCode,  
                    [RoutingNumber] = @RoutingNumber,  
                    [SortCode] = @SortCode,  
                    [BsbNumber] = @BsbNumber,  
                    [IsActive] = @IsActive,  
                    [UpdatedBy] = @CreatedBy,  
                    [UpdatedAt] = GETDATE()          
                WHERE          
                   [SupplierBankDetailsId] = @SupplierBankDetailsId  
                          
                SELECT @SupplierBankDetailsId AS KeyValue,             
                'Supplier Bank Details Updated' AS ErrorMessage;          
            END          
            ELSE          
            BEGIN          
                SELECT @SupplierBankDetailsId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[SuppierBankDetails]  
            (                   
                BankAddressId,  
                RecipientAddressId,  
                MessageToRecipient,  
                SupplierId,  
                IsAddressInUs,  
                RecipientPhoneNumber,  
                PaymentTermId,  
                MessageToRecipientBank,  
                BeneficiaryName,  
                BankName,  
                AccountType,  
                AccountNumber,  
                BranchCode,  
                IbanNumber,  
                SwiftCode,  
                RoutingNumber,  
                SortCode,  
                BsbNumber,  
                IsActive,  
                [CreatedBy],  
                [CreatedAt]    
            )                      
            VALUES                    
            (                  
                @BankAddressId,  
                @RecipientAddressId,  
                @MessageToRecipient,  
                @SupplierId,  
                @IsAddressInUs,  
                @RecipientPhoneNumber,  
                @PaymentTermId,  
                @MessageToRecipientBank,  
                @BeneficiaryName,  
                @BankName,  
                @AccountType,  
                @AccountNumber,  
                @BranchCode,  
                @IbanNumber,  
                @SwiftCode,  
                @RoutingNumber,  
                @SortCode,  
                @BsbNumber,  
                @IsActive,  
                @CreatedBy,  
                GETDATE()  
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Supplier Bank Details added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditApiAuthentication]    Script Date: 26-07-2024 10:13:18 ******/
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
            'API Authentication Updated' AS ErrorMessage     
    
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
            'API Authentication Added' as ErrorMessage    
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
/****** Object:  StoredProcedure [dbo].[AddEditApiEndpoint]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
            'API Endpoint Updated' AS ErrorMessage       
      
    END      
    ELSE      
    BEGIN   
        IF EXISTS (SELECT 1 FROM [dbo].[APIEndpoints] WHERE Name = @Name AND ProviderId=@ProviderId AND Path=@Path AND DeletedAt IS NULL AND DeletedBy IS NULL)            
        BEGIN                        
            SELECT CAST(0 AS INT) as KeyValue,                                                            
            'API Endpoint already exists.' as ErrorMessage                                
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
        'API Endpoint Added' as ErrorMessage      
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
/****** Object:  StoredProcedure [dbo].[AddEditApiParameter]    Script Date: 26-07-2024 10:13:18 ******/
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
         'API Parameter Updated' AS ErrorMessage   
  
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
            'API Parameter Added' as ErrorMessage  
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
/****** Object:  StoredProcedure [dbo].[AddEditApiProvider]    Script Date: 26-07-2024 10:13:18 ******/
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
         'API Provider Updated' AS ErrorMessage 

    END
    ELSE
    BEGIN             
        IF EXISTS (SELECT 1 FROM [dbo].[APIProviders] WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)        
        BEGIN                    
            SELECT CAST(0 AS INT) as KeyValue,                                                        
            'API Provider already exists.' as ErrorMessage                            
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
        'API Provider Added' as ErrorMessage
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
/****** Object:  StoredProcedure [dbo].[AddEditCheck]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditCheck]             
    @SupplierPaymentSettingId INT,    
    @SupplierId INT,    
    @CheckMailingAddressId INT,     
    @CreatedBy SMALLINT    
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;            
            
          
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierPaymentSettings] WHERE  [SupplierId] = @SupplierId    )            
            BEGIN            
                UPDATE [dbo].[SupplierPaymentSettings]    
                SET            
                    [SupplierId] = @SupplierId,    
                    [CheckMailingAddressId] = @CheckMailingAddressId,    
                    [UpdatedBy] = @CreatedBy,    
                    [UpdatedAt] = GETDATE()            
                WHERE            
                    [SupplierId] = @SupplierId     
                            
                SELECT @SupplierPaymentSettingId AS KeyValue,               
                'Supplier Check Detail Updated' AS ErrorMessage;            
            END            
            ELSE            
            BEGIN            
                 INSERT INTO [dbo].[SupplierPaymentSettings]    
            (                     
                SupplierId,     
                CheckMailingAddressId,     
                [CreatedBy],    
                [CreatedAt]      
            )                        
            VALUES                      
            (                    
                @SupplierId,    
                @CheckMailingAddressId,    
                @CreatedBy,    
                GETDATE()    
            );                        
                        
                SET @keyId = SCOPE_IDENTITY();            
               
                SELECT @keyId AS KeyValue,               
                'Supplier Check Detail added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditCreditCard]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddEditCreditCard]             
    @SupplierPaymentSettingId INT,    
    @SupplierId INT,    
    @CCNote NVARCHAR(2000),    
    @IsCCExistsOnFile BIT,    
    @CreatedBy SMALLINT    
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;            
            
        
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierPaymentSettings] WHERE [SupplierId] = @SupplierId)            
            BEGIN            
                UPDATE [dbo].[SupplierPaymentSettings]    
                SET            
                    [SupplierId] = @SupplierId,    
                    [CCNote] = @CCNote,    
                    [IsCCExistsOnFile] = @IsCCExistsOnFile,    
                    [UpdatedBy] = @CreatedBy,    
                    [UpdatedAt] = GETDATE()            
                WHERE            
                   [SupplierId] = @SupplierId    
                            
                SELECT @SupplierPaymentSettingId AS KeyValue,               
                'Supplier Credit Card Detail Updated' AS ErrorMessage;            
            END            
            ELSE            
            BEGIN            
                INSERT INTO [dbo].[SupplierPaymentSettings]    
                (                     
                    SupplierId,    
                    CCNote,    
                    IsCCExistsOnFile,     
                    [CreatedBy],    
                    [CreatedAt]      
                )                        
                VALUES                      
                (                    
                    @SupplierId,    
                    @CCNote,    
                    @IsCCExistsOnFile,    
                    @CreatedBy,    
                    GETDATE()    
                );                        
                        
                SET @keyId = SCOPE_IDENTITY();            
               
                SELECT @keyId AS KeyValue,               
                'Supplier Credit Card Detail added' AS ErrorMessage;               
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
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 26-07-2024 10:13:18 ******/
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
@IsSubCustomer bit  
                                
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
                    IF @IsBuyingForThirdParty = 0
                    BEGIN
                          UPDATE [dbo].[SubCustomerMainCustomer]  SET [DeletedBy] =@CreatedBy,[DeletedAt]=GETDATE() 
                          WHERE [CustomerId]= @CustomerId  
                    END 
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
                    IsSubCustomer  
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
                    @IsSubCustomer  
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
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
CREATE PROCEDURE [dbo].[AddEditCustomerSettings]       
    @CustomerAccountingSettingId INT=0,      
 @CustomerId INT,      
    @PaymentTermId TINYINT,      
    @CreditLimit DECIMAL,      
    @PaymentMethodId TINYINT,      
    @InvoiceSubmissionInstruction NVARCHAR(1000),      
    @BillingCurrency NVARCHAR(1000),      
 @CreatedBy SMALLINT,    
 @SalesTax DECIMAL(5,2),    
 @ExemptSalesTax BIT,  
 @BankWireFee DECIMAL(5,2),  
 @CardProcessingCharges DECIMAL(5,2)   
AS      
BEGIN      
    SET NOCOUNT ON;                  
    BEGIN TRY                                  
        DECLARE @keyId AS INT;      
      
        IF @CustomerAccountingSettingId > 0      
        BEGIN      
            IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccoutingSettings] WHERE CustomerAccountingSettingId = @CustomerAccountingSettingId)      
            BEGIN      
                UPDATE [dbo].[CustomerAccoutingSettings]      
                SET      
                    PaymentTermId = @PaymentTermId,      
					CustomerId =@CustomerId,      
                    CreditLimit = @CreditLimit,      
                    PaymentMethodId = @PaymentMethodId,      
                    InvoiceSubmissionInstruction = @InvoiceSubmissionInstruction,      
                    BillingCurrency = @BillingCurrency,      
					  UpdatedBy = @CreatedBy,    
					  SalesTax= @SalesTax,    
					  ExemptSalesTax= @ExemptSalesTax,    
					  BankWireFee=@BankWireFee,  
					  CardProcessingCharges=@CardProcessingCharges,  
                    UpdatedAt = GETDATE()      
                WHERE      
                    CustomerAccountingSettingId = @CustomerAccountingSettingId;      
                      
                SELECT @CustomerAccountingSettingId AS KeyValue,         
                'Customer Accouting Settings Updated' AS ErrorMessage;      
            END      
            ELSE      
            BEGIN      
                SELECT @CustomerAccountingSettingId AS KeyValue,         
                  'NO RECORD FOUND' AS ErrorMessage;      
            END      
        END      
        ELSE      
        BEGIN      
            INSERT INTO [dbo].[CustomerAccoutingSettings]                  
            (               
                PaymentTermId,          
    CustomerId,      
                CreditLimit,      
    PaymentMethodId,      
                InvoiceSubmissionInstruction,      
                BillingCurrency,      
    CreatedBy,                  
                CreatedAt,    
    SalesTax,    
    ExemptSalesTax ,  
    BankWireFee,  
    CardProcessingCharges  
            )                  
            VALUES                
            (              
                @PaymentTermId,      
    @CustomerId,      
                @CreditLimit,      
                @PaymentMethodId,      
                @InvoiceSubmissionInstruction,      
                @BillingCurrency,      
    @CreatedBy,                  
                GETDATE(),    
    @SalesTax,    
    @ExemptSalesTax,  
    @BankWireFee,  
    @CardProcessingCharges  
            );                  
                  
            SET @keyId = SCOPE_IDENTITY();      
         
   SELECT @keyId AS KeyValue,         
   'Customer Accouting Settings added' AS ErrorMessage;      
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationOtherSettings]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationProfile]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
CREATE PROCEDURE [dbo].[AddEditOrganizationProfile]         
@OrganizationId TINYINT,  
@Name VARCHAR(255),  
@Logo VARCHAR(255),
@Base64File NVARCHAR(MAX),  
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
                    [Base64File] = @Base64File,  
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
                Base64File,  
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
                @Base64File,  
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
/****** Object:  StoredProcedure [dbo].[AddEditOther]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOther]             
    @SupplierPaymentSettingId INT,    
    @SupplierId INT,      
    @OtherNote NVARCHAR(2000),    
    @CreatedBy SMALLINT    
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;            
            
         
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierPaymentSettings] WHERE  [SupplierId] = @SupplierId    )            
            BEGIN            
                UPDATE [dbo].[SupplierPaymentSettings]    
                SET            
                    [SupplierId] = @SupplierId,    
                    [OtherNote] = @OtherNote,    
                    [UpdatedBy] = @CreatedBy,    
                    [UpdatedAt] = GETDATE()            
                WHERE            
                    [SupplierId] = @SupplierId        
                            
                SELECT @SupplierPaymentSettingId AS KeyValue,               
                'Supplier Other Detail Updated' AS ErrorMessage;            
            END            
            ELSE            
            BEGIN            
                INSERT INTO [dbo].[SupplierPaymentSettings]    
                (                     
                    SupplierId,    
                    OtherNote,    
                    [CreatedBy],    
                    [CreatedAt]      
                )                        
                VALUES                      
                (                    
                    @SupplierId,    
                    @OtherNote,    
                    @CreatedBy,    
                    GETDATE()    
                );                        
                        
                SET @keyId = SCOPE_IDENTITY();            
               
                SELECT @keyId AS KeyValue,               
                'Supplier Other Detail added' AS ErrorMessage;      
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
/****** Object:  StoredProcedure [dbo].[AddEditSmtpSettings]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditSuppierBankDetails]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditSuppierBankDetails]         
    @SupplierBankDetailsId INT,
    @BankAddressId INT,
    @RecipientAddressId INT,
    @MessageToRecipient NVARCHAR(140),
    @SupplierId INT,
    @IsAddressInUs BIT,
    @RecipientPhoneNumber VARCHAR(20),
    @PaymentTermId TINYINT,
    @MessageToRecipientBank NVARCHAR(75),
    @BeneficiaryName VARCHAR(100),
    @BankName VARCHAR(200),
    @AccountType VARCHAR(50),
    @AccountNumber VARCHAR(50),
    @BranchCode VARCHAR(50),
    @IbanNumber INT,
    @SwiftCode VARCHAR(50),
    @RoutingNumber VARCHAR(9),
    @SortCode VARCHAR(6),
    @BsbNumber VARCHAR(6),
    @IsActive BIT,
    @CreatedBy SMALLINT
AS        
BEGIN        
    SET NOCOUNT ON;                    
    BEGIN TRY                                    
        DECLARE @keyId AS INT;        
        
       IF @SupplierBankDetailsId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].[SuppierBankDetails]WHERE SupplierBankDetailsId = @SupplierBankDetailsId)        
            BEGIN        
                UPDATE [dbo].[SuppierBankDetails]
                SET        
                    [BankAddressId] = @BankAddressId,
                    [RecipientAddressId] = @RecipientAddressId,
                    [MessageToRecipient] = @MessageToRecipient,
                    [SupplierId] = @SupplierId,
                    [IsAddressInUs] = @IsAddressInUs,
                    [RecipientPhoneNumber] = @RecipientPhoneNumber,
                    [PaymentTermId] = @PaymentTermId,
                    [MessageToRecipientBank] = @MessageToRecipientBank,
                    [BeneficiaryName] = @BeneficiaryName,
                    [BankName] = @BankName,
                    [AccountType] = @AccountType,
                    [AccountNumber] = @AccountNumber,
                    [BranchCode] = @BranchCode,
                    [IbanNumber] = @IbanNumber,
                    [SwiftCode] = @SwiftCode,
                    [RoutingNumber] = @RoutingNumber,
                    [SortCode] = @SortCode,
                    [BsbNumber] = @BsbNumber,
                    [IsActive] = @IsActive,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()        
                WHERE        
                   [SupplierBankDetailsId] = @SupplierBankDetailsId
                        
                SELECT @SupplierBankDetailsId AS KeyValue,           
                'Supplier Bank Details Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @SupplierBankDetailsId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[SuppierBankDetails]
            (                 
                BankAddressId,
                RecipientAddressId,
                MessageToRecipient,
                SupplierId,
                IsAddressInUs,
                RecipientPhoneNumber,
                PaymentTermId,
                MessageToRecipientBank,
                BeneficiaryName,
                BankName,
                AccountType,
                AccountNumber,
                BranchCode,
                IbanNumber,
                SwiftCode,
                RoutingNumber,
                SortCode,
                BsbNumber,
                IsActive,
                [CreatedBy],
                [CreatedAt]  
            )                    
            VALUES                  
            (                
                @BankAddressId,
                @RecipientAddressId,
                @MessageToRecipient,
                @SupplierId,
                @IsAddressInUs,
                @RecipientPhoneNumber,
                @PaymentTermId,
                @MessageToRecipientBank,
                @BeneficiaryName,
                @BankName,
                @AccountType,
                @AccountNumber,
                @BranchCode,
                @IbanNumber,
                @SwiftCode,
                @RoutingNumber,
                @SortCode,
                @BsbNumber,
                @IsActive,
                @CreatedBy,
                GETDATE()
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Supplier Bank Details added' AS ErrorMessage;        
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierAccoutingSetting]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddEditSupplierAccoutingSetting 0,2,2024,'2',2,false,'https:test.com',109        
CREATE PROCEDURE [dbo].[AddEditSupplierAccoutingSetting]         
    @SupplierAccountingSettingId INT,
    @PaymentTermId TINYINT,
    @SupplierId INT,
    @InvoiceSubmissionMethod VARCHAR(25),
    @PoDeliveryMethodId TINYINT,
    @IsActive BIT,
    @PODeliveryMethodDetail VARCHAR(200),
    @CreatedBy SMALLINT    
AS        
BEGIN        
    SET NOCOUNT ON;                    
    BEGIN TRY                                    
        DECLARE @keyId AS INT;        
        
       IF @SupplierAccountingSettingId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierAccoutingSettings] WHERE SupplierAccountingSettingId = @SupplierAccountingSettingId)        
            BEGIN        
                UPDATE [dbo].[SupplierAccoutingSettings]        
                SET        
                    [PaymentTermId] = @PaymentTermId,
                    [SupplierId] = @SupplierId,
                    [InvoiceSubmissionMethod] = @InvoiceSubmissionMethod,
                    [PoDeliveryMethodId] = @PoDeliveryMethodId,
                    [IsActive] = @IsActive,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()        
                WHERE        
                    [SupplierAccountingSettingId] = @SupplierAccountingSettingId;        
                        
                SELECT @SupplierAccountingSettingId AS KeyValue,           
                'Supplier Accounting Settings Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @SupplierAccountingSettingId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[SupplierAccoutingSettings]                    
            (                 
                [PaymentTermId],
                [SupplierId],
                [InvoiceSubmissionMethod],
                [PoDeliveryMethodId],
                [IsActive],
                [PODeliveryMethodDetail],
                [CreatedBy],
                [CreatedAt]  
            )                    
            VALUES                  
            (                
                @PaymentTermId,
                @SupplierId,
                @InvoiceSubmissionMethod,
                @PoDeliveryMethodId,
                @IsActive,
                @PODeliveryMethodDetail,
                @CreatedBy,
                GETDATE()
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Supplier Accounting Settings added' AS ErrorMessage;        
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierFinancialSettings]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddEditSupplierFinancialSettings 0,2,2024,'2',2,false,'https:test.com',109        
CREATE PROCEDURE [dbo].[AddEditSupplierFinancialSettings]         
    @SupplierAccountingSettingId INT,
    @PaymentTermId TINYINT,
    @SupplierId INT,
    @InvoiceSubmissionMethod VARCHAR(25),
    @PoDeliveryMethodId TINYINT,
    @IsActive BIT,
    @CreatedBy SMALLINT    
AS        
BEGIN        
    SET NOCOUNT ON;                    
    BEGIN TRY                                    
        DECLARE @keyId AS INT;        
             
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierAccoutingSettings] WHERE  [SupplierId] = @SupplierId )        
            BEGIN        
                UPDATE [dbo].[SupplierAccoutingSettings]        
                SET        
                    [PaymentTermId] = @PaymentTermId,
                    [SupplierId] = @SupplierId,
                    [InvoiceSubmissionMethod] = @InvoiceSubmissionMethod,
                    [PoDeliveryMethodId] = @PoDeliveryMethodId,
                    [IsActive] = @IsActive,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()        
                WHERE        
                    [SupplierId] = @SupplierId ;        
                        
                SELECT @SupplierAccountingSettingId AS KeyValue,           
                'Supplier Financial Settings Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
               INSERT INTO [dbo].[SupplierAccoutingSettings]                    
            (                 
                [PaymentTermId],
                [SupplierId],
                [InvoiceSubmissionMethod],
                [PoDeliveryMethodId],
                [IsActive],
                [CreatedBy],
                [CreatedAt]  
            )                    
            VALUES                  
            (                
                @PaymentTermId,
                @SupplierId,
                @InvoiceSubmissionMethod,
                @PoDeliveryMethodId,
                @IsActive,
                @CreatedBy,
                GETDATE()
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Supplier Financial Settings added' AS ErrorMessage;  
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierPaymentSettings]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditSupplierPaymentSettings]         
    @SupplierPaymentSettingId INT,
    @SupplierId INT,
    @CCNote NVARCHAR(2000),
    @IsCCExistsOnFile BIT,
    @CheckMailingAddressId INT,
    @OtherNote NVARCHAR(2000),
    @CreatedBy SMALLINT
AS        
BEGIN        
    SET NOCOUNT ON;                    
    BEGIN TRY                                    
        DECLARE @keyId AS INT;        
        
       IF @SupplierPaymentSettingId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierPaymentSettings] WHERE [SupplierPaymentSettingId] = @SupplierPaymentSettingId)        
            BEGIN        
                UPDATE [dbo].[SupplierPaymentSettings]
                SET        
                    [SupplierId] = @SupplierId,
                    [CCNote] = @CCNote,
                    [IsCCExistsOnFile] = @IsCCExistsOnFile,
                    [CheckMailingAddressId] = @CheckMailingAddressId,
                    [OtherNote] = @OtherNote,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()        
                WHERE        
                   [SupplierPaymentSettingId] = @SupplierPaymentSettingId
                        
                SELECT @SupplierPaymentSettingId AS KeyValue,           
                'Supplier Payment Settings Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @SupplierPaymentSettingId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[SupplierPaymentSettings]
            (                 
                SupplierId,
                CCNote,
                IsCCExistsOnFile,
                CheckMailingAddressId,
                OtherNote,
                [CreatedBy],
                [CreatedAt]  
            )                    
            VALUES                  
            (                
                @SupplierId,
                @CCNote,
                @IsCCExistsOnFile,
                @CheckMailingAddressId,
                @OtherNote,
                @CreatedBy,
                GETDATE()
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Supplier Payment Settings added' AS ErrorMessage;        
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
/****** Object:  StoredProcedure [dbo].[AddSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteApiAuthentication]    Script Date: 26-07-2024 10:13:18 ******/
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
            'API Authentication Deleted' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[DeleteApiEndpoint]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
            'API Endpoint Deleted' AS ErrorMessage;      
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
/****** Object:  StoredProcedure [dbo].[DeleteApiParameter]    Script Date: 26-07-2024 10:13:18 ******/
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
            'API Parameter Deleted' AS ErrorMessage;        
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
/****** Object:  StoredProcedure [dbo].[DeleteApiProvider]    Script Date: 26-07-2024 10:13:18 ******/
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
            'API Providers Deleted' AS ErrorMessage;    
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
/****** Object:  StoredProcedure [dbo].[DeleteSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetACHWireBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
            
--GetACHWireBySupplierId 2096           
CREATE PROCEDURE [dbo].[GetACHWireBySupplierId]              
@SupplierId int                 
AS              
BEGIN              
    SET NOCOUNT ON;              
         
    BEGIN TRY              
        SELECT TOP 1   
            SBD.SupplierBankDetailsId,  
            SBD.BankAddressId,  
            SBD.RecipientAddressId,  
            SBD.MessageToRecipient,  
            SBD.SupplierId,  
            SBD.IsAddressInUs,  
            SBD.RecipientPhoneNumber,  
            SBD.PaymentTermId,  
            PT.PaymentTerm,  
            SBD.MessageToRecipientBank,  
            SBD.BeneficiaryName,  
            SBD.BankName,  
            SBD.AccountType,  
            SBD.AccountNumber,  
            SBD.BranchCode,  
            SBD.IbanNumber,  
            SBD.SwiftCode,  
            SBD.RoutingNumber,  
            SBD.SortCode,  
            SBD.BsbNumber,  
            SBD.IsActive  
        FROM [dbo].[SuppierBankDetails] SBD  
        LEFT JOIN [dbo].[PaymentTerms] PT ON PT.[PaymentTermId]= SBD.PaymentTermId   
        WHERE  SBD.[SupplierId]=@SupplierId AND SBD.DeletedBy IS NULL AND SBD.DeletedAt IS NULL          
    END TRY        
    BEGIN CATCH            
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();            
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();            
        DECLARE @ErrorState int = ERROR_STATE();            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);            
    END CATCH         
END;  
GO
/****** Object:  StoredProcedure [dbo].[GetAddressByAddressId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetAddressByAddressId 3380          
CREATE PROCEDURE [dbo].[GetAddressByAddressId]            
@AddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllApproveCustomerForLinking]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllApproveCustomerForLinking 1096               
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
        WHERE 
            C.IsActive = 1 
            AND C.StatusId = 3 
            AND C.DeletedBy IS NULL 
            AND C.DeletedAt IS NULL 
            AND C.CustomerId NOT IN (
                SELECT SubCustomerId
                FROM [dbo].[SubCustomerMainCustomer] 
                WHERE CustomerId = @CustomerId
                AND DeletedBy IS NULL 
                AND DeletedAt IS NULL 
          )                        
     END TRY                                                    
BEGIN CATCH                                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                                    
END CATCH                                           
                                          
END 

GO
/****** Object:  StoredProcedure [dbo].[GetAllCities]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
-- GetAllCities 2336           
CREATE PROCEDURE [dbo].[GetAllCities]                      
@StateId INT                     
AS                      
BEGIN                      
    SET NOCOUNT ON;                      
    BEGIN TRY                              
            
    SELECT                      
    [CityId],    
    [Name],    
    [StateId]    
    FROM [dbo].[Cities] Where [StateId]=@StateId      
                                        
    END TRY                              
BEGIN CATCH                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                              
END CATCH                       
                      
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllPODeliveryMethod]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllPODeliveryMethod      
CREATE PROCEDURE [dbo].[GetAllPODeliveryMethod]              
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                        
                      
SELECT      
[PODeliveryMethodId],    
[PODeliveryMethod]
 FROM [dbo].[PODeliveryMethod]                                                  
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllSubCustomer          
CREATE PROCEDURE [dbo].[GetAllSubCustomer]                       
AS                                      
BEGIN                                      
    SET NOCOUNT ON;                                      
    BEGIN TRY         
                              
            SELECT            
            [CustomerId],      
            [Name]          
            FROM [dbo].[Customers] WHERE IsActive=1 AND deletedby IS NULL AND deletedAt is NULL             
     END TRY                                              
BEGIN CATCH                                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                              
END CATCH                                     
                                    
END 

GO
/****** Object:  StoredProcedure [dbo].[GetApiAuthentications]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetApiEndpoints]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetApiParameters]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetBankAddressByBankAddressId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetBankAddressByBankAddressId 3380          
CREATE PROCEDURE [dbo].[GetBankAddressByBankAddressId]            
@BankAddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @BankAddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
-- GetContactByCustomerId 1082,NULL,'4,3,2'        
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
            AND (@SearchText IS NULL 
                 OR (CON.FirstName+ ' ' + CON.LastName LIKE '%' + @SearchText + '%')
                 OR E.EmailAddress LIKE '%' + @SearchText + '%')  
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
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
-- GetContactBySupplierId 2021,NULL,NULL          
CREATE PROCEDURE [dbo].[GetContactBySupplierId]                            
@SupplierId int,  
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
            SCC.SupplierContactId,                        
            SCC.SupplierId,                    
            SCC.ContactId,                    
            SCC.ContactTypeId,                    
            CT.Type,                    
            CON.FirstName,                    
            CON.LastName,                  
            SC.IsPrimary        
        FROM           
            [dbo].[L_SupplierContacts] SCC                    
            LEFT JOIN [dbo].[Contacts] CON ON SCC.ContactId = CON.ContactId                    
            LEFT JOIN [dbo].[ContactTypes] CT ON SCC.ContactTypeId = CT.ContactTypeId        
            LEFT JOIN [dbo].[L_SupplierContacts] SC ON SC.ContactId = CON.ContactId  
            OUTER APPLY (SELECT TOP 1 E.EmailAddress FROM [dbo].[Emails] E WHERE E.OwnerId = CON.ContactId AND E.OwnerTypeId = 4 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL  
            ) AS E         
            --LEFT JOIN [dbo].[Emails] E ON CON.ContactId = E.OwnerId AND E.OwnerTypeId = 3 AND E.DeletedBy IS NULL AND E.DeletedAt IS NULL          
            --LEFT JOIN [dbo].[Phones] P ON CON.ContactId = P.OwnerId AND P.OwnerTypeId = 3 AND P.DeletedBy IS NULL AND P.DeletedAt IS NULL          
        WHERE            
            SCC.SupplierId = @SupplierId           
            AND CON.DeletedBy IS NULL           
            AND CON.DeletedAt IS NULL  
            AND (@SearchText IS NULL 
                  OR (CON.FirstName+ ' ' + CON.LastName LIKE '%' + @SearchText + '%')
                  OR E.EmailAddress LIKE '%' + @SearchText + '%')  
            AND (@SearchContactType IS NULL OR SCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))              
        ORDER BY           
            SCC.ContactId,SCC.IsPrimary,SCC.ContactTypeId DESC                  
    END TRY                  
    BEGIN CATCH                      
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                      
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                      
        DECLARE @ErrorState int = ERROR_STATE()                      
                  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                      
    END CATCH                 
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetDetailsByCustomerId 1084  
CREATE PROCEDURE [dbo].[GetDetailsByCustomerId]    
    @CustomerId int     
AS    
BEGIN    
    SET NOCOUNT ON;    
    BEGIN TRY    
             
        BEGIN    
            SELECT    
                CAS.[CustomerAccountingSettingId],    
                CAS.PaymentTermId,    
                CAS.PaymentMethodId,    
                CAS.CreditLimit,    
                CAS.BillingCurrency,    
                CAS.InvoiceSubmissionInstruction,  
				CAS.ExemptSalesTax,  
				CAS.SalesTax,  
				CAS.CardProcessingCharges,  
				CAS.BankWireFee  
            FROM [dbo].[CustomerAccoutingSettings] CAS    
            LEFT JOIN [dbo].[PaymentTerms] PT ON PT.PaymentTermId = CAS.PaymentTermId    
            LEFT JOIN [dbo].[PaymentMethods] DM ON DM.PaymentMethodId = CAS.PaymentMethodId    
            WHERE CAS.CustomerId = @CustomerId;    
        END    
    END TRY    
    BEGIN CATCH    
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();    
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();    
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();    
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);    
    END CATCH;    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationOtherSettings]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetOrganizationProfile]    Script Date: 26-07-2024 10:13:18 ******/
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
        OP.Base64File,    
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
/****** Object:  StoredProcedure [dbo].[GetPaymentSettingsBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
            
--GetPaymentSettingsBySupplierId 2096           
CREATE PROCEDURE [dbo].[GetPaymentSettingsBySupplierId]              
@SupplierId int                 
AS              
BEGIN              
    SET NOCOUNT ON;              
         
    BEGIN TRY              
        SELECT TOP 1   
            SupplierPaymentSettingId,  
            SupplierId,  
            CCNote,  
            IsCCExistsOnFile,  
            CheckMailingAddressId,  
            OtherNote  
        FROM [dbo].[SupplierPaymentSettings]  
        WHERE  [SupplierId]=@SupplierId AND DeletedBy IS NULL AND DeletedAt IS NULL          
    END TRY        
    BEGIN CATCH            
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();            
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();            
        DECLARE @ErrorState int = ERROR_STATE();            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);            
    END CATCH         
END;  
GO
/****** Object:  StoredProcedure [dbo].[GetRecipientAddressByrecipientAddressId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetRecipientAddressByrecipientAddressId 3381         
CREATE PROCEDURE [dbo].[GetRecipientAddressByrecipientAddressId]            
@RecipientAddressId int               
AS            
BEGIN            
    SET NOCOUNT ON;            
       
    BEGIN TRY            
        SELECT  
            A.[AddressId],          
            A.[AddressLine1],        
            A.[AddressLine2],             
            A.[CountryId],        
            C.[Name] AS CountryName,        
            A.[StateId],        
            S.[Name] AS StateName,        
            A.[CityId],        
            CI.[Name] AS CityName,        
            A.[ZipCode]     
        FROM [dbo].[Addresses] A     
        LEFT JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
        LEFT JOIN [dbo].[States] S ON S.StateId = A.StateId        
        LEFT JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
        WHERE A.[AddressId] = @RecipientAddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
        ORDER BY A.AddressId DESC        
    END TRY      
    BEGIN CATCH          
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity int = ERROR_SEVERITY();          
        DECLARE @ErrorState int = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH       
END;
GO
/****** Object:  StoredProcedure [dbo].[GetSmtpSettings]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetSubCustomerByCustomerId]    Script Date: 26-07-2024 10:13:18 ******/
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
/****** Object:  StoredProcedure [dbo].[GetSupplierFinancialSettingsBySupplierId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetSupplierFinancialSettingsBySupplierId 2096               
CREATE PROCEDURE [dbo].[GetSupplierFinancialSettingsBySupplierId]                  
@SupplierId int                   
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
             
 BEGIN TRY                  
    SELECT TOP 1      
        SAS.SupplierAccountingSettingId,  
        SAS.PaymentTermId,  
        PT.[PaymentTerm],  
        SAS.SupplierId,  
        SAS.InvoiceSubmissionMethod,  
        PM.[Method],  
        SAS.PoDeliveryMethodId,  
        PDM.PoDeliveryMethod,  
        SAS.IsActive     
    FROM [dbo].[SupplierAccoutingSettings] SAS  
    LEFT JOIN [dbo].[PaymentTerms] PT ON PT.[PaymentTermId]= SAS.PaymentTermId    
    LEFT JOIN [dbo].[PaymentMethods] PM ON PM.[PaymentMethodId]= SAS.InvoiceSubmissionMethod    
    LEFT JOIN [dbo].[PODeliveryMethod] PDM ON PDM.PoDeliveryMethodId= SAS.PoDeliveryMethodId   
    WHERE  SAS.SupplierId= @SupplierId AND SAS.DeletedBy IS NULL AND SAS.DeletedAt IS NULL              
            
END TRY            
    BEGIN CATCH                
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH             
END       
GO
/****** Object:  StoredProcedure [dbo].[GetUserCheckListBtEventId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   
-- GetUserCheckListBtEventId 1  
CREATE PROCEDURE [dbo].[GetUserCheckListBtEventId]   
  @EventId int  
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
  
   BEGIN TRY                       
        SELECT          
             CL.ChecklistId,  
			CL.ChecklistName,  
			CL.EventId 
        FROM     
            [dbo].[Checklists] CL              
             
        WHERE      
            CL.EventId = @EventId    
                              
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH        
END  
GO
/****** Object:  StoredProcedure [dbo].[GetUserCheckListByEventId]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   
-- GetUserCheckListByEventId 1  
CREATE PROCEDURE [dbo].[GetUserCheckListByEventId]   
  @EventId int  
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
  
   BEGIN TRY                       
        SELECT          
             CL.ChecklistId,  
    CL.ChecklistName,  
    CL.EventId  
             
        FROM     
            [dbo].[Checklists] CL              
             
        WHERE      
            CL.EventId = @EventId    
                              
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH        
END  
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCustomer]    Script Date: 26-07-2024 10:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                  
CREATE PROCEDURE [dbo].[UpdateCustomerSubCustomer]                      
 @CustomerId INT,                           
 @IsSubCustomer BIT    
AS                      
BEGIN                      
 SET NOCOUNT ON;                      
 BEGIN TRY    
   IF @IsSubCustomer = 0  
   BEGIN  
    UPDATE [dbo].[L_CustomerAddresses] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;        
    UPDATE [dbo].[L_CustomerContacts] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;     
    UPDATE [dbo].[CustomerDocuments] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;  
    UPDATE [dbo].[Customers] SET StatusId=1 WHERE CustomerId=@CustomerId AND StatusId <> 1;  
   END  
  --ELSE   
  --      BEGIN                      
             UPDATE [dbo].[Customers] SET IsSubCustomer= @IsSubCustomer WHERE CustomerId = @CustomerId    
    
             SELECT @CustomerId as KeyValue,                               
             'Sub customer updated' as ErrorMessage             
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
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 26-07-2024 10:13:18 ******/
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
