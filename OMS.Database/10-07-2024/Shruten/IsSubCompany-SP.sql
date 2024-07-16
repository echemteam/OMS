USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 16-07-2024 15:47:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomersBasicInformationById 16          
ALTER PROCEDURE [dbo].[GetCustomersBasicInformationById]                          
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
  C.IsSubCompany
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
/****** Object:  StoredProcedure [dbo].[UpdateCustomerSubCompany]    Script Date: 16-07-2024 15:47:35 ******/
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

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--GetCustomers 1,150,'ki','',500                
ALTER PROCEDURE [dbo].[GetCustomers]                      
  @PageNumber INT = 1,                      
  @PageSize INT = 25,                      
  @SearchText NVARCHAR(50) = '',                      
  @StatusId VARCHAR(15) = '',                      
  @TotalCount INT OUTPUT                      
AS                      
BEGIN                      
    SET NOCOUNT ON;                      
 BEGIN TRY                    
    -- Calculate the offset for pagination                      
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                      
                
    DECLARE @StatusIdsTable TABLE (StatusId VARCHAR(15));                
                   
    INSERT INTO @StatusIdsTable (StatusId)                
    SELECT value                
    FROM STRING_SPLIT(@StatusId, ',')                
    WHERE @StatusId IS NOT NULL; -- Filter out NULL values                
                
    -- Get the total count                      
    SELECT @TotalCount = COUNT(*)                      
    FROM [dbo].[Customers] C                      
    LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId        
    LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND E.OwnerTypeId=1        
    LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId=CIAR.CustomerId  AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL                   
    WHERE                      
        (@StatusId = '' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (C.Name LIKE '%' + @SearchText + '%' OR @SearchText IS NULL        
        OR C.TaxId = @SearchText OR @SearchText IS NULL        
        OR E.EmailAddress LIKE '%' + @SearchText + '%' OR @SearchText IS NULL)                       
        AND C.DeletedBy IS NULL                 
        AND C.DeletedAt IS NULL;                
                
    --Select the data with the corrected WHERE clause                      
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
       U.FirstName + ' ' + U.LastName AS ResponsibleUserName,
	   C.IsSubCompany
    FROM [dbo].[Customers] C                      
    LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId         
    LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND E.OwnerTypeId=1              
    LEFT JOIN [dbo].[L_CustomerInActiveReasons] CIAR ON C.CustomerId=CIAR.CustomerId  AND CIAR.DeletedAt IS NULL AND CIAR.DeletedBy IS NULL            
    LEFT JOIN Users U ON U.UserId =C.ResponsibleUserId          
    WHERE                      
       (@StatusId = '' OR C.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (C.Name LIKE '%' + @SearchText + '%' OR @SearchText IS NULL        
        OR C.TaxId = @SearchText OR @SearchText IS NULL        
        OR E.EmailAddress LIKE '%' + @SearchText + '%' OR @SearchText IS NULL)                            
        AND C.DeletedBy IS NULL                 
        AND C.DeletedAt IS NULL                         
    ORDER BY C.CustomerId DESC                      
    OFFSET @Offset ROWS                      
    FETCH NEXT @PageSize ROWS ONLY;                      
                
END TRY                  
    BEGIN CATCH                      
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                      
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                      
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                      
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                      
    END CATCH                 
END; 

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateCustomerData 6      
ALTER PROCEDURE [dbo].[ValidateCustomerData]      
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
	IF @IsSubCompany = 0 --If Sub Company is true then do not required to check the Billing address information
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
	IF @IsSubCompany = 0 --If Sub Company is true then do not required to check the Shipping address information
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
	IF @IsSubCompany = 0 --If Sub Company is true then do not required to check the Contact information
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
   
	IF @IsSubCompany = 0 --If Sub Company is true then do not required to check the Contact information
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