--AddCustomerShppingDeliveryCarriersAndDeliveryMethods 1,1049,false,109          
ALTER PROCEDURE [dbo].[AddCustomerShppingDeliveryCarriersAndDeliveryMethods]             
@DeliveryAccountId INT,          
@CustomerId INT,  
@IsByDefault bit,            
@CreatedBy smallint            
AS            
BEGIN            
    SET NOCOUNT ON;                        
    BEGIN TRY                                        
        DECLARE @keyId AS INT;        
        DECLARE @ExistingDeliveryAccountId INT;            
                
        BEGIN          
            IF NOT EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId)          
            BEGIN                
                INSERT INTO [dbo].[CustomerAccountingSettings](DeliveryAccountId,CustomerId,CreatedBy,CreatedAt)                        
                VALUES(@DeliveryAccountId,@CustomerId,@CreatedBy,GETDATE());                        
            END          
            ELSE          
            BEGIN          
               SELECT @ExistingDeliveryAccountId = DeliveryAccountId FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId;        
                   
               IF @ExistingDeliveryAccountId != @DeliveryAccountId OR @ExistingDeliveryAccountId IS NULL      
               BEGIN 
                    UPDATE [dbo].[CustomerAccountingSettings] SET DeliveryAccountId=@DeliveryAccountId  WHERE CustomerId=@CustomerId        
        
                    UPDATE [dbo].[L_CustomCharge_CustomerDeliveryMethods] SET        
                    DeletedBy=@CreatedBy,DeletedAt=GETDATE(),UpdatedBy=@CreatedBy,UpdatedAt=GETDATE() WHERE CustomerId=@CustomerId        
        
                    UPDATE [dbo].[L_CustomerDeliveryCarriers] SET        
                    DeletedBy=@CreatedBy,DeletedAt=GETDATE(),UpdatedBy=@CreatedBy,UpdatedAt=GETDATE() WHERE CustomerId=@CustomerId          
               END            
            END          
            
            IF @IsByDefault = 1  
            BEGIN            
                IF @DeliveryAccountId=1          
                BEGIN          
                    IF NOT EXISTS (SELECT 1 FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] WHERE CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS   NULL AND DeliveryMethodId IN (SELECT DeliveryMethodId FROM [dbo].[DeliveryMethods]))   
      
   
                    BEGIN          
                        INSERT INTO [dbo].[L_CustomCharge_CustomerDeliveryMethods](CustomerId,DeliveryMethodId,Charge,CreatedBy,CreatedAt)          
                        SELECT @CustomerId,DeliveryMethodId,Charge,@CreatedBy,GETDATE() FROM [dbo].[DeliveryMethods] ORDER BY DeliveryMethodId ASC        
        
                        SELECT CAST(0 AS INT) as KeyValue,                 
                        'Customer Delivery Methods added.' as ErrorMessage;           
                    END        
                END          
          
                IF @DeliveryAccountId=2          
                BEGIN          
                    IF NOT EXISTS (SELECT 1 FROM [dbo].[L_CustomerDeliveryCarriers] WHERE CarrierId IN (SELECT CarrierId FROM [dbo].[DeliveryCarriers])AND CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL)          
                    BEGIN          
                        INSERT INTO [dbo].[L_CustomerDeliveryCarriers](CarrierId,CustomerId,CreatedAt,CreatedBy)          
                        SELECT CarrierId,@CustomerId,GETDATE(),@CreatedBy FROM [dbo].[DeliveryCarriers] ORDER BY CarrierId ASC          
                    END          
          
                    IF NOT EXISTS (SELECT 1 FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] WHERE CustomerId = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL AND DeliveryMethodId IN (SELECT DeliveryMethodId FROM [dbo].[DeliveryMethods]))     
     
                    BEGIN          
                        INSERT INTO [dbo].[L_CustomCharge_CustomerDeliveryMethods](CustomerId,DeliveryMethodId,Charge,CreatedAt,CreatedBy)          
                        SELECT @CustomerId,DeliveryMethodId,Charge,GETDATE(),@CreatedBy FROM [dbo].[DeliveryMethods] ORDER BY DeliveryMethodId ASC          
                    END        
        
                    SELECT CAST(0 AS INT) as KeyValue,                 
                    'Customer delivery Carrier added.' as ErrorMessage;                       
                END     
            END
            ELSE
            BEGIN
                SELECT CAST(0 AS INT) as KeyValue,                 
                'By defualt shipping not added' as ErrorMessage;
            END       
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
/****** Object:  StoredProcedure [dbo].[AddEditCustomerInvoice]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[AddEditCustomerInvoice]       
    @CustomerAccountingSettingId INT=0,      
	@CustomerId INT,         
    @InvoiceSubmissionInstruction NVARCHAR(1000),
	@CreatedBy INT
AS      
BEGIN      
    SET NOCOUNT ON;                  
    BEGIN TRY                                  
        DECLARE @keyId AS INT;      
      
        IF @CustomerAccountingSettingId > 0 OR  @CustomerId > 0     
        BEGIN      
            IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerAccountingSettingId = @CustomerAccountingSettingId)      
            BEGIN      
                UPDATE [dbo].[CustomerAccountingSettings]      
                SET
                    InvoiceSubmissionInstruction = @InvoiceSubmissionInstruction,
                    UpdatedAt = GETDATE()      
                WHERE      
                    CustomerAccountingSettingId = @CustomerAccountingSettingId;      
                      
                SELECT @CustomerAccountingSettingId AS KeyValue,         
                'Customer Invoice Updated' AS ErrorMessage;      
            END       
        END      
        ELSE      
        BEGIN      
            INSERT INTO [dbo].[CustomerAccountingSettings]                  
            (                            
                InvoiceSubmissionInstruction,
				CreatedBy,                  
                CreatedAt
            )                  
            VALUES                
            (
                @InvoiceSubmissionInstruction,      
				@CreatedBy,                  
                GETDATE() 
            );                  
                  
            SET @keyId = SCOPE_IDENTITY();      
         
   SELECT @keyId AS KeyValue,         
   'Customer Invoice added' AS ErrorMessage;      
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
/****** Object:  StoredProcedure [dbo].[GetDetailsByCustomerId]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetDetailsByCustomerId 1084  
ALTER PROCEDURE [dbo].[GetDetailsByCustomerId]    
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
            FROM [dbo].[CustomerAccountingSettings] CAS    
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
/****** Object:  StoredProcedure [dbo].[GetShppingDeliveryCarrierAndDeliveryMethodsById]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetShppingDeliveryCarrierAndDeliveryMethodsById 15 
ALTER PROCEDURE [dbo].[GetShppingDeliveryCarrierAndDeliveryMethodsById]  
    @CustomerId int   
AS  
BEGIN  
    SET NOCOUNT ON;  
    BEGIN TRY  
           
        BEGIN  
            SELECT  
                CAS.DeliveryAccountId,
                DA.NAME
            FROM [dbo].[CustomerAccountingSettings] CAS
            LEFT JOIN [dbo].[DeliveryAccounts] DA ON DA.DeliveryAccountId = CAS.DeliveryAccountId  
            WHERE CAS.CustomerId = @CustomerId ;  
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
/****** Object:  StoredProcedure [dbo].[GetSupplierFinancialSettingsBySupplierId]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO      
--GetSupplierFinancialSettingsBySupplierId 2096               
ALTER PROCEDURE [dbo].[GetSupplierFinancialSettingsBySupplierId]                  
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
    FROM [dbo].[SupplierAccountingSettings] SAS  
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
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateCustomerData 6      
ALTER PROCEDURE [dbo].[ValidateCustomerData]      
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
    SELECT @DeliveryAccountsId = DeliveryAccountId FROM dbo.CustomerAccountingSettings WHERE CustomerId = @CustomerId;      
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
		IF EXISTS (SELECT 1 FROM L_CustomerAddresses LCA 
           LEFT JOIN [dbo].[Addresses] A ON  LCA.AddressId=A.AddressId 
           WHERE LCA.CustomerId = @CustomerId AND LCA.AddressTypeId = 1 AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL)
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

	BEGIN
		IF EXISTS (SELECT 1 FROM L_CustomerAddresses LCA 
        LEFT JOIN [dbo].[Addresses] A ON  LCA.AddressId=A.AddressId
        WHERE LCA.CustomerId = @CustomerId AND LCA.AddressTypeId = 2 AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL)
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

		IF @IsSubCustomer = 0
     -- Check Customer Default Payment Terms Template
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId AND PaymentTermId IS NOT NULL)
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

		IF @IsSubCustomer = 0
    -- Check Customer Payment Method
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId AND PaymentMethodId IS NOT NULL)
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

		IF @IsSubCustomer = 0
    -- Check Customer Credit Limit
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId AND CreditLimit IS NOT NULL)
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

		IF @IsSubCustomer = 0
    -- Check Customer Billing Currency
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerId = @CustomerId AND BillingCurrency IS NOT NULL)
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

	IF @IsSubCustomer = 0
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
/****** Object:  StoredProcedure [dbo].[AddEditCustomerSettings]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO  
ALTER PROCEDURE [dbo].[AddEditCustomerSettings]       
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
            IF EXISTS (SELECT 1 FROM [dbo].[CustomerAccountingSettings] WHERE CustomerAccountingSettingId = @CustomerAccountingSettingId)      
            BEGIN      
                UPDATE [dbo].[CustomerAccountingSettings]      
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
            INSERT INTO [dbo].[CustomerAccountingSettings]                  
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierAccoutingSetting]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddEditSupplierAccoutingSetting 0,2,2024,'2',2,false,'https:test.com',109        
ALTER PROCEDURE [dbo].[AddEditSupplierAccoutingSetting]         
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
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierAccountingSettings] WHERE SupplierAccountingSettingId = @SupplierAccountingSettingId)        
            BEGIN        
                UPDATE [dbo].[SupplierAccountingSettings]        
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
            INSERT INTO [dbo].[SupplierAccountingSettings]                    
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierFinancialSettings]    Script Date: 21-08-2024 10:26:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddEditSupplierFinancialSettings 0,2,2024,'2',2,false,'https:test.com',109        
ALTER PROCEDURE [dbo].[AddEditSupplierFinancialSettings]         
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
             
            IF EXISTS (SELECT 1 FROM [dbo].[SupplierAccountingSettings] WHERE  [SupplierId] = @SupplierId )        
            BEGIN        
                UPDATE [dbo].[SupplierAccountingSettings]        
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
               INSERT INTO [dbo].[SupplierAccountingSettings]                    
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