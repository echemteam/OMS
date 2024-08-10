
/****** Object:  StoredProcedure [dbo].[GetSupplierFinancialSettingsBySupplierId]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[GetSupplierFinancialSettingsBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetPaymentSettingsBySupplierId]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[GetPaymentSettingsBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetACHWireBySupplierId]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[GetACHWireBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOther]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[AddEditOther]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCreditCard]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[AddEditCreditCard]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCheck]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[AddEditCheck]
GO
/****** Object:  StoredProcedure [dbo].[AddEditACHWire]    Script Date: 10-08-2024 16:44:22 ******/
DROP PROCEDURE [dbo].[AddEditACHWire]
GO
/****** Object:  StoredProcedure [dbo].[AddEditACHWire]    Script Date: 10-08-2024 16:44:22 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditCheck]    Script Date: 10-08-2024 16:44:23 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditCreditCard]    Script Date: 10-08-2024 16:44:23 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditOther]    Script Date: 10-08-2024 16:44:23 ******/
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
/****** Object:  StoredProcedure [dbo].[GetACHWireBySupplierId]    Script Date: 10-08-2024 16:44:23 ******/
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
/****** Object:  StoredProcedure [dbo].[GetPaymentSettingsBySupplierId]    Script Date: 10-08-2024 16:44:23 ******/
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
/****** Object:  StoredProcedure [dbo].[GetSupplierFinancialSettingsBySupplierId]    Script Date: 10-08-2024 16:44:23 ******/
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
