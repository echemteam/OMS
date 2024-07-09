
/****** Object:  StoredProcedure [dbo].[ValidateSupplierData]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[ValidateSupplierData]
GO
/****** Object:  StoredProcedure [dbo].[UpdateShppingDeliveryCarriers]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[UpdateShppingDeliveryCarriers]
GO
/****** Object:  StoredProcedure [dbo].[UpdateDeliveryMethods]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[UpdateDeliveryMethods]
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomersBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[UpdateCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddressForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[UpdateAddressForCustomer]
GO
/****** Object:  StoredProcedure [dbo].[GetUserRoles]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetUserRoles]
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSuppliers]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierNotesBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupplierNotesBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierDetailsBySupplierName]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupplierDetailsBySupplierName]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierBasicInformationById]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupplierBasicInformationById]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAuditHistoryBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupplierAuditHistoryBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAddresssByAddressId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupplierAddresssByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetSupllierContactByContactId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetSupllierContactByContactId]
GO
/****** Object:  StoredProcedure [dbo].[GetEventNameAndUserNameBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetEventNameAndUserNameBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetEventNameAndUserNameByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetEventNameAndUserNameByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersDetailsByCutomerName]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomersDetailsByCutomerName]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomersBasicInformationById]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomers]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerNotesByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerNotesByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryMethodByCustomerDeliveryMethodId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerDeliveryMethodByCustomerDeliveryMethodId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerContactByContactId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerContactByContactId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAuditHistoryByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerAuditHistoryByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAddresssByAddressId]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetCustomerAddresssByAddressId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllUser]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetAllUser]
GO
/****** Object:  StoredProcedure [dbo].[GetAllGroupTypes]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetAllGroupTypes]
GO
/****** Object:  StoredProcedure [dbo].[GetAllDocumentTypes]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetAllDocumentTypes]
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactTypes]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetAllContactTypes]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressTypes]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[GetAllAddressTypes]
GO
/****** Object:  StoredProcedure [dbo].[CheckDocumentsExistOrNotForSupplier]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[CheckDocumentsExistOrNotForSupplier]
GO
/****** Object:  StoredProcedure [dbo].[CheckDocumentsExistOrNot]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[CheckDocumentsExistOrNot]
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierDocuments]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddSupplierDocuments]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddEditSupplierBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddEditContactForCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactEmail]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddEditContactEmail]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContact]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddEditContact]
GO
/****** Object:  StoredProcedure [dbo].[AddDeliveryMethods]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddDeliveryMethods]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerDocuments]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddCustomerDocuments]
GO
/****** Object:  StoredProcedure [dbo].[AddAddressForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
DROP PROCEDURE [dbo].[AddAddressForCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddAddressForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddAddressForCustomer]          
@CustomerId int,        
@AddressTypeId SMALLINT,        
@AddressId INT,    
@IsPreferredBilling bit,    
@IsPreferredShipping bit,   
@CreatedBy SMALLINT             
AS          
BEGIN          
 SET NOCOUNT ON;          
BEGIN TRY                        
   DECLARE @keyId AS INT            
   

    IF @IsPreferredShipping = 1
    BEGIN
        UPDATE [dbo].[L_CustomerAddresses]
        SET IsPreferredShipping = 0
        WHERE CustomerId = @CustomerId AND AddressTypeId = @AddressTypeId;
    END
            
    IF @IsPreferredBilling = 1
    BEGIN
        UPDATE [dbo].[L_CustomerAddresses]
        SET IsPreferredBilling = 0
        WHERE CustomerId = @CustomerId AND AddressTypeId = @AddressTypeId;
    END  
       
   INSERT INTO [dbo].[L_CustomerAddresses]       
  (       
   CustomerId,    
   AddressId,    
   AddressTypeId,    
   IsPreferredBilling,    
   IsPreferredShipping,    
   StatusId,      
   CreatedBy,          
   CreatedAt         
  )          
  VALUES        
  (      
   @CustomerId,    
   @AddressId,    
   @AddressTypeId,    
   @IsPreferredBilling,    
   @IsPreferredShipping,    
   1,      
   @CreatedBy,          
   GETDATE()          
  )          
          
   SET  @keyId = SCOPE_IDENTITY()                  
          
   SELECT @keyId as KeyValue,                   
   'Customer address linkup Added' as ErrorMessage                 
      
END TRY                      
BEGIN CATCH                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                    
 RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                    
END CATCH                    
END 
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerDocuments]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddCustomerDocuments      
CREATE PROCEDURE [dbo].[AddCustomerDocuments]                          
@Name VARCHAR(75),                          
@DocumentTypeId TINYINT,                          
@CustomerId INT,                          
@Attachment NVARCHAR(255),                     
@CreatedBy SMALLINT                                
                                
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                          
    DECLARE @keyId AS INT                                  
                     
                  
        IF EXISTS (SELECT 1 FROM [dbo].[CustomerDocuments] WHERE DocumentTypeId = @DocumentTypeId AND CustomerId=@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL)                           
            BEGIN                      
                SELECT CAST(0 AS INT) as KeyValue,                                                          
                'Document exists on this type, Only one document per type' as ErrorMessage                             
            END           
        ELSE IF EXISTS (SELECT 1 FROM [dbo].[CustomerDocuments] WHERE Name = @Name AND CustomerId=@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL)                      
             BEGIN                   
                SELECT CAST(0 AS INT) as KeyValue,                                        
                'Document name already exists' as ErrorMessage                            
              END                     
       ELSE                    
            BEGIN                    
                INSERT INTO [dbo].[CustomerDocuments]                               
                (                          
                    Name,            
                    DocumentTypeId,            
                    CustomerId,            
                    Attachment,            
                    StatusId,                        
                    CreatedBy,                                
                    CreatedAt                               
                )                                
                VALUES                              
                (                          
                    @Name,            
                    @DocumentTypeId,            
                    @CustomerId,            
                    @Attachment,              
                    1,                  
                    @CreatedBy,                                
                    GETDATE()                                
                )                                
                                
                SET  @keyId = SCOPE_IDENTITY()                                        
                                
                SELECT @keyId as KeyValue,                                         
                'Document Added' as ErrorMessage                                   
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
/****** Object:  StoredProcedure [dbo].[AddCustomersBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
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
               
        IF EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE Name = @Name)                     
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
            'Customers Information Added' as ErrorMessage                             
            END              
            IF @keyId > 0                    
            BEGIN                    
            INSERT INTO [dbo].[Emails](EmailAddress,OwnerId,OwnerTypeId,CreatedBy,CreatedAt)                    
            VALUES(@EmailAddress,@keyId,1,@CreatedBy,GETDATE())                    
                    
                     
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
/****** Object:  StoredProcedure [dbo].[AddDeliveryMethods]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddDeliveryMethods]                
@CustomerId INT,        
@DeliveryMethodId TINYINT,        
@Charge DECIMAL,        
@IsPrimary BIT,              
@CreatedBy SMALLINT                        
AS                
BEGIN                
 SET NOCOUNT ON;         
 DECLARE @keyId AS INT  
 DECLARE @IsForInternational BIT   
  
 SELECT @IsForInternational = IsForInternational FROM [dbo].[DeliveryMethods]WHERE DeliveryMethodId = @DeliveryMethodId; 
                          
BEGIN TRY                          
    IF EXISTS (SELECT DeliveryMethodId FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] WHERE DeliveryMethodId=@DeliveryMethodId  AND CustomerId=@CustomerId And DeletedBy is null And DeletedAt is null )                
    BEGIN                
        SELECT CAST(0 AS TINYINT) as KeyValue,                         
        'Delivery Methods EXISTS' as ErrorMessage                   
    END                
    ELSE                
    BEGIN        
        IF @IsPrimary =1          
        BEGIN          
            UPDATE [dbo].[L_CustomCharge_CustomerDeliveryMethods] SET          
            IsPrimary=0          
            WHERE CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL   
            AND DeliveryMethodId IN (SELECT DeliveryMethodId FROM [dbo].[DeliveryMethods]WHERE IsForInternational = @IsForInternational)     
        END        
         
        INSERT INTO [dbo].[L_CustomCharge_CustomerDeliveryMethods]                
        (             
            CustomerId,        
            DeliveryMethodId,        
            Charge,        
            IsPrimary,            
            CreatedBy,                
            CreatedAt               
        )                
        VALUES              
        (           
            @CustomerId,        
            @DeliveryMethodId,        
            @Charge,             
            @IsPrimary,            
            @CreatedBy,                
            GETDATE()                
        )                
                
        SET  @keyId = SCOPE_IDENTITY()                        
                
        SELECT @keyId as KeyValue,                         
        'Delivery Methods Added' as ErrorMessage                   
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
/****** Object:  StoredProcedure [dbo].[AddEditContact]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--AddEditContact 1046,3,'amit','sonigara',109,0,0,0              
              
CREATE PROCEDURE [dbo].[AddEditContact]                            
    @CustomerId INT,                    
    @ContactTypeId SMALLINT,                    
    @FirstName VARCHAR(50),                    
    @LastName VARCHAR(50),                    
    @CreatedBy SMALLINT,                        
    @ContactId INT = 0,            
    @CustomerContactId INT,          
    @IsPrimary INT                          
AS                            
BEGIN                            
    SET NOCOUNT ON;                            
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                
        DECLARE @Action VARCHAR(50);                
                
        IF @ContactId > 0                
        BEGIN                
            IF EXISTS (SELECT 1 FROM [dbo].[Contacts] WHERE ContactId = @ContactId)                
            BEGIN         
                IF EXISTS (SELECT 1 FROM [dbo].[Contacts] WHERE ContactId = @ContactId AND (FirstName != @FirstName OR LastName != @LastName))        
                BEGIN               
                    UPDATE [dbo].[Contacts]                
                    SET                
                        FirstName = @FirstName,                
                        LastName = @LastName,              
                        UpdatedBy = @CreatedBy,                
                        UpdatedAt = GETDATE()                
                    WHERE                
                        ContactId = @ContactId;                
                            
                    IF @CustomerContactId > 0      
                    BEGIN      
                        IF EXISTS (SELECT 1 FROM [dbo].[L_CustomerContacts]       
                                   WHERE CustomerContactId = @CustomerContactId       
                                   AND ContactTypeId != @ContactTypeId)      
                        BEGIN      
                            UPDATE [dbo].[L_CustomerContacts]      
                            SET ContactTypeId = @ContactTypeId      
                            WHERE CustomerContactId = @CustomerContactId;      
                        END    
                            UPDATE [dbo].[Contacts] SET UpdatedBy = @CreatedBy,UpdatedAt = GETDATE()WHERE                
                            ContactId = @ContactId;                  
                    END             
              
                    SELECT @ContactId as KeyValue,                    
                    'Contact details updated' AS ErrorMessage;                 
                END        
                ELSE                
                BEGIN                
                    SELECT @ContactId as KeyValue,                    
                    'Contact details updated' AS ErrorMessage;        
                END         
            END        
            ELSE                
            BEGIN                
                SELECT CAST(0 AS INT) AS KeyValue,                   
                'NO RECORD FOUND' AS ErrorMessage;        
            END              
        END                
        ELSE                                  
            BEGIN                  
                INSERT INTO [dbo].[Contacts]                            
                (              
                    FirstName,                    
                    LastName,                    
                    CreatedBy,                            
                    CreatedAt                           
                )          
                VALUES                          
                (                        
                    @FirstName,                    
                    @LastName,                    
                    @CreatedBy,                            
                    GETDATE()                            
                );                            
                     
                SET @keyId = SCOPE_IDENTITY();                
            
                SELECT @keyId as KeyValue,                                     
               'Contact details added' as ErrorMessage             
                               
            END                  
            
            
            --IF @keyId > 0                              
            --BEGIN                
            --    INSERT INTO [dbo].[L_CustomerContacts](CustomerId, ContactId, ContactTypeId, StatusId,IsPrimary,CreatedBy, CreatedAt)                              
            --    VALUES(@CustomerId, @keyId, @ContactTypeId, 1,@IsPrimary,@CreatedBy, GETDATE());                
            --END               
                
    END TRY                                    
    BEGIN CATCH                                      
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                      
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                                      
        DECLARE @ErrorState INT = ERROR_STATE();                                      
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                      
    END CATCH;                
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactEmail]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                  
                  
                  
CREATE PROCEDURE [dbo].[AddEditContactEmail]                  
    @EmailList EmailTypeTable READONLY,                  
    @ContactId INT              
AS                  
BEGIN                  
    SET NOCOUNT ON;                  
                  
    -- Create a temporary table to hold the emails                  
    CREATE TABLE #TempEmails (                  
        EmailId INT,                  
        EmailAddress NVARCHAR(255),      
        IsPrimary BIT,      
        OwnerTypeId TINYINT,                
        CreatedBy SMALLINT                  
    );                  
                  
    -- Insert data from the EmailList into the temporary table                  
    INSERT INTO #TempEmails (EmailId, EmailAddress,IsPrimary,OwnerTypeId,CreatedBy)                  
    SELECT EmailId, EmailAddress,IsPrimary,OwnerTypeId,CreatedBy                  
    FROM @EmailList;                  
                  
    BEGIN TRY                  
        -- Update existing email addresses                  
        UPDATE e                  
        SET e.EmailAddress = t.EmailAddress,      
            e.IsPrimary=t.IsPrimary,                  
            e.UpdatedAt = GETDATE(),                  
            e.UpdatedBy = t.CreatedBy                  
        FROM [dbo].[Emails] e                  
        INNER JOIN #TempEmails t ON e.EmailId = t.EmailId                  
        WHERE e.OwnerId = @ContactId AND e.OwnerTypeId = t.OwnerTypeId AND DeletedAt IS NULL AND DeletedBy IS NULL        
        AND e.EmailAddress <> t.EmailAddress OR e.IsPrimary<>t.IsPrimary;                    
                  
        -- Insert new email addresses                  
        INSERT INTO [dbo].[Emails] (EmailAddress,IsPrimary, OwnerId, OwnerTypeId, CreatedAt, CreatedBy)                  
        SELECT t.EmailAddress,t.IsPrimary,@ContactId, t.OwnerTypeId, GETDATE(), t.CreatedBy                  
        FROM #TempEmails t                  
        LEFT JOIN [dbo].[Emails] e                  
        ON e.EmailId = t.EmailId                  
        AND e.OwnerId = @ContactId                  
        AND e.OwnerTypeId = t.OwnerTypeId                  
        WHERE e.EmailAddress IS NULL;                  
                  
    END TRY                  
    BEGIN CATCH                  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                  
        DECLARE @ErrorState INT = ERROR_STATE();                  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                  
    END CATCH                  
                  
    -- Drop the temporary table                  
    DROP TABLE #TempEmails;                  
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditContactForCustomer]    
@CustomerContactId INT,    
@CustomerId INT,            
@ContactId INT,            
@ContactTypeId SMALLINT,    
@IsPrimary BIT,        
@CreatedBy SMALLINT                 
AS              
BEGIN              
 SET NOCOUNT ON;              
BEGIN TRY                            
   IF @CustomerContactId > 0    
   BEGIN    
        
		IF @IsPrimary =1          
        BEGIN          
            UPDATE [dbo].[L_CustomerContacts] SET          
				IsPrimary=0
            WHERE CustomerId = @CustomerId AND ContactTypeId=@ContactTypeId AND CustomerContactId!=@CustomerContactId
        END

        IF EXISTS (SELECT 1 FROM [dbo].[L_CustomerContacts]  WHERE CustomerContactId = @CustomerContactId           
        AND ( ContactTypeId != @ContactTypeId OR IsPrimary != @IsPrimary))               
		BEGIN     
           UPDATE [dbo].[L_CustomerContacts]    
           SET    
               ContactTypeId = @ContactTypeId,    
               IsPrimary = @IsPrimary    
           WHERE    
               CustomerContactId = @CustomerContactId    
  
            UPDATE [dbo].[Contacts]   
            SET    
                [UpdatedBy]=@CreatedBy,  
                [UpdatedAt]=GETDATE()  
            WHERE    
                ContactId = @ContactId     
  
           SELECT @CustomerContactId AS KeyValue,    
           'Customer contact updated' AS Message;    
      END          
      
   END    
   ELSE    
   BEGIN    
       -- Insert new contact    
       DECLARE @keyId AS INT;    
           
       INSERT INTO [dbo].[L_CustomerContacts]    
       (    
           CustomerId,    
           ContactId,    
           ContactTypeId,    
           IsPrimary,    
           StatusId,    
           CreatedBy,    
           CreatedAt    
       )              
       VALUES            
       (    
           @CustomerId,    
           @ContactId,    
           @ContactTypeId,    
           @IsPrimary,    
           1,    
           @CreatedBy,    
           GETDATE()    
       );    
           
       SET @keyId = SCOPE_IDENTITY();    
           
       SELECT @keyId AS KeyValue,    
       'Customer contact added' AS Message;    
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
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
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
                    'Supplier Information Updated' AS ErrorMessage;    
                
                 UPDATE [dbo].[Emails]        
                 SET EmailAddress = @EmailAddress,        
                 UpdatedBy = @CreatedBy,        
                 UpdatedAt = GETDATE()        
                 WHERE OwnerId = @SupplierId AND OwnerTypeId = 2;    
                

               /* UPDATE [dbo].[SupplierNotes] SET    
                Note=@Note,     
                UpdatedBy=@CreatedBy,    
                UpdatedAt=GETDATE()                    
                WHERE SupplierId=@SupplierId    */
            END    
        END    
        ELSE    
        BEGIN    
            BEGIN   
                IF EXISTS (SELECT 1 FROM [dbo].[Suppliers]   WHERE Name = @Name AND DeletedAt IS NULL AND DeletedBy IS NULL)                   
                BEGIN              
                 SELECT CAST(0 AS INT) as KeyValue,                                                  
                    'Supplier '+ @Name + ' already exists.' as ErrorMessage                   
                END              
                ELSE IF EXISTS (SELECT 1 FROM [dbo].[Suppliers] WHERE TaxId = @TaxId AND Name = @Name) OR   
                EXISTS (SELECT 1 FROM [dbo].[Suppliers] WHERE TaxId = @TaxId)                
                BEGIN             
                    SELECT CAST(0 AS INT) as KeyValue,                                  
                    'Suppliers with ' + @TaxId + '  already exists.' as ErrorMessage                
                END                
                  
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
                          
                SELECT @keyId as KeyValue,                                   
                'Supplier Information Added' as ErrorMessage;                             
            END;              
                          
            IF @keyId > 0                    
            BEGIN  
                INSERT INTO [dbo].[Emails](EmailAddress,OwnerId,OwnerTypeId,CreatedBy,CreatedAt)                
                VALUES(@EmailAddress,@keyId,2,@CreatedBy,GETDATE())                    
                
                INSERT INTO [dbo].[SupplierNotes](Note, SupplierId, CreatedBy, CreatedAt)                    
                VALUES(@Note, @keyId, @CreatedBy, GETDATE());                    
            END;    
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
/****** Object:  StoredProcedure [dbo].[AddSupplierDocuments]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[AddSupplierDocuments]   
@Name VARCHAR(75),                          
@DocumentTypeId TINYINT,                          
@SupplierId INT,                          
@Attachment NVARCHAR(255),                     
@CreatedBy SMALLINT                                
                                
AS                                
BEGIN                                
 SET NOCOUNT ON;                                
BEGIN TRY                                          
    DECLARE @keyId AS INT                                  
                     
                  
        IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE DocumentTypeId = @DocumentTypeId and SupplierId=@SupplierId AND DeletedAt IS NULL AND DeletedBy IS NULL)                           
            BEGIN                      
                SELECT CAST(0 AS INT) as KeyValue,                                                          
                'Document exists on this type, Only one document per type' as ErrorMessage                             
            END           
        ELSE IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE Name = @Name AND SupplierId=@SupplierId AND DeletedAt IS NULL AND DeletedBy IS NULL)                      
             BEGIN                   
                SELECT CAST(0 AS INT) as KeyValue,                                        
                'Document name already exists' as ErrorMessage                            
              END                     
       ELSE                    
            BEGIN                    
                INSERT INTO [dbo].[SupplierDocuments]                               
                (                          
                    Name,            
                    DocumentTypeId,            
                    SupplierId,            
                    Attachment,            
                    StatusId,                        
                    CreatedBy,                                
                    CreatedAt                               
                )                                
                VALUES                              
                (                          
                    @Name,            
                    @DocumentTypeId,            
                    @SupplierId,            
                    @Attachment,              
                    1,                  
                    @CreatedBy,                                
                    GETDATE()                                
                )                                
                                
                SET  @keyId = SCOPE_IDENTITY()                                        
                                
                SELECT @keyId as KeyValue,                                         
                'Document Added' as ErrorMessage                                   
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
/****** Object:  StoredProcedure [dbo].[CheckDocumentsExistOrNot]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CheckDocumentsExistOrNot]  
    @DocumentTypeId INT,  
    @CustomerId INT,  
    @Name NVARCHAR(255)  
AS  
BEGIN  
    SET NOCOUNT ON;  
  
    -- Check if a document of the specified type exists for the customer  
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerDocuments] WHERE DocumentTypeId = @DocumentTypeId AND CustomerId = @CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL)  
    BEGIN  
        SELECT CAST(0 AS INT) AS KeyValue,  
        'Document exists on this type, Only one document per type' AS ErrorMessage;  
        RETURN;  
    END  
  
    -- Check if a document with the specified name exists for the customer  
    IF EXISTS (SELECT 1 FROM [dbo].[CustomerDocuments] WHERE Name = @Name AND CustomerId = @CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL)  
    BEGIN  
        SELECT CAST(0 AS INT) AS KeyValue,  
        'Document name already exists' AS ErrorMessage;  
        RETURN;  
    END  
  
    -- If neither check returns true, document does not exist  
    SELECT CAST(1 AS INT) AS KeyValue,  
    'Document does not exist' AS ErrorMessage;  
END  
GO
/****** Object:  StoredProcedure [dbo].[CheckDocumentsExistOrNotForSupplier]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--CheckDocumentsExistOrNotForSupplier 3,2020,'test10'
CREATE PROCEDURE [dbo].[CheckDocumentsExistOrNotForSupplier]    
    @DocumentTypeId INT,    
    @SupplierId INT,    
    @Name NVARCHAR(255)    
AS    
BEGIN    
    SET NOCOUNT ON;    
    
    -- Check if a document of the specified type exists for the customer    
    IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE DocumentTypeId = @DocumentTypeId AND SupplierId = @SupplierId AND DeletedAt IS NULL AND DeletedBy IS NULL)    
    BEGIN    
        SELECT CAST(0 AS INT) AS KeyValue,    
        'Document exists on this type, Only one document per type' AS ErrorMessage;    
        RETURN;    
    END    
    
    -- Check if a document with the specified name exists for the customer    
    IF EXISTS (SELECT 1 FROM [dbo].[SupplierDocuments] WHERE Name = @Name AND SupplierId = @SupplierId AND DeletedAt IS NULL AND DeletedBy IS NULL)    
    BEGIN    
        SELECT CAST(0 AS INT) AS KeyValue,    
        'Document name already exists' AS ErrorMessage;    
        RETURN;    
    END    
    
    -- If neither check returns true, document does not exist    
    SELECT CAST(1 AS INT) AS KeyValue,    
    'Document does not exist' AS ErrorMessage;    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressTypes]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllAddressTypes       
CREATE PROCEDURE [dbo].[GetAllAddressTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
[AddressTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM [dbo].[AddressTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactTypes]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllContactTypes       
CREATE PROCEDURE [dbo].[GetAllContactTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
[ContactTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM [dbo].[ContactTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllDocumentTypes]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllDocumentTypes       
CREATE PROCEDURE [dbo].[GetAllDocumentTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT
[DocumentTypeId],
[Type],
[IsForCustomers],
[IsForSuppliers]
FROM  [dbo].[DocumentTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllGroupTypes]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
      
-- GetAllGroupTypes       
CREATE PROCEDURE [dbo].[GetAllGroupTypes]                  
                 
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
BEGIN TRY                          
        
SELECT                  
 [GroupTypeId],    
 [Type],
 [IsForCustomers],
 [IsForSuppliers]
FROM  [dbo].[GroupTypes]
                                    
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                   
                  
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllUser]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================      
-- Author:  <Author,,Name>      
-- Create date: <Create Date,,>      
-- Description: <Description,,>      
-- =============================================      
CREATE PROCEDURE [dbo].[GetAllUser]      
       
                       
AS                        
BEGIN                        
 SET NOCOUNT ON;                        
BEGIN TRY                                
              
SELECT      
 U.UserId,      
 CONCAT(FirstName, ' ', LastName) AS FullName,  
 UR.RoleId,  
 R.RoleName  
 FROM Users U  
 RIGHT JOIN L_UserRoles UR ON  U.UserId = UR.UserId AND UR.DeletedAt IS NULL AND UR.DeletedBy IS NULL
 LEFT JOIN Roles R ON R.RoleId = UR.RoleId  
 WHERE U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND IsActive=1 
  
                                          
END TRY                                
BEGIN CATCH                                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                
END CATCH                         
                        
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAddresssByAddressId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetCustomerAddresssByAddressId 2202          
CREATE PROCEDURE [dbo].[GetCustomerAddresssByAddressId]            
@AddressId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        CA.CustomerAddressId,        
        A.[AddressId],        
        ATS.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,        
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode],    
        CA.IsPreferredShipping,    
        CA.IsPreferredBilling        
    FROM [dbo].[Addresses] A             
    left JOIN [dbo].[L_CustomerAddresses] CA ON CA.AddressId = A.AddressId        
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = CA.AddressTypeId   
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  A.AddressId=@AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerAuditHistoryByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
--GetCustomerAuditHistoryByCustomerId 1,25,500,1040,'Note Added,Contact Updated','',NULL,NULL
CREATE PROCEDURE [dbo].[GetCustomerAuditHistoryByCustomerId]  
	@PageNumber INT = 1,            
	@PageSize INT = 25,            
--	@SearchText NVARCHAR(50) = '0',                     
	@TotalCount INT OUTPUT,
	@CustomerId INT,
    @EventName varchar(MAX),
    @UserId Varchar(255),
    @ToDate datetime,
    @FromDate datetime                 
AS                    
BEGIN                    
 SET NOCOUNT ON;                    
 BEGIN TRY            
	DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;            
    
    DECLARE @EventNameTable TABLE (EventName VARCHAR(MAX));
    DECLARE @UserIdTable TABLE (UserId VARCHAR(255));

    --Insert split values into table variables
    INSERT INTO @EventNameTable (EventName)
    SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@EventName, ',');
        
    INSERT INTO @UserIdTable (UserId)
    SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@UserId, ',');

	 -- Get the total count            
    SELECT @TotalCount = COUNT(*)            
    FROM [dbo].[CustomerAuditHistory] CAH
    LEFT JOIN Users U ON CAH.ChangedBy = U.UserId    
    WHERE CAH.CustomerId = @CustomerId 
	AND ((@EventName = '' OR CAH.EventName IN (SELECT EventName FROM @EventNameTable))
    AND (@UserId = '' OR CAH.ChangedBy IN (SELECT UserId FROM @UserIdTable))
    AND (CONVERT(DATE, CAH.ChangedAt) BETWEEN @FromDate AND @ToDate OR @FromDate IS NULL OR @ToDate IS NULL))  

    -- Select the data with the corrected WHERE clause 
    SELECT                    
            CAH.CustomerAuditHistoryId,    
            CAH.CustomerId,    
            CAH.EventName,    
            CAH.ChangedBy,    
            CAH.ChangedAt,    
            CAH.Description,  
            U.FirstName + ' ' + U.LastName AS Name,  
            CAH.EventStatus  
        FROM    
            [dbo].[CustomerAuditHistory] CAH  
        LEFT JOIN   
            Users U ON CAH.ChangedBy = U.UserId 
        WHERE   
        CAH.CustomerId = @CustomerId
        AND ((@EventName = '' OR CAH.EventName IN (SELECT EventName FROM @EventNameTable))
        AND (@UserId = '' OR CAH.ChangedBy IN (SELECT UserId FROM @UserIdTable))
        AND (CONVERT(DATE, CAH.ChangedAt) BETWEEN @FromDate AND @ToDate OR @FromDate IS NULL OR @ToDate IS NULL)) 
        ORDER BY CustomerAuditHistoryId DESC 
		OFFSET @Offset ROWS            
    FETCH NEXT @PageSize ROWS ONLY;  
    END TRY                                    
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                     
                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerContactByContactId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetCustomerContactByContactId 2169    
CREATE PROCEDURE [dbo].[GetCustomerContactByContactId]                      
@ContactId int                       
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT
            LCC.CustomerContactId,
            LCC.CustomerId,
            LCC.ContactId,
            LCC.ContactTypeId,
            CT.Type AS ContactType,
            CON.FirstName,
            CON.LastName,
            LCC.IsPrimary
        FROM
            [dbo].[Contacts] CON
            LEFT JOIN [dbo].[L_CustomerContacts] LCC ON CON.ContactId = LCC.ContactId
            LEFT JOIN [dbo].[ContactTypes] CT ON LCC.ContactTypeId = CT.ContactTypeId
        WHERE
            CON.ContactId = @ContactId
            AND CON.DeletedBy IS NULL
            AND CON.DeletedAt IS NULL
        ORDER BY
            LCC.ContactId DESC;          
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
            
--GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId 15           
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
        CDC.CustomerId  
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
/****** Object:  StoredProcedure [dbo].[GetCustomerDeliveryMethodByCustomerDeliveryMethodId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
--GetCustomerDeliveryMethodByCustomerDeliveryMethodId 121           
CREATE PROCEDURE [dbo].[GetCustomerDeliveryMethodByCustomerDeliveryMethodId]                
@CustomerDeliveryMethodId int                 
AS                
BEGIN                
 SET NOCOUNT ON;                
           
 BEGIN TRY                
    SELECT    
        CDM.CustomerDeliveryMethodId,    
        CDM.CustomerId,    
        CDM.DeliveryMethodId,  
        DM.IsForInternational,    
        DM.Name,      
        CDM.Charge,    
        CDM.IsPrimary    
    FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] CDM               
    left JOIN [dbo].[DeliveryMethods] DM ON DM.DeliveryMethodId= CDM.DeliveryMethodId    
    WHERE  CDM.CustomerDeliveryMethodId= @CustomerDeliveryMethodId AND CDM.DeletedBy IS NULL AND CDM.DeletedAt IS NULL            
    ORDER BY CDM.CustomerDeliveryMethodId DESC            
          
END TRY          
    BEGIN CATCH              
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()              
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()              
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)              
    END CATCH           
END     
    
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerNotesByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================    
-- Author:  <Author,,Name>    
-- Create date: <Create Date,,>    
-- Description: <Description,,>    
-- =============================================    
CREATE PROCEDURE [dbo].[GetCustomerNotesByCustomerId]    
 -- Add the parameters for the stored procedure here    
  @CustomerId int    
AS    
BEGIN    
  SET NOCOUNT ON;            
            
 SELECT    
  [CustomerNoteId],    
  [Note],    
  CASE  
 WHEN CN.[UpdatedAt] IS NULL AND CN.[UpdatedBy] IS NULL THEN CN.[CreatedAt]      
 ELSE CN.[UpdatedAt]     
 END AS NoteDate,    
  U.FirstName + ' ' + U.LastName AS FullName  
 FROM [dbo].[CustomerNotes]  CN  
 INNER JOIN Users U   
 ON (CN.[UpdatedAt] IS NULL AND CN.[UpdatedBy] IS NULL AND U.UserId = CN.[CreatedBy])  OR (CN.[UpdatedAt] IS NOT NULL AND CN.[UpdatedBy] IS NOT NULL AND U.UserId = CN.[UpdatedBy])  
 WHERE  CustomerId=@CustomerId    
ORDER BY CustomerNoteId DESC      
END


GO
/****** Object:  StoredProcedure [dbo].[GetCustomers]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
--GetCustomers 1,150,'ki','',500              
CREATE PROCEDURE [dbo].[GetCustomers]                    
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
       U.FirstName + ' ' + U.LastName AS ResponsibleUserName        
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
/****** Object:  StoredProcedure [dbo].[GetCustomersBasicInformationById]    Script Date: 09-07-2024 16:46:21 ******/
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
  U.FirstName + ' ' + U.LastName AS ResponsibleUserName    
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
/****** Object:  StoredProcedure [dbo].[GetCustomersDetailsByCutomerName]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetCustomersDetailsByCutomerName 'ki'            
CREATE PROCEDURE [dbo].[GetCustomersDetailsByCutomerName]                            
@CustomerName varchar(150)            
as                            
Begin                            
SET NOCOUNT ON;                            
BEGIN TRY                            
                            
 SELECT  
  C.CustomerId,                
  C.Name,                       
  GT.Type As GroupType,                                      
  CS.Name AS CountryName,               
  E.EmailAddress,                     
  C.TaxId,                         
  S.Status          
 FROM [dbo].[Customers] C               
 LEFT JOIN [dbo].[Emails] E ON C.CustomerId = E.OwnerId AND OwnerTypeId = 1          
 LEFT JOIN [dbo].[Countries] CS ON C.CountryId = CS.CountryId          
 LEFT JOIN [dbo].[GroupTypes] GT ON C.GroupTypeId = GT.GroupTypeId          
 LEFT JOIN [dbo].[Status] S ON S.StatusId = C.StatusId         
 WHERE C.Name LIKE '%'+@CustomerName+'%'            
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
/****** Object:  StoredProcedure [dbo].[GetEventNameAndUserNameByCustomerId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetEventNameAndUserNameByCustomerId 1020     
CREATE PROCEDURE [dbo].[GetEventNameAndUserNameByCustomerId]  
@CustomerId INT          
AS                            
BEGIN                            
 SET NOCOUNT ON;                            
BEGIN TRY                                    
                  
SELECT            
 CAH.EventName,
 CAH.ChangedBy As UserId,  
 CONCAT(FirstName, ' ', LastName) AS UserName  
 FROM CustomerAuditHistory CAH      
 INNER JOIN Users U ON U.UserId = CAH.ChangedBy      
 WHERE CAH.CustomerId=@CustomerId AND U.DeletedAt IS NULL AND U.DeletedBy IS NULL
 GROUP BY CAH.EventName, U.FirstName, U.LastName,CAH.ChangedBy
 ORDER BY MAX(CAH.CustomerAuditHistoryId) DESC;   
                                              
END TRY                                    
BEGIN CATCH                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                    
END CATCH                             
                            
END 
GO
/****** Object:  StoredProcedure [dbo].[GetEventNameAndUserNameBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetEventNameAndUserNameBySupplierId 2021     
CREATE PROCEDURE [dbo].[GetEventNameAndUserNameBySupplierId]  
@SupplierId INT          
AS                            
BEGIN                            
 SET NOCOUNT ON;                            
BEGIN TRY                                    
                  
SELECT               
 SAH.EventName,
 SAH.ChangedBy As UserId,  
 CONCAT(FirstName, ' ', LastName) AS UserName  
 FROM SupplierAuditHistory SAH      
 INNER JOIN Users U ON U.UserId = SAH.ChangedBy      
 WHERE SAH.SupplierId=@SupplierId AND U.DeletedAt IS NULL AND U.DeletedBy IS NULL      
GROUP BY SAH.EventName, U.FirstName, U.LastName,SAH.ChangedBy
ORDER BY MAX(SAH.SupplierAuditHistoryId) DESC;   
                                            
END TRY                                    
BEGIN CATCH                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                    
END CATCH                             
                            
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSupllierContactByContactId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
-- GetSupllierContactByContactId 2167    
CREATE PROCEDURE [dbo].[GetSupllierContactByContactId]                      
@ContactId int                       
AS                      
BEGIN                      
    SET NOCOUNT ON;    
        
    BEGIN TRY                       
         SELECT
            LSC.SupplierContactId,
            LSC.SupplierId,
            LSC.ContactId,
            LSC.ContactTypeId,
            CT.Type AS ContactType,
            CON.FirstName,
            CON.LastName,
            LSC.IsPrimary
        FROM
            [dbo].[Contacts] CON
            LEFT JOIN [dbo].[L_SupplierContacts] LSC ON CON.ContactId = LSC.ContactId
            LEFT JOIN [dbo].[ContactTypes] CT ON LSC.ContactTypeId = CT.ContactTypeId
        WHERE
            CON.ContactId = @ContactId
            AND CON.DeletedBy IS NULL
            AND CON.DeletedAt IS NULL
        ORDER BY
            LSC.ContactId DESC;          
    END TRY            
    BEGIN CATCH                
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()                
        DECLARE @ErrorState int = ERROR_STATE()                
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                
    END CATCH           
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAddresssByAddressId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
--GetSupplierAddresssByAddressId 2202          
CREATE PROCEDURE [dbo].[GetSupplierAddresssByAddressId]            
@AddressId int             
AS            
BEGIN            
 SET NOCOUNT ON;            
       
 BEGIN TRY            
    SELECT  
        SA.SupplierAddressId,        
        A.[AddressId],        
        ATS.[AddressTypeId],        
        ATS.[Type],        
        A.[AddressLine1],        
        A.[AddressLine2],        
        A.[AddressLine3],        
        A.[AddressLine4],        
        A.[AddressLine5],        
        A.[CountryId],        
        C.[Name] As CountryName,        
        A.[StateId],        
        S.[Name] As StateName,        
        A.[CityId],        
        CI.[Name] As CityName,        
        A.[ZipCode]
    FROM [dbo].[Addresses] A             
    left JOIN [dbo].[L_SupplierAddresses] SA ON SA.AddressId = A.AddressId        
    left JOIN [dbo].[AddressTypes] ATS ON ATS.AddressTypeId = SA.AddressTypeId   
    left JOIN [dbo].[Countries] C ON C.CountryId = A.CountryId        
    left JOIN [dbo].[States] S ON S.StateId= A.StateId        
    left JOIN [dbo].[Cities] CI ON CI.CityId = A.CityId        
    WHERE  A.AddressId=@AddressId AND A.DeletedBy IS NULL AND A.DeletedAt IS NULL        
    ORDER BY A.AddressId DESC        
      
END TRY      
    BEGIN CATCH          
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()          
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()          
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)          
    END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierAuditHistoryBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
CREATE PROCEDURE [dbo].[GetSupplierAuditHistoryBySupplierId]    
 @PageNumber INT = 1,                
 @PageSize INT = 25,                                   
 @TotalCount INT OUTPUT,    
 @SupplierId INT,
 @EventName varchar(MAX),
 @UserId Varchar(255),
 @ToDate datetime,
 @FromDate datetime       
AS     
BEGIN    
     
  SET NOCOUNT ON;    
  BEGIN TRY     
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;      
    DECLARE @EventNameTable TABLE (EventName VARCHAR(MAX));
    DECLARE @UserIdTable TABLE (UserId VARCHAR(255));

    --Insert split values into table variables
    INSERT INTO @EventNameTable (EventName)
    SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@EventName, ',');
        
    INSERT INTO @UserIdTable (UserId)
    SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@UserId, ',');
   
     SELECT @TotalCount = COUNT(*)      
     FROM [dbo].SupplierAuditHistory SAH    
     LEFT JOIN Users U ON SAH.ChangedBy = U.UserId          
     WHERE  (SupplierId = 0 OR SAH .SupplierId  = @SupplierId )    
     AND ((@EventName = '' OR SAH.EventName IN (SELECT EventName FROM @EventNameTable))
     AND (@UserId = '' OR SAH.ChangedBy IN (SELECT UserId FROM @UserIdTable))
     AND (CONVERT(DATE, SAH.ChangedAt) BETWEEN @FromDate AND @ToDate OR @FromDate IS NULL OR @ToDate IS NULL))                            
  
    SELECT                        
        SAH.SupplierAuditHistoryId,        
        SAH.SupplierId ,        
        SAH.EventName,        
        SAH.ChangedBy,        
        SAH.ChangedAt,        
        SAH.Description,      
        U.FirstName + ' ' + U.LastName AS Name,      
        SAH.EventStatus      
    FROM        
        [dbo].[SupplierAuditHistory] SAH      
    LEFT JOIN       
        Users U ON SAH.ChangedBy = U.UserId     
    WHERE SAH .SupplierId  = @SupplierId
    AND ((@EventName = '' OR SAH.EventName IN (SELECT EventName FROM @EventNameTable))
    AND (@UserId = '' OR SAH.ChangedBy IN (SELECT UserId FROM @UserIdTable))
    AND (CONVERT(DATE, SAH.ChangedAt) BETWEEN @FromDate AND @ToDate OR @FromDate IS NULL OR @ToDate IS NULL))      
    ORDER BY SupplierAuditHistoryId DESC        
    OFFSET @Offset ROWS                
    FETCH NEXT @PageSize ROWS ONLY;      
    END TRY                                        
BEGIN CATCH                                
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                
END CATCH       
     
END    
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierBasicInformationById]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetSupplierBasicInformationById 2020           
CREATE PROCEDURE [dbo].[GetSupplierBasicInformationById]                            
 @SupplierId int            
as                            
Begin                            
SET NOCOUNT ON;                            
BEGIN TRY                            
                            
 SELECT    
  SP.SupplierId,                
  SP.Name,    
  SP.DbaName,    
  SP.SupplierTypeId,    
  SPT.Type AS SupplierType,                 
  SP.GroupTypeId,          
  GT.Type As GroupType,                  
  SP.TerritoryId,          
  T.Territory,                  
  SP.CountryId,          
  CS.Name AS CountryName,               
  SP.Website,            
  SP.TaxId,                  
  SP.StatusId,  
  S.Status,  
  E.EmailAddress,  
  SP.ResponsibleUserId,  
  U.FirstName + ' ' + U.LastName AS ResponsibleUserName
  
 FROM [dbo].[Suppliers] SP      
 LEFT JOIN [dbo].[SupplierTypes] SPT ON SPT.SupplierTypeId = SP.SupplierTypeId   
 LEFT JOIN [dbo].[Emails] E ON SP.SupplierId = E.OwnerId AND OwnerTypeId = 2           
 LEFT JOIN [dbo].[Countries] CS ON CS.CountryId = SP.CountryId          
 LEFT JOIN [dbo].[GroupTypes] GT ON GT.GroupTypeId = SP.GroupTypeId          
 LEFT JOIN [dbo].[Territories] T ON T.TerritoryId = SP.TerritoryId      
 LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId      
 LEFT JOIN Users U ON U.UserId =SP.ResponsibleUserId  
 WHERE SP.SupplierId = @SupplierId    
 AND SP.DeletedBy IS NULL             
 AND SP.DeletedAt IS NULL                                            
END TRY                            
BEGIN CATCH                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                            
END CATCH                            
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierDetailsBySupplierName]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetSupplierDetailsBySupplierName 'ja'          
CREATE PROCEDURE [dbo].[GetSupplierDetailsBySupplierName]                          
@SupplierName varchar(150)          
as                          
Begin                          
SET NOCOUNT ON;                          
BEGIN TRY                          
                          
 SELECT
  S.SupplierId,              
  S.Name,                     
  GT.Type As GroupType,                                    
  CS.Name AS CountryName,             
  E.EmailAddress,                   
  S.TaxId,                       
  ST.Status        
 FROM [dbo].[Suppliers] S             
 LEFT JOIN [dbo].[Emails] E ON S.SupplierId = E.OwnerId AND OwnerTypeId = 2        
 LEFT JOIN [dbo].[Countries] CS ON S.CountryId = CS.CountryId        
 LEFT JOIN [dbo].[GroupTypes] GT ON S.GroupTypeId = GT.GroupTypeId        
 LEFT JOIN [dbo].[Status] ST ON ST.StatusId = S.StatusId        
 WHERE S.Name LIKE '%'+@SupplierName+'%'          
 AND S.DeletedBy IS NULL           
 AND S.DeletedAt IS NULL                                          
END TRY                          
BEGIN CATCH                          
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                          
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                          
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                          
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                          
END CATCH                          
END 

GO
/****** Object:  StoredProcedure [dbo].[GetSupplierNotesBySupplierId]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
CREATE PROCEDURE [dbo].[GetSupplierNotesBySupplierId]  
 -- Add the parameters for the stored procedure here  
   @SupplierId int    
AS  
BEGIN  
   
 SET NOCOUNT ON;  
  SELECT   
 [SupplierNoteId],  
  [Note],    
  CASE  
 WHEN SN.[UpdatedAt] IS NULL AND SN.[UpdatedBy] IS NULL THEN SN.[CreatedAt]      
 ELSE SN.[UpdatedAt]     
 END AS NoteDate,    
  U.FirstName + ' ' + U.LastName AS FullName  
 FROM [dbo].[SupplierNotes] SN  
 INNER JOIN Users U   
 ON (SN.[UpdatedAt] IS NULL AND SN.[UpdatedBy] IS NULL AND U.UserId = SN.[CreatedBy])  OR (SN.[UpdatedAt] IS NOT NULL AND SN.[UpdatedBy] IS NOT NULL AND U.UserId =SN.[UpdatedBy])  
 WHERE SupplierId=@SupplierId 
ORDER BY SupplierNoteId DESC 
END  
  
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                
--GetSuppliers 1,50,'526341','1,2,3,4,5,6',500                
CREATE PROCEDURE [dbo].[GetSuppliers]                      
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
    FROM [dbo].[Suppliers] SP                      
    LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId      
    LEFT JOIN [dbo].[Emails] E ON SP.SupplierId= E.OwnerId AND E.OwnerTypeId=2              
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL         
    WHERE                      
        (@StatusId = '' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))      
        AND (SP.Name LIKE '%' + @SearchText + '%' OR @SearchText IS NULL           
        OR SP.TaxId = @SearchText OR @SearchText IS NULL         
        OR E.EmailAddress LIKE '%' + @SearchText + '%' OR @SearchText IS NULL)                        
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
        (@StatusId = '' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))      
        AND (SP.Name LIKE '%' + @SearchText + '%' OR @SearchText IS NULL          
        OR SP.TaxId = @SearchText OR @SearchText IS NULL  
        OR E.EmailAddress LIKE '%' + @SearchText + '%' OR @SearchText IS NULL)                     
        AND SP.DeletedBy IS NULL                 
        AND SP.DeletedAt IS NULL                     
    ORDER BY SP.SupplierId DESC                      
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
/****** Object:  StoredProcedure [dbo].[GetUserRoles]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetUserRoles 3  
CREATE PROCEDURE [dbo].[GetUserRoles]       
@UserId SMALLINT
AS      
BEGIN      
 -- SET NOCOUNT ON added to prevent extra result sets from      
 -- interfering with SELECT statements.      
 SET NOCOUNT ON;      
  
 BEGIN TRY        
 SELECT      
   R.RoleId,
   R.RoleName
 FROM L_UserRoles UR
 LEFT JOIN Roles R ON R.RoleId = UR.RoleId
 WHERE UR.UserId = @UserId
 AND UR.[DeletedBy] IS NULL AND UR.DeletedAt IS NULL
 AND R.[DeletedBy] IS NULL AND R.DeletedAt IS NULL
        
 END TRY        
 BEGIN CATCH        
  DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()        
  DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()        
  DECLARE @ErrorState nvarchar(max) = ERROR_STATE()        
  RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)        
 END CATCH       
END 
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddressForCustomer]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAddressForCustomer]      
@CustomerAddressId INT,          
@CustomerId INT,          
@AddressTypeId SMALLINT,          
@AddressId INT,          
@IsPreferredBilling BIT,          
@IsPreferredShipping BIT,          
@UpdatedBy SMALLINT          
AS          
BEGIN          
    SET NOCOUNT ON;          
    BEGIN TRY          
          
        IF EXISTS (SELECT 1 FROM [dbo].[L_CustomerAddresses] WHERE CustomerAddressId = @CustomerAddressId AND CustomerId = @CustomerId AND AddressId = @AddressId AND (AddressTypeId != @AddressTypeId OR IsPreferredBilling != @IsPreferredBilling OR IsPreferredShipping != @IsPreferredShipping))  
        BEGIN
            
            IF @IsPreferredShipping = 1
            BEGIN
                UPDATE [dbo].[L_CustomerAddresses]
                SET IsPreferredShipping = 0
                WHERE CustomerId = @CustomerId AND AddressTypeId = @AddressTypeId AND CustomerAddressId != @CustomerAddressId;
            END
            
            IF @IsPreferredBilling = 1
            BEGIN
                UPDATE [dbo].[L_CustomerAddresses]
                SET IsPreferredBilling = 0
                WHERE CustomerId = @CustomerId AND AddressTypeId = @AddressTypeId AND CustomerAddressId != @CustomerAddressId;
            END  

            UPDATE [dbo].[L_CustomerAddresses]          
            SET          
                AddressTypeId = @AddressTypeId,          
                IsPreferredBilling = @IsPreferredBilling,          
                IsPreferredShipping = @IsPreferredShipping          
            WHERE          
                CustomerAddressId=@CustomerAddressId AND CustomerId = @CustomerId AND AddressId=@AddressId;          
          
            -- Return a success message          
            SELECT @AddressId as KeyValue,          
            'Customer address linkup Updated' as ErrorMessage;          
       END  
    END TRY          
    BEGIN CATCH          
        -- Handle the error          
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();          
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();          
        DECLARE @ErrorState INT = ERROR_STATE();          
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);          
    END CATCH          
END; 
GO
/****** Object:  StoredProcedure [dbo].[UpdateCustomersBasicInformation]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCustomersBasicInformation]                  
@CustomerId INT,        
@Name VARCHAR(200),            
@GroupTypeId SMALLINT,            
@TerritoryId VARCHAR(150),            
@CountryId SMALLINT,            
@EmailAddress VARCHAR(255),            
@Website NVARCHAR(250),                                        
@TaxId VARCHAR(15),          
@UpdatedBy SMALLINT,  
@IsBuyingForThirdParty bit,  
@ResponsibleUserId SMALLINT  
AS                  
BEGIN                  
 SET NOCOUNT ON;                  
 BEGIN TRY                            
 -- Check if customer exists        
    IF NOT EXISTS (SELECT 1 FROM [dbo].[Customers] WHERE CustomerId = @CustomerId)                  
    BEGIN                  
        SELECT @CustomerId AS KeyValue,                           
        'NO RECORD FOUND' AS ErrorMessage;        
    END                  
            
    ELSE      
    BEGIN      
   -- Update customer information        
   UPDATE [dbo].[Customers]        
   SET           
    Name = @Name,        
    GroupTypeId = @GroupTypeId,        
    TerritoryId = @TerritoryId,        
    CountryId = @CountryId,        
    Website = @Website,                  
    TaxId = @TaxId,          
    UpdatedBy = @UpdatedBy,        
    UpdatedAt = GETDATE(),  
 IsBuyingForThirdParty = @IsBuyingForThirdParty,  
 ResponsibleUserId = @ResponsibleUserId  
   WHERE CustomerId = @CustomerId;         
                
   -- Update or Insert Email        
   IF EXISTS (SELECT 1 FROM [dbo].[Emails] WHERE OwnerId = @CustomerId AND OwnerTypeId =1)        
   BEGIN        
    UPDATE [dbo].[Emails]        
    SET EmailAddress = @EmailAddress,        
     UpdatedBy = @UpdatedBy,        
     UpdatedAt = GETDATE()        
    WHERE OwnerId = @CustomerId AND OwnerTypeId = 1;        
   END        
         
        
   -- Update or Insert Note        
   /*IF EXISTS (SELECT 1 FROM [dbo].[CustomerNotes] WHERE CustomerId = @CustomerId)        
   BEGIN        
    UPDATE [dbo].[CustomerNotes]        
    SET Note = @Note,        
     UpdatedBy = @UpdatedBy,        
     UpdatedAt = GETDATE()        
    WHERE CustomerId = @CustomerId;        
   END   */     
               
   SELECT @CustomerId AS KeyValue,                           
   'Customer Information Updated' AS ErrorMessage;      
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
/****** Object:  StoredProcedure [dbo].[UpdateDeliveryMethods]    Script Date: 09-07-2024 16:46:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateDeliveryMethods]                            
@CustomerDeliveryMethodId INT,                    
@CustomerId INT,                    
@DeliveryMethodId TINYINT,                    
@Charge DECIMAL(5,2),                    
@IsPrimary BIT,                           
@UpdatedBy SMALLINT                            
AS                            
BEGIN                            
SET NOCOUNT ON;                            
BEGIN TRY     
    DECLARE @IsForInternational BIT    
  
    SELECT @IsForInternational = IsForInternational FROM [dbo].[DeliveryMethods]WHERE DeliveryMethodId = @DeliveryMethodId;   
  
    IF @IsPrimary =1            
    BEGIN            
        UPDATE [dbo].[L_CustomCharge_CustomerDeliveryMethods] SET            
        IsPrimary=0            
        WHERE CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL     
        AND DeliveryMethodId IN (SELECT DeliveryMethodId FROM [dbo].[DeliveryMethods]WHERE IsForInternational = @IsForInternational)       
    END             
                        
    UPDATE [dbo].[L_CustomCharge_CustomerDeliveryMethods] SET                      
        [Charge]=@Charge,                    
        [IsPrimary]= @IsPrimary,        
        UpdatedBy = @UpdatedBy,                            
        UpdatedAt = GETDATE()                            
    WHERE CustomerDeliveryMethodId = @CustomerDeliveryMethodId AND CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL                          
           
    SELECT @CustomerDeliveryMethodId as KeyValue,                                     
    'Customer delivery method updated' as ErrorMessage          
           
   IF NOT EXISTS (SELECT 1 FROM [dbo].[L_CustomCharge_CustomerDeliveryMethods] where DeliveryMethodId=@DeliveryMethodId AND CustomerId = @CustomerId)                  
    BEGIN               
        UPDATE [dbo].[L_CustomCharge_CustomerDeliveryMethods] SET                      
        [DeliveryMethodId]=@DeliveryMethodId,                      
        UpdatedBy = @UpdatedBy,                            
        UpdatedAt = GETDATE()                            
    WHERE CustomerDeliveryMethodId = @CustomerDeliveryMethodId AND CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL                           
    END                  
    ELSE                  
    BEGIN                  
         SELECT CAST(0 AS INT) as KeyValue,                       
         'Delivery Method  already EXISTS' as ErrorMessage;                    
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
/****** Object:  StoredProcedure [dbo].[UpdateShppingDeliveryCarriers]    Script Date: 09-07-2024 16:46:21 ******/
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
@UpdatedBy SMALLINT                    
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
            IsPrimary=@IsPrimary,                    
            UpdatedBy = @UpdatedBy,                    
            UpdatedAt = GETDATE()                    
        WHERE CustomerDeliveryCarrierId = @CustomerDeliveryCarrierId AND CustomerId =@CustomerId AND DeletedAt IS NULL AND DeletedBy IS NULL                  
                    
        SELECT @CustomerDeliveryCarrierId as KeyValue,                             
        'Customer delivery carriers updated' as ErrorMessage       
              
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
/****** Object:  StoredProcedure [dbo].[ValidateSupplierData]    Script Date: 09-07-2024 16:46:21 ******/
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
    DECLARE @SupplierName NVARCHAR(100)
	SELECT @SupplierName = Name FROM Suppliers WHERE SupplierId = @SupplierId  

    -- Check For Customer Basic Destils    
    IF EXISTS (SELECT 1 FROM Suppliers WHERE SupplierId = @SupplierId  AND TaxId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @SupplierName +' has an TaxId');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0, @SupplierName +' does not have an TaxId');    
    END    
    
    -- Check For Customer Address    
    IF EXISTS (SELECT 1 FROM L_SupplierAddresses WHERE SupplierId = @SupplierId AND AddressId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @SupplierName +' has an Address');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0, @SupplierName +' does not have an Address');    
    END    
    
    -- Check For Customer Contact    
    IF EXISTS (SELECT 1 FROM L_SupplierContacts WHERE SupplierId = SupplierId AND ContactId IS NOT NULL)    
    BEGIN    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (1, @SupplierName +' has a Contact');    
    END    
    ELSE    
    BEGIN    
        SET @IsValid = 0;    
        INSERT INTO @ValidationResults (IsValid, Messages)    
        VALUES (0, @SupplierName +' does not have a Contact');    
    END    
    
    -- Return the list of validation results    
    SELECT IsValid, Messages    
    FROM @ValidationResults;    
END 
GO
