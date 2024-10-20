USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationAccountingDetails]    Script Date: 31-07-2024 15:49:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[AddEditOrganizationAccountingDetails]   
 @OrganizationAccountingDetailId TINYINT,        
 @CreditLimit decimal(18,2),  
 @CreatedBy SMALLINT      
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;            
            
        IF @OrganizationAccountingDetailId > 0            
        BEGIN            
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationAccountingDetails]WHERE [OrganizationAccountingDetailId] = @OrganizationAccountingDetailId)            
            BEGIN            
                UPDATE [dbo].[OrganizationAccountingDetails]      
                SET            
                    [CreditLimit] = @CreditLimit,      
                      
        
                    [UpdatedAt] = GETDATE(),      
                    [UpdatedBy] = @CreatedBy       
                WHERE            
                   [OrganizationAccountingDetailId] = @OrganizationAccountingDetailId  
                            
                SELECT @OrganizationAccountingDetailId AS KeyValue,               
                'Organization Accounting Details Updated' AS ErrorMessage;            
            END             
            ELSE            
            BEGIN            
                SELECT @OrganizationAccountingDetailId AS KeyValue,               
                  'NO RECORD FOUND' AS ErrorMessage;            
            END            
        END            
        ELSE            
        BEGIN            
            INSERT INTO [dbo].[OrganizationAccountingDetails]      
            (                     
               CreditLimit,                
                CreatedBy,      
                CreatedAt      
            )                        
            VALUES                      
            (                    
                @CreditLimit,                   
                @CreatedBy,      
                GETDATE()        
            );                        
                        
            SET @keyId = SCOPE_IDENTITY();            
               
            SELECT @keyId AS KeyValue,               
            'Organization Accounting Details added' AS ErrorMessage;            
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationalLogisticDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditOrganizationalLogisticDetails] 
@OrganizationLogisticDetailId TINYINT,    
	@FedExAccount nvarchar(255),    
	@DHLAccount nvarchar(255),    
	@UPSAccount nvarchar(255),    
	@USPSAccount nvarchar(255),
	@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationLogisticDetailId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationLogisticDetails]WHERE [OrganizationLogisticDetailId] = @OrganizationLogisticDetailId)          
            BEGIN          
                UPDATE [dbo].[OrganizationLogisticDetails]    
                SET          
                    [FedExAccount] = @FedExAccount,    
                    [DHLAccount] = @DHLAccount,    
                    [UPSAccount] = @UPSAccount,
					[USPSAccount]=@USPSAccount,
					 
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationLogisticDetailId] = @OrganizationLogisticDetailId
                          
                SELECT @OrganizationLogisticDetailId AS KeyValue,             
                'Organization Logistic Details Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationLogisticDetailId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationLogisticDetails]    
            (                   
               FedExAccount,    
               DHLAccount,
               UPSAccount, 
				USPSAccount,
				 
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @FedExAccount,   
                @DHLAccount,    
               @UPSAccount,
			   @USPSAccount,
			   
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Logistic Details added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationBankDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditOrganizationBankDetails]
	@OrganizationBankDetailId TINYINT,    
	@BeneficiaryName nvarchar(255),    
	@CheckingAccountNumber nvarchar(255),    
	@RoutingAccountNumber nvarchar(255),    
	@SwiftCode nvarchar(255),
	@BankAddress nvarchar(255),
	@BankBranch nvarchar(255),
	@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationBankDetailId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationBankDetails]WHERE [OrganizationBankDetailId] = @OrganizationBankDetailId)          
            BEGIN          
                UPDATE [dbo].[OrganizationBankDetails]    
                SET          
                    [BeneficiaryName] = @BeneficiaryName,    
                    [CheckingAccountNumber] = @CheckingAccountNumber,    
                    [RoutingAccountNumber] = @RoutingAccountNumber,
					[SwiftCode]=@SwiftCode,
					[BankAddress]=@BankAddress,
					[BankBranch] =@BankBranch,
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationBankDetailId] = @OrganizationBankDetailId
                          
                SELECT @OrganizationBankDetailId AS KeyValue,             
                'Organization Bank Details Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationBankDetailId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationBankDetails]    
            (                   
               BeneficiaryName,    
               CheckingAccountNumber,
               RoutingAccountNumber, 
				SwiftCode,
				BankAddress,
				BankBranch,
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @BeneficiaryName,   
                @CheckingAccountNumber,    
                @RoutingAccountNumber,
			    @SwiftCode,
			    @BankAddress,
			    @BankBranch,
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Bank Details added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationBusinessAddresses]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditOrganizationBusinessAddresses]
	@OrganizationBusinessAddressId TINYINT,    
	@RegisteredAddressId INT,    
	@PhysicalAddressId INT,    
	@RemitToAddressId INT,    
	@BillToAddressId INT,
	@LabAddressId INT,
	@WarehouseAddressId INT,
	@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationBusinessAddressId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationBusinessAddresses]WHERE [OrganizationBusinessAddressId] = @OrganizationBusinessAddressId)          
            BEGIN          
                UPDATE [dbo].[OrganizationBusinessAddresses]    
                SET          
                    [RegisteredAddressId] = @RegisteredAddressId,    
                    [PhysicalAddressId] = @PhysicalAddressId,    
                    [RemitToAddressId] = @RemitToAddressId,
					[BillToAddressId]=@BillToAddressId,
					[LabAddressId]=@LabAddressId,
					[WarehouseAddressId]=@WarehouseAddressId,
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationBusinessAddressId] = @OrganizationBusinessAddressId
                          
                SELECT @OrganizationBusinessAddressId AS KeyValue,             
                'Organization Business Address Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationBusinessAddressId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationBusinessAddresses]    
            (                   
                RegisteredAddressId,    
                PhysicalAddressId,
                RemitToAddressId, 
			    BillToAddressId,
				LabAddressId,
				WarehouseAddressId,
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @RegisteredAddressId,   
                @PhysicalAddressId,    
                @RemitToAddressId,
			    @BillToAddressId,
			    @LabAddressId,
				@WarehouseAddressId,
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Business Address added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationContactDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditOrganizationContactDetails]
	@OrganizationContactDetailId INT,    
	@CompanyWebsite nvarchar(255),    
	@SalesEmail nvarchar(255),    
	@AccountsEmail nvarchar(255),    
	@PurchaseEmail nvarchar(255),
	@CustomerServiceEmail nvarchar(255),
	@SalesPhone nvarchar(255),
	@AccountsPhone nvarchar(255),
	@TollFreePhone nvarchar(255),
	@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationContactDetailId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationContactDetails]WHERE [OrganizationContactDetailId] = @OrganizationContactDetailId)          
            BEGIN          
                UPDATE [dbo].[OrganizationContactDetails]    
                SET          
                    [CompanyWebsite] = @CompanyWebsite,    
                    [SalesEmail] = @SalesEmail,    
                    [AccountsEmail] = @AccountsEmail,
					[PurchaseEmail]=@PurchaseEmail,
					[CustomerServiceEmail]=@CustomerServiceEmail,
					[SalesPhone]=@SalesPhone,
					[AccountsPhone]=@AccountsPhone,
					[TollFreePhone]=@TollFreePhone,
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationContactDetailId] = @OrganizationContactDetailId 
                          
                SELECT @OrganizationContactDetailId AS KeyValue,             
                'Organization Contact Details Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationContactDetailId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationContactDetails]    
            (                   
                CompanyWebsite,    
               SalesEmail,
                AccountsEmail, 
				PurchaseEmail,
				CustomerServiceEmail,
				SalesPhone,
				AccountsPhone,
				TollFreePhone,
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @CompanyWebsite,   
                @SalesEmail,    
               @AccountsEmail,
			   @PurchaseEmail,
			   @CustomerServiceEmail,
			   @SalesPhone,
			   @AccountsPhone,
			   @TollFreePhone,
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Contact Details added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationOtherCharges]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddEditOrganizationOtherCharges]
@OrganizationOtherChargeId TINYINT,    
	@HandlingFees decimal(18,2),    
	@BankWireFees decimal(18,2),    
	@CreditCardServiceFees decimal(18,2),    
	@ColdBoxFees decimal(18,2),
	@ITNFees decimal(18,2),
	@DefaultPaymentTerms TINYINT,
	@CreatedBy SMALLINT    
