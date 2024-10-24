USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 28-06-2024 18:13:04 ******/
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
	@CreatedBy smallint
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
                CreatedAt     
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
                 GETDATE()
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
/****** Object:  StoredProcedure [dbo].[GetAllPaymentMethod]    Script Date: 28-06-2024 18:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
create PROCEDURE [dbo].[GetAllPaymentMethod] 
	 
AS
 
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 PaymentMethodId,
 Method
FROM [dbo].PaymentMethods
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetDefaultPaymentTemplete]    Script Date: 28-06-2024 18:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE PROCEDURE [dbo].[GetDefaultPaymentTemplete] 
	 
AS
 
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 PaymentTermId,
 PaymentTerm
FROM [dbo].PaymentTerms
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 28-06-2024 18:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
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
                CAS.InvoiceSubmissionInstruction
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
