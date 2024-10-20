USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[ValidateCustomerData]    Script Date: 28-06-2024 17:59:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateCustomerData 6    
CREATE PROCEDURE [dbo].[ValidateCustomerData]    
 @CustomerId INT    
AS    
BEGIN    
    DECLARE @ValidationResults TABLE    
    (    
        IsValid BIT,    
        Messages NVARCHAR(MAX)    
    );    
    
    DECLARE @IsValid BIT = 1; 
	DECLARE @CustomerName NVARCHAR(100)
	SELECT @CustomerName = Name FROM Customers WHERE CustomerId = @CustomerId
    
    -- Check For Customer Basic Destils    
    IF EXISTS (SELECT 1 FROM Customers WHERE CustomerId = @CustomerId AND TaxId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @CustomerName + ' has an TaxId');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0,  @CustomerName +' does not have an TaxId');    
    END    
    
    -- Check For Customer Address    
    IF EXISTS (SELECT 1 FROM L_CustomerAddresses WHERE CustomerId = @CustomerId AND AddressId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @CustomerName +' has an Address');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0, @CustomerName +' does not have an Address');    
    END    
    
    -- Check For Customer Contact    
    IF EXISTS (SELECT 1 FROM L_CustomerContacts WHERE CustomerId = @CustomerId AND ContactId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @CustomerName +' has a Contact');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0, @CustomerName +' does not have a Contact');    
    END 
    -- Return the list of validation results    
    SELECT IsValid, Messages    
    FROM @ValidationResults;    
END 
GO
/****** Object:  StoredProcedure [dbo].[ValidateSupplierData]    Script Date: 28-06-2024 17:59:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ValidateSupplierData 6  
CREATE PROCEDURE [dbo].[ValidateSupplierData]  
 @SupplierId INT  
AS  
BEGIN  
    DECLARE @ValidationResults TABLE  
    (  
        IsValid BIT,  
        Messages NVARCHAR(MAX)  
    );  
  
    DECLARE @IsValid BIT = 1;   
  
    -- Check For Customer Basic Destils  
    IF EXISTS (SELECT 1 FROM Suppliers WHERE SupplierId = @SupplierId  AND TaxId IS NOT NULL)  
    BEGIN  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (1, 'Supplier has an TaxId');  
    END  
    ELSE  
    BEGIN  
        SET @IsValid = 0;  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (0, 'Supplier does not have an TaxId');  
    END  
  
    -- Check For Customer Address  
    IF EXISTS (SELECT 1 FROM L_SupplierAddresses WHERE SupplierId = @SupplierId AND AddressId IS NOT NULL)  
    BEGIN  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (1, 'Supplier has an Address');  
    END  
    ELSE  
    BEGIN  
        SET @IsValid = 0;  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (0, 'Supplier does not have an Address');  
    END  
  
    -- Check For Customer Contact  
    IF EXISTS (SELECT 1 FROM L_SupplierContacts WHERE SupplierId = SupplierId AND ContactId IS NOT NULL)  
    BEGIN  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (1, 'Supplier has a Contact');  
    END  
    ELSE  
    BEGIN  
        SET @IsValid = 0;  
        INSERT INTO @ValidationResults (IsValid, Messages)  
        VALUES (0, 'Supplier does not have a Contact');  
    END  
  
    -- Return the list of validation results  
    SELECT IsValid, Messages  
    FROM @ValidationResults;  
END  
GO
