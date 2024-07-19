
/****** Object:  StoredProcedure [dbo].[UpdateShppingDeliveryCarriers]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[UpdateShppingDeliveryCarriers]
GO
/****** Object:  StoredProcedure [dbo].[GetShppingDeliveryCarriersByCustomerId]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[GetShppingDeliveryCarriersByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[GetDetailsByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[GetContactByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[AddShppingDeliveryCarriers]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[AddShppingDeliveryCarriers]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 18-07-2024 16:51:00 ******/
DROP PROCEDURE [dbo].[AddEditCustomerSettings]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 18-07-2024 16:51:00 ******/
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
	@BankFee DECIMAL(5,2),
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
					 BankFee=@BankFee,
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
				BankFee,
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
				@BankFee,
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
/****** Object:  StoredProcedure [dbo].[AddShppingDeliveryCarriers]    Script Date: 18-07-2024 16:51:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddShppingDeliveryCarriers]          
@CustomerId INT,  
@CarrierId SMALLINT,  
@AccountNumber VARCHAR(50),  
@IsPrimary BIT,        
@CreatedBy SMALLINT,
@HandlingFee DECIMAL(5,2)
AS          
BEGIN          
 SET NOCOUNT ON;   
 DECLARE @keyId AS INT                   
  
BEGIN TRY                    
    IF EXISTS (SELECT CarrierId FROM [dbo].[L_CustomerDeliveryCarriers] WHERE CarrierId=@CarrierId AND CustomerId=@CustomerId And DeletedBy is null And DeletedAt is null )          
    BEGIN          
        SELECT CAST(0 AS TINYINT) as KeyValue,                   
        'Carriers EXISTS' as ErrorMessage             
    END          
    ELSE          
    BEGIN  
        IF @IsPrimary =1    
        BEGIN    
            UPDATE [dbo].[L_CustomerDeliveryCarriers] SET    
            IsPrimary=0    
            WHERE CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL    
        END  
   
        INSERT INTO [dbo].[L_CustomerDeliveryCarriers]          
        (       
            CarrierId,  
            AccountNumber,  
            CustomerId,  
            IsPrimary, 
			HandlingFee,
            CreatedBy,          
            CreatedAt         
        )          
        VALUES        
        (      
            @CarrierId,  
            @AccountNumber,  
            @CustomerId,  
            @IsPrimary, 
			@HandlingFee,
            @CreatedBy,          
            GETDATE()          
        )          
          
        SET  @keyId = SCOPE_IDENTITY()                  
          
        SELECT @keyId as KeyValue,                   
        'Carriers Added' as ErrorMessage             
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
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 18-07-2024 16:51:01 ******/
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
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]    Script Date: 18-07-2024 16:51:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
-- GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId 15             
CREATE PROCEDURE [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]                
@CustomerDeliveryCarrierId int                 
AS                
BEGIN                
 SET NOCOUNT ON;                
           
 BEGIN TRY                
    SELECT      
        CDC.CustomerDeliveryCarrierId,    
        CDC.CarrierId,    
        DC.Carrier,    
        CDC.AccountNumber,    
        CDC.IsPrimary,    
        CDC.CustomerId ,
		CDC.HandlingFee
    FROM [dbo].[L_CustomerDeliveryCarriers] CDC                
    left JOIN [dbo].[DeliveryCarriers] DC ON DC.CarrierId= CDC.CarrierId            
    WHERE  CDC.CustomerDeliveryCarrierId= @CustomerDeliveryCarrierId AND CDC.DeletedBy IS NULL AND CDC.DeletedAt IS NULL            
    ORDER BY CDC.CustomerDeliveryCarrierId DESC            
          
END TRY          
    BEGIN CATCH              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 18-07-2024 16:51:01 ******/
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
				CAS.BankFee
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
/****** Object:  StoredProcedure [dbo].[GetShppingDeliveryCarriersByCustomerId]    Script Date: 18-07-2024 16:51:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
-- GetShppingDeliveryCarriersByCustomerId 2  
CREATE PROCEDURE [dbo].[GetShppingDeliveryCarriersByCustomerId]                
@CustomerId int                 
AS                
BEGIN                
 SET NOCOUNT ON;                
           
 BEGIN TRY                
    SELECT      
        CDC.CustomerDeliveryCarrierId,    
        CDC.CarrierId,    
        DC.Carrier,    
        CDC.AccountNumber,    
        CDC.IsPrimary,    
        CDC.CustomerId,  
		ISNULL(CDC.HandlingFee,10) AS HandlingFee  -- Default handling fee set to 10  
    FROM [dbo].[L_CustomerDeliveryCarriers] CDC                
    left JOIN [dbo].[DeliveryCarriers] DC ON DC.CarrierId= CDC.CarrierId            
    WHERE  CDC.CustomerId= @CustomerId AND CDC.DeletedBy IS NULL AND CDC.DeletedAt IS NULL            
    ORDER BY CDC.CustomerDeliveryCarrierId DESC            
          
END TRY          
    BEGIN CATCH              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateShppingDeliveryCarriers]    Script Date: 18-07-2024 16:51:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                       
CREATE PROCEDURE [dbo].[UpdateShppingDeliveryCarriers]                        
@CustomerDeliveryCarrierId BIGINT,                
@CustomerId INT,                
@AccountNumber VARCHAR(50),               
@CarrierId SMALLINT,               
@IsPrimary BIT,                       
@UpdatedBy SMALLINT,
@HandlingFee DECIMAL(5,2)
AS                        
BEGIN                        
 SET NOCOUNT ON;                        
BEGIN TRY                
                
        IF @IsPrimary =1                
        BEGIN                
            UPDATE [dbo].[L_CustomerDeliveryCarriers] SET                
				IsPrimary=0,      
				UpdatedBy = @UpdatedBy,                        
				UpdatedAt = GETDATE()       
            WHERE CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL                
        END                
                
        UPDATE [dbo].[L_CustomerDeliveryCarriers] SET                  
            AccountNumber=@AccountNumber,
			HandlingFee=@HandlingFee,
            IsPrimary=@IsPrimary,                        
            UpdatedBy = @UpdatedBy,                        
            UpdatedAt = GETDATE()                        
        WHERE CustomerDeliveryCarrierId = @CustomerDeliveryCarrierId AND CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL                      
                        
        SELECT @CustomerDeliveryCarrierId as KeyValue,                                 
        'Delivery carriers updated' as ErrorMessage           
                  
        IF NOT EXISTS (SELECT 1 FROM [dbo].[L_CustomerDeliveryCarriers] where CarrierId=@CarrierId AND CustomerId = @CustomerId)            
        BEGIN           
            UPDATE [dbo].[L_CustomerDeliveryCarriers] SET                      
                CarrierId=@CarrierId,                          
                UpdatedBy = @UpdatedBy,                        
                UpdatedAt = GETDATE()                        
            WHERE CustomerDeliveryCarrierId = @CustomerDeliveryCarrierId AND CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL             
        END                
        ELSE            
        BEGIN            
            SELECT CAST(0 AS INT) as KeyValue,                 
            'Delivery carriers already exists.' as ErrorMessage;              
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

-- GetContactBySupplierId 2021,NULL,NULL          
ALTER PROCEDURE [dbo].[GetContactBySupplierId]                            
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