AS          
BEGIN          
    SET NOCOUNT ON;                      
    BEGIN TRY                                      
        DECLARE @keyId AS INT;          
          
        IF @OrganizationOtherChargeId > 0          
        BEGIN          
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationOtherCharges]WHERE [OrganizationOtherChargeId] = @OrganizationOtherChargeId)          
            BEGIN          
                UPDATE [dbo].[OrganizationOtherCharges]    
                SET          
                    [HandlingFees] = @HandlingFees,    
                    [BankWireFees] = @BankWireFees,    
                    [CreditCardServiceFees] = @CreditCardServiceFees,
					[ColdBoxFees]=@ColdBoxFees,
					[ITNFees]=@ITNFees,
					[DefaultPaymentTerms] = @DefaultPaymentTerms,
                    [UpdatedAt] = GETDATE(),    
                    [UpdatedBy] = @CreatedBy     
                WHERE          
                   [OrganizationOtherChargeId] = @OrganizationOtherChargeId
                          
                SELECT @OrganizationOtherChargeId AS KeyValue,             
                'Organization Other Charges Updated' AS ErrorMessage;          
            END           
            ELSE          
            BEGIN          
                SELECT @OrganizationOtherChargeId AS KeyValue,             
                  'NO RECORD FOUND' AS ErrorMessage;          
            END          
        END          
        ELSE          
        BEGIN          
            INSERT INTO [dbo].[OrganizationOtherCharges]    
            (                   
                HandlingFees,    
                BankWireFees,
                CreditCardServiceFees, 
			    ColdBoxFees,
				ITNFees ,
				 DefaultPaymentTerms,  
                CreatedBy,    
                CreatedAt    
            )                      
            VALUES                    
            (                  
                @HandlingFees,   
                @BankWireFees,    
                @CreditCardServiceFees,
			    @ColdBoxFees,
			    @ITNFees,
				@DefaultPaymentTerms,
                @CreatedBy,    
                GETDATE()      
            );                      
                      
            SET @keyId = SCOPE_IDENTITY();          
             
            SELECT @keyId AS KeyValue,             
            'Organization Other Charges added' AS ErrorMessage;          
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationProfile]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
CREATE PROCEDURE [dbo].[AddEditOrganizationProfile]         
@OrganizationProfileId TINYINT,  
@RegisteredName VARCHAR(255),  
@DBAName VARCHAR(255),
@DateIncorporated DateTime,  
@NAICSCode VARCHAR(255),  
@EIN VARCHAR(255),  
@TXTaxpayerNumber VARCHAR(255),  
@SOSFileNumber VARCHAR(255),  
@WebFileNumber VARCHAR(255),  
@TWCTaxAccountNumber VARCHAR(255),  
@CreatedBy SMALLINT  
AS        
BEGIN        
    SET NOCOUNT ON;                    
    BEGIN TRY                                    
        DECLARE @keyId AS INT;        
        
        IF @OrganizationProfileId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationProfile] WHERE OrganizationProfileId = @OrganizationProfileId)        
            BEGIN        
                UPDATE [dbo].[OrganizationProfile]        
                SET        
                    [RegisteredName] = @RegisteredName,  
                    [DBAName] = @DBAName,
                    [DateIncorporated] = @DateIncorporated,  
                    [NAICSCode] = @NAICSCode,  
                    [EIN] = @EIN,  
                    [TXTaxpayerNumber] = @TXTaxpayerNumber,  
                    [SOSFileNumber] = @SOSFileNumber,  
                    [WebFileNumber] = @WebFileNumber,  
                    [TWCTaxAccountNumber] = @TWCTaxAccountNumber,  
                    [UpdatedAt] = GETDATE(),  
                    [UpdatedBy] = @CreatedBy   
                WHERE        
                    [OrganizationProfileId] = @OrganizationProfileId  
                        
                SELECT @OrganizationProfileId AS KeyValue,           
                'Organization Profile Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @OrganizationProfileId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[OrganizationProfile]  
            (                 
               RegisteredName,  
                DBAName,
                DateIncorporated,  
                NAICSCode,  
                EIN,  
                TXTaxpayerNumber,  
                SOSFileNumber,  
                WebFileNumber,  
                TWCTaxAccountNumber,  
                CreatedBy,  
                CreatedAt  
            )                    
            VALUES                  
            (                
                @RegisteredName,  
                @DBAName,
                @DateIncorporated,  
                @NAICSCode,  
                @EIN,  
                @TXTaxpayerNumber,  
                @SOSFileNumber,  
                @WebFileNumber,  
                @TWCTaxAccountNumber,  
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
/****** Object:  StoredProcedure [dbo].[AddEditOrganizationShippingCharges]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  <Author,,Name>    
-- Create date: <Create Date,,>    
-- Description: <Description,,>    
-- =============================================    
CREATE PROCEDURE [dbo].[AddEditOrganizationShippingCharges]    
 @OrganizationShippingChargeId TINYINT,        
 @DomesticOvernight decimal(18,2),        
 @DomesticSecondDay decimal(18,2),        
 @DomesticGround decimal(18,2),        
 @InternationalPriority decimal(18,2),    
 @InternationalEconomy decimal(18,2),    
 @CreatedBy SMALLINT        
AS              
BEGIN              
    SET NOCOUNT ON;                          
    BEGIN TRY                                          
        DECLARE @keyId AS INT;              
              
        IF @OrganizationShippingChargeId > 0              
        BEGIN              
            IF EXISTS (SELECT 1 FROM [dbo].[OrganizationShippingCharges]WHERE [OrganizationShippingChargeId] = @OrganizationShippingChargeId)              
            BEGIN              
                UPDATE [dbo].[OrganizationShippingCharges]        
                SET              
                    [DomesticOvernight] = @DomesticOvernight,        
                    [DomesticSecondDay] = @DomesticSecondDay,        
                    [DomesticGround] = @DomesticGround,    
      [InternationalPriority]=@InternationalPriority,    
      [InternationalEconomy]=@InternationalEconomy,    
                    [UpdatedAt] = GETDATE(),        
                    [UpdatedBy] = @CreatedBy         
                WHERE              
                   [OrganizationShippingChargeId] = @OrganizationShippingChargeId    
                              
                SELECT @OrganizationShippingChargeId AS KeyValue,                 
                'Organization Shipping Charges Updated' AS ErrorMessage;              
            END               
            ELSE              
            BEGIN              
                SELECT @OrganizationShippingChargeId AS KeyValue,                 
                  'NO RECORD FOUND' AS ErrorMessage;              
            END              
        END              
        ELSE              
        BEGIN              
            INSERT INTO [dbo].[OrganizationShippingCharges]        
            (                       
                DomesticOvernight,        
                DomesticSecondDay,    
                DomesticGround,     
      InternationalPriority,    
    InternationalEconomy,     
                CreatedBy,        
                CreatedAt        
            )                          
            VALUES                        
            (                      
               @DomesticOvernight,       
               @DomesticSecondDay,        
               @DomesticGround,    
     @InternationalPriority,    
     @InternationalEconomy,    
               @CreatedBy,        
               GETDATE()          
            );                          
                          
            SET @keyId = SCOPE_IDENTITY();              
                 
            SELECT @keyId AS KeyValue,                 
            'Organization Shipping Charges added' AS ErrorMessage;              
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
/****** Object:  StoredProcedure [dbo].[GetOrganizationAccountingDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetOrganizationAccountingDetails]
	AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
       OrganizationAccountingDetailId,
	   CreditLimit
    FROM [dbo].[OrganizationAccountingDetails]     
     
    WHERE  DeletedBy IS NULL AND  DeletedAt IS NULL          
    ORDER BY OrganizationAccountingDetailId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationBankDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetOrganizationBankDetails]
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
       OrganizationBankDetailId,
	   BeneficiaryName,
	   CheckingAccountNumber,
	   RoutingAccountNumber,
	   SwiftCode,
	   BankAddress,
	   BankBranch
    FROM [dbo].[OrganizationBankDetails]     
     
    WHERE  DeletedBy IS NULL AND  DeletedAt IS NULL          
    ORDER BY OrganizationBankDetailId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 	
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationBusinessAddresses]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --GetOrganizationProfile      
CREATE PROCEDURE [dbo].[GetOrganizationBusinessAddresses]                        
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
        OBA.OrganizationBusinessAddressId, 
        OBA.RegisteredAddressId,    
		OBA.PhysicalAddressId,
		OBA.RemitToAddressId,
		OBA.BillToAddressId,
		OBA.LabAddressId,
		OBA.WarehouseAddressId
        
    FROM [dbo].[OrganizationBusinessAddresses] OBA     
           
    WHERE OBA.DeletedBy IS NULL AND OBA.DeletedAt IS NULL          
    ORDER BY OBA.OrganizationBusinessAddressId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationContactDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetOrganizationContactDetails]
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
       OrganizationContactDetailId  ,
	   CompanyWebsite,
	   SalesEmail,
	   AccountsEmail,
	   PurchaseEmail,
	   CustomerServiceEmail,
	   SalesPhone,
	   AccountsPhone,
	   TollFreePhone
    FROM [dbo].[OrganizationContactDetails]     
     
    WHERE  DeletedBy IS NULL AND  DeletedAt IS NULL          
    ORDER BY OrganizationContactDetailId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationHistorys]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                            
--GetOrganizationHistorys 1,25,'','',500                        
CREATE PROCEDURE [dbo].[GetOrganizationHistorys]                                          
    @PageNumber INT = 1,                  
    @PageSize INT = 25,                  
    @SearchText NVARCHAR(200) = '',    
    @SortString VARCHAR(250) = '',                   
    @TotalCount INT OUTPUT                                         
AS                                          
BEGIN                     
                
    SET NOCOUNT ON;                  
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                  
    DECLARE @OrderBy NVARCHAR(250) = '';      
     SET @OrderBy = @SortString   
      
    IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'O.ChangeAt DESC';    
    END       
              
    -- Get the total count                  
    SELECT @TotalCount = COUNT(*)                  
    FROM [dbo].[OrganizationHistory] O                       
   
    DECLARE @SQL NVARCHAR(MAX);           
    SET @SQL = '    
        SELECT                  
            OrganizationHistoryId,
            EventName,
            ChangeBy,
            ChangeAt,
            Description,
            EventStatus
        FROM [dbo].[OrganizationHistory] O
        ORDER BY ' + @OrderBy + '   
        OFFSET @Offset ROWS                
        FETCH NEXT @PageSize ROWS ONLY;'; 

        EXEC sp_executesql @SQL,      
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',   
        @SearchText, @Offset, @PageSize;                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationLogisticDetails]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetOrganizationLogisticDetails]
	AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
       OrganizationLogisticDetailId,
	   FedExAccount,
	   DHLAccount,
	   UPSAccount,
	   USPSAccount
    FROM [dbo].[OrganizationLogisticDetails]     
     
    WHERE  DeletedBy IS NULL AND  DeletedAt IS NULL          
    ORDER BY OrganizationLogisticDetailId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationOtherCharges]    Script Date: 31-07-2024 15:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetOrganizationOtherCharges]
AS              
BEGIN              
 SET NOCOUNT ON;              
         
 BEGIN TRY              
    SELECT TOP 1   
      OOC.OrganizationOtherChargeId,
	    OOC.HandlingFees,
	    OOC.BankWireFees,
	    OOC.CreditCardServiceFees,
	    OOC.ColdBoxFees,
	    OOC.ITNFees,
		PT.PaymentTerm,
		OOC.DefaultPaymentTerms
    FROM [dbo].[OrganizationOtherCharges] OOC
	left JOIN [dbo].[PaymentTerms] PT ON OOC.DefaultPaymentTerms= PT.PaymentTermId    

    WHERE  OOC.DeletedBy IS NULL AND  OOC.DeletedAt IS NULL          
    ORDER BY OrganizationOtherChargeId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationProfile]    Script Date: 31-07-2024 15:49:23 ******/
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
         OrganizationProfileId,
		 RegisteredName,
		 DBAName,
		 DateIncorporated,
		 NAICSCode,
		 EIN,
		 TXTaxpayerNumber,
		 SOSFileNumber,
		 WebFileNumber,
		 TWCTaxAccountNumber

        
    FROM [dbo].[OrganizationProfile]      
           
    
    WHERE  DeletedBy IS NULL AND  DeletedAt IS NULL          
    ORDER BY OrganizationProfileId DESC          
        
END TRY        
    BEGIN CATCH            
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
