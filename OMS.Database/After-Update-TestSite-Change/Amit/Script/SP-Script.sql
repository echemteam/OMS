
/****** Object:  StoredProcedure [dbo].[UpdateCustomerApproveStatus]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[UpdateCustomerApproveStatus]
GO
/****** Object:  StoredProcedure [dbo].[GetOrganizationHistorys]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetOrganizationHistorys]
GO
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetContactBySupplierId]
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetContactByCustomerId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsListByStatusAndRequestedByUserId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalRequestsListByStatusAndRequestedByUserId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsListByStatus]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalRequestsListByStatus]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsByApprovalRequestId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalRequestsByApprovalRequestId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalConfigurationByApprovalConfigurationId]
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfiguration]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetApprovalConfiguration]
GO
/****** Object:  StoredProcedure [dbo].[GetAllCustomers]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetAllCustomers]
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactsByCustomerIdAndContactTypeId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetAllContactsByCustomerIdAndContactTypeId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]
GO
/****** Object:  StoredProcedure [dbo].[DeleteAddress]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[DeleteAddress]
GO
/****** Object:  StoredProcedure [dbo].[CheckPoNumberExistOrNot]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[CheckPoNumberExistOrNot]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderInformation]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditOrderInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderContactInformation]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditOrderContactInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditOrderAddressInformation]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditOrderAddressInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditCustomersBasicInformation]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactPhone]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditContactPhone]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForSupplier]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditContactForSupplier]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForCustomer]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditContactForCustomer]
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactEmail]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddEditContactEmail]
GO
/****** Object:  StoredProcedure [dbo].[AddApprovalRequests]    Script Date: 10-08-2024 14:59:27 ******/
DROP PROCEDURE [dbo].[AddApprovalRequests]
GO
/****** Object:  StoredProcedure [dbo].[AddApprovalRequests]    Script Date: 10-08-2024 14:59:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddApprovalRequests]    
    @ModuleId INT = NULL,    
    @FunctionalityId INT = NULL,    
    @TableId INT = NULL,    
    @FunctionalitiesFieldId INT = NULL,
    @FunctionalityEventId INT,   
    @OldValue VARCHAR(MAX) = NULL,    
    @NewValue VARCHAR(MAX) = NULL,    
    @RequestedByUserId SMALLINT = NULL    
AS    
BEGIN    
    SET NOCOUNT ON;    
        
    BEGIN TRY    
        DECLARE @keyId AS INT;    
    
        INSERT INTO [dbo].[ApprovalRequests]    
        (    
            ModuleId,    
            FunctionalityId,    
            TableId,
            FunctionalityEventId,    
            FunctionalitiesFieldId,
            OldValue,    
            NewValue,    
            RequestedByUserId,    
            RequestedDate,    
            Status    
        )    
        VALUES    
        (    
            @ModuleId,    
            @FunctionalityId,    
            @TableId,
            @FunctionalityEventId,    
            @FunctionalitiesFieldId,    
            @OldValue,    
            @NewValue,    
            @RequestedByUserId,    
            GETDATE(),    
            'Pending'   
        );    
            
        SET @keyId = SCOPE_IDENTITY();    
    
        SELECT @keyId AS KeyValue,    
        'Approval Request Added' AS Message;    
            
    END TRY    
    BEGIN CATCH    
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();    
        DECLARE @ErrorSeverity NVARCHAR(MAX) = ERROR_SEVERITY();    
        DECLARE @ErrorState NVARCHAR(MAX) = ERROR_STATE();    
            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);    
    END CATCH    
END 
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactEmail]    Script Date: 10-08-2024 14:59:28 ******/
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

    SELECT CAST(0 AS INT)as KeyValue,                                             
    'Email Added-Updated' as ErrorMessage                     
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForCustomer]    Script Date: 10-08-2024 14:59:28 ******/
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
         SELECT CAST(0 AS INT)as KeyValue,                                             
        'Customer contact added' as ErrorMessage              
END TRY                            
BEGIN CATCH                          
   DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();      
   DECLARE @ErrorSeverity INT = ERROR_SEVERITY();      
   DECLARE @ErrorState INT = ERROR_STATE();      
   RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);      
END CATCH;                          
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactForSupplier]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditContactForSupplier]  
@SupplierContactId INT,  
@SupplierId INT,          
@ContactId INT,          
@ContactTypeId SMALLINT,  
@IsPrimary BIT,      
@CreatedBy SMALLINT               
AS            
BEGIN            
 SET NOCOUNT ON;            
BEGIN TRY                          
   IF @SupplierContactId > 0  
   BEGIN  
         
        IF EXISTS (SELECT 1 FROM [dbo].[L_SupplierContacts] WHERE SupplierContactId = @SupplierContactId         
        AND ( ContactTypeId != @ContactTypeId OR IsPrimary != @IsPrimary))             
       BEGIN   
           UPDATE [dbo].[L_SupplierContacts]  
           SET  
               ContactTypeId = @ContactTypeId,  
               IsPrimary = @IsPrimary  
           WHERE  
               SupplierContactId = @SupplierContactId  
  
           SELECT @SupplierContactId AS KeyValue,  
           'Supplier contact updated' AS Message;  
      END        
    
   END  
   ELSE  
   BEGIN  
       -- Insert new contact  
       DECLARE @keyId AS INT;  
         
       INSERT INTO [dbo].[L_SupplierContacts]  
       (  
           SupplierId,  
           ContactId,  
           ContactTypeId,  
           IsPrimary,  
           StatusId,  
           CreatedBy,  
           CreatedAt  
       )            
       VALUES          
       (  
           @SupplierId,  
           @ContactId,  
           @ContactTypeId,  
           @IsPrimary,  
           1,  
           @CreatedBy,  
           GETDATE()  
       );  
         
       SET @keyId = SCOPE_IDENTITY();  
         
       SELECT @keyId AS KeyValue,  
       'Supplier contact added' AS Message;  
   END 
    SELECT CAST(0 AS INT)as KeyValue,                                             
    'Supplier contact added' as ErrorMessage       
 
END TRY                        
BEGIN CATCH                      
   DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();  
   DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
   DECLARE @ErrorState INT = ERROR_STATE();  
   RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);  
END CATCH;                      
END;  
GO
/****** Object:  StoredProcedure [dbo].[AddEditContactPhone]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
            
            
CREATE PROCEDURE [dbo].[AddEditContactPhone]              
    @PhoneList dbo.PhoneTypeTable READONLY,              
    @ContactId INT              
AS              
BEGIN              
    SET NOCOUNT ON;              
              
    BEGIN TRY              
        -- Create a temporary table to hold the incoming data              
        CREATE TABLE #TempPhoneList (              
            PhoneId INT,              
            PhoneNumber VARCHAR(20),              
            PhoneCode VARCHAR(10),              
            PhoneTypeId SMALLINT,              
            Extension INT,    
            IsPrimary BIT,    
            OwnerTypeId TINYINT,      
            CreatedBy SMALLINT        
        );              
              
        -- Insert the incoming data into the temporary table              
        INSERT INTO #TempPhoneList (PhoneId, PhoneNumber, PhoneCode, PhoneTypeId, Extension,IsPrimary,OwnerTypeId,CreatedBy)              
        SELECT PhoneId, PhoneNumber, PhoneCode, PhoneTypeId, Extension,IsPrimary,OwnerTypeId,CreatedBy              
        FROM @PhoneList;              
              
        -- Update existing records              
        UPDATE p              
        SET p.PhoneNumber = t.PhoneNumber,              
            p.PhoneCode = t.PhoneCode,              
            p.PhoneTypeId = t.PhoneTypeId,              
            p.Extension = t.Extension,    
            p.IsPrimary=t.IsPrimary,              
            p.UpdatedAt = GETDATE(),              
            p.UpdatedBy = t.CreatedBy              
        FROM dbo.Phones p              
        INNER JOIN #TempPhoneList t ON p.PhoneId = t.PhoneId              
        WHERE p.OwnerId = @ContactId AND p.OwnerTypeId = t.OwnerTypeId AND DeletedAt IS NULL AND DeletedBy IS NULL      
        AND (p.PhoneNumber <> t.PhoneNumber OR p.PhoneCode <> t.PhoneCode OR p.PhoneTypeId <> t.PhoneTypeId OR p.Extension <> t.Extension OR p.IsPrimary <>t.IsPrimary);         
        -- Insert new records              
        INSERT INTO [dbo].[Phones] (PhoneNumber, PhoneCode, PhoneTypeId, Extension,IsPrimary ,OwnerId, OwnerTypeId, CreatedAt, CreatedBy)              
        SELECT t.PhoneNumber, t.PhoneCode, t.PhoneTypeId, t.Extension,t.IsPrimary, @ContactId, t.OwnerTypeId, GETDATE(), t.CreatedBy              
        FROM #TempPhoneList t              
        LEFT JOIN dbo.Phones p ON t.PhoneId = p.PhoneId              
        WHERE p.PhoneId IS NULL;              
              
        -- Drop the temporary table              
        DROP TABLE #TempPhoneList; 
        SELECT CAST(0 AS INT)as KeyValue,                                             
        'Phone Number Added-Updated' as ErrorMessage                
    END TRY              
    BEGIN CATCH              
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();              
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();              
        DECLARE @ErrorState INT = ERROR_STATE();              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);              
    END CATCH              
END; 
GO
/****** Object:  StoredProcedure [dbo].[AddEditCustomersBasicInformation]    Script Date: 10-08-2024 14:59:28 ******/
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
/****** Object:  StoredProcedure [dbo].[AddEditOrderAddressInformation]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderAddressInformation]    
    @OrderAddressId INT,
    @OrderId INT,
    @BillingAddressId INT,
    @ShippingAddressId INT,
    @CreatedBy SMALLINT                               
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
              
        IF @OrderAddressId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[L_OrderAddress] WHERE [OrderAddressId] = @OrderAddressId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[L_OrderAddress]                
                SET                   
                    [OrderId] = @OrderId,
                    [BillingAddressId] = @BillingAddressId,
                    [ShippingAddressId] = @ShippingAddressId,
                    [UpdatedBy] = @CreatedBy,
                    [UpdatedAt] = GETDATE()
                WHERE [OrderAddressId] = @OrderAddressId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderAddressId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order address updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT CAST(0 AS INT) as KeyValue,                                                            
                'Order address does not exist.' as ErrorMessage;    
            END    
        END    
        ELSE    
        BEGIN                 
            -- Insert new order
            INSERT INTO [dbo].[L_OrderAddress]                                  
            (                            
                OrderId,
                BillingAddressId,
                ShippingAddressId,                                                        
                CreatedBy,              
                CreatedAt                         
            )                                  
            VALUES                                
            (                            
                @OrderId,
                @BillingAddressId,
                @ShippingAddressId,                                                               
                @CreatedBy,                                  
                GETDATE()                
            );                                  
            SET @keyId = SCOPE_IDENTITY();                                          
            SELECT @keyId as KeyValue,                                             
            'Order address added' as ErrorMessage;                
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
/****** Object:  StoredProcedure [dbo].[AddEditOrderContactInformation]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderContactInformation]    
    @OrderId INT,
    @IsEndUser BIT,
    @EndUserContactId INT,
    @IsInvoiceSubmission BIT,
    @InvoiceSubmissionContactId INT,
    @IsPurchasing BIT,
    @PurchasingContactId INT,
    @ReferenceNumber NVARCHAR(100),
    @CreatedBy INT                                 
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
        
        IF @OrderId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE OrderId = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[Orders]                
                SET                   
                    [IsEndUser] = @IsEndUser,
                    [EndUserContactId] = @EndUserContactId,
                    [IsInvoiceSubmission] = @IsInvoiceSubmission,
                    [InvoiceSubmissionContactId] = @InvoiceSubmissionContactId,
                    [IsPurchasing] = @IsPurchasing,
                    [PurchasingContactId] = @PurchasingContactId,
                    [ReferenceNumber] = @ReferenceNumber,
                    UpdatedBy = @CreatedBy,
                    UpdatedAt = GETDATE()
                WHERE [OrderId] = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order contact Updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT CAST(0 AS INT) as KeyValue,                                                            
                'Order contact does not exist.' as ErrorMessage;    
            END    
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
/****** Object:  StoredProcedure [dbo].[AddEditOrderInformation]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddEditOrderInformation]    
    @OrderId INT,
    @OrderMethodId TINYINT,
    @CustomerId INT,
    @SubCustomerId INT,
    @PoNumber VARCHAR(255),
    @OrderReceivedDate DATETIME,
    @CreatedBy INT                                 
AS                                  
BEGIN                                  
    SET NOCOUNT ON;                                  
    BEGIN TRY                                            
        DECLARE @keyId AS INT;                                                    
              
      
        IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE PoNumber = @PoNumber AND CustomerId = @CustomerId AND OrderId <> @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)
        BEGIN
            SELECT CAST(0 AS INT) as KeyValue,                                                            
            'PoNumber already exists.' as ErrorMessage;              
        END

        IF @OrderId > 0               
        BEGIN    
            IF EXISTS (SELECT 1 FROM [dbo].[Orders] WHERE OrderId = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL)              
            BEGIN    
                UPDATE [dbo].[Orders]                
                SET                   
                    OrderMethodId = @OrderMethodId,
                    CustomerId = @CustomerId,
                    SubCustomerId = @SubCustomerId,
                    PoNumber = @PoNumber,
                    OrderReceivedDate = @OrderReceivedDate,
                    UpdatedBy = @CreatedBy,
                    UpdatedAt = GETDATE()
                WHERE [OrderId] = @OrderId AND DeletedAt IS NULL AND DeletedBy IS NULL
             
                SET @keyId = @OrderId;    
                 
                SELECT @keyId AS KeyValue,               
               'Order Updated' AS ErrorMessage;      
            END    
            ELSE    
            BEGIN    

                SELECT @OrderId as KeyValue,                                                            
                'Order does not exist.' as ErrorMessage;    
            END    
        END    
        ELSE    
        BEGIN                 
            -- Insert new order
            INSERT INTO [dbo].[Orders]                                  
            (                            
                OrderMethodId,   
                CustomerId,                            
                SubCustomerId,                             
                PoNumber,                            
                OrderReceivedDate,                                                           
                CreatedBy,              
                CreatedAt                         
            )                                  
            VALUES                                
            (                            
                @OrderMethodId,                          
                @CustomerId,                               
                @SubCustomerId,                            
                @PoNumber,                            
                @OrderReceivedDate,                                                                 
                @CreatedBy,                                  
                GETDATE()                
            );                                  
            SET @keyId = SCOPE_IDENTITY();                                          
            SELECT @keyId as KeyValue,                                             
            'Order Added' as ErrorMessage;                
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
/****** Object:  StoredProcedure [dbo].[CheckPoNumberExistOrNot]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE PROCEDURE [dbo].[CheckPoNumberExistOrNot]        
@PoNumber VARCHAR(255),
@CustomerId INT
AS        
BEGIN        
    SET NOCOUNT ON;  
  
    BEGIN TRY                  
        IF EXISTS (SELECT PoNumber FROM [dbo].[Orders] WHERE [PoNumber] = @PoNumber AND [CustomerId] = @CustomerId AND DeletedBy IS NULL AND DeletedAt IS NULL)  
        BEGIN        
            SELECT CAST(0 AS INT) AS KeyValue,                 
            'PO Number already exists' AS ErrorMessage;           
        END        
        ELSE        
        BEGIN  
            SELECT CAST(1 AS INT) AS KeyValue,                 
            'PO Number does not exist' AS ErrorMessage;           
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
/****** Object:  StoredProcedure [dbo].[DeleteAddress]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
--DeleteAddress 2,2  
CREATE PROCEDURE [dbo].[DeleteAddress]  
 @AddressId SMALLINT,  
 @DeletedBy SMALLINT  
AS  
BEGIN  
    SET NOCOUNT ON;  
  
    BEGIN TRY  
        IF EXISTS (SELECT AddressId FROM [dbo].[Addresses] WHERE AddressId = @AddressId AND DeletedAt is  null and DeletedBy is null)  
        BEGIN  
            UPDATE [dbo].[Addresses]  
            SET  
                [DeletedBy] = @DeletedBy,  
                [DeletedAt] = GETDATE()  
            WHERE AddressId = @AddressId   
  
            SELECT @AddressId AS KeyValue,  
            'Address Deleted' AS ErrorMessage;  
        END  
        ELSE  
        BEGIN  
            SELECT @AddressId AS KeyValue,  
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
/****** Object:  StoredProcedure [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllAddressesByCustomerIdAndAddressTypeId  1093,1             
CREATE PROCEDURE [dbo].[GetAllAddressesByCustomerIdAndAddressTypeId]          
@CustomerId INT,
@AddressTypeId SMALLINT             
AS                                    
BEGIN                                    
 SET NOCOUNT ON;                                    
BEGIN TRY                                            
                          
    SELECT 
        A.AddressId,
        LCA.AddressTypeId,
        AT.Type as AddressType,     
        A.AddressLine1,
        A.AddressLine2,
        A.AddressLine3,
        A.AddressLine4,
        A.AddressLine5,
        A.CityId,
        CT.Name as CityName,
        A.StateId,
        S.Name As StateName,
        A.CountryId,
        C.Name AS CountryName,
        A.ZipCode   
    FROM [dbo].[L_CustomerAddresses] LCA
    LEFT JOIN [dbo].[Addresses] A ON A.[AddressId]= LCA.AddressId 
    LEFT JOIN [dbo].[AddressTypes] AT ON AT.[AddressTypeId]= LCA.AddressTypeId
    LEFT JOIN [dbo].[Countries] C ON C.[CountryId]= A.CountryId
    LEFT JOIN [dbo].[States] S ON S.[StateId]= A.StateId
    LEFT JOIN [dbo].[Cities] CT ON CT.[CityId]= A.CityId
    WHERE LCA.CustomerId = @CustomerId AND LCA.AddressTypeId=@AddressTypeId AND  A.DeletedAt IS NULL AND A.DeletedBy IS NULL  
                                                    
END TRY                                            
BEGIN CATCH                                            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                            
END CATCH                                     
                                    
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllContactsByCustomerIdAndContactTypeId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllContactsByCustomerIdAndContactTypeId  1093,2               
CREATE PROCEDURE [dbo].[GetAllContactsByCustomerIdAndContactTypeId]            
@CustomerId INT,  
@ContactTypeId SMALLINT               
AS                                      
BEGIN                                      
 SET NOCOUNT ON;                                      
BEGIN TRY                                              
                            
    SELECT   
        C.ContactId,  
        C.FirstName +' ' +C.LastName as FullName,
        LCC.ContactTypeId,
        CT.Type as ContactType
    FROM [dbo].[L_CustomerContacts] LCC  
    LEFT JOIN [dbo].[Contacts] C ON C.[ContactId]= LCC.ContactId  
    LEFT JOIN [dbo].[ContactTypes] CT ON CT.[ContactTypeId]= LCC.ContactTypeId  
    WHERE LCC.CustomerId = @CustomerId AND LCC.ContactTypeId=@ContactTypeId AND  C.DeletedAt IS NULL AND C.DeletedBy IS NULL    
                                                      
END TRY                                              
BEGIN CATCH                                              
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                              
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                              
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                              
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                              
END CATCH                                       
                                      
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllCustomers]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllCustomers]
AS                              
BEGIN                              
 SET NOCOUNT ON;                              
BEGIN TRY                                 
                    
SELECT    
    C.[CustomerId],  
    C.[Name],
    C.IsBuyingForThirdParty,
    C.StatusId,
    S.[Status] as StatusName,
    C.CreatedAt
FROM [dbo].[Customers] C
LEFT JOIN [dbo].[Status] S ON C.StatusId = S.StatusId
WHERE C.deletedby IS NULL 
  AND C.deletedAt IS NULL   
                                                
END TRY                                      
BEGIN CATCH                                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                      
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                      
END CATCH                               
                              
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfiguration]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetApprovalConfiguration 
CREATE PROCEDURE [dbo].[GetApprovalConfiguration]
AS    
BEGIN    
    SET NOCOUNT ON;    
    BEGIN TRY    
        SELECT
			AC.ApprovalConfigurationId,
			AC.RuleName,
			M.ModuleId,
			M.ModuleName,
			F.FunctionalityId,
			F.Name AS FunctionalityName,
			FT.FunctionalitiesTableId AS TableId,
			FT.TableName,
			FF.FunctionalitiesFieldId,
			FF.FieldName,
			FE.FunctionalityEventId,
			FE.EventName
			--AC.ApproverRoleId,
			--AC.ApprovalAction
	FROM [dbo].[ApprovalConfiguration] AC
	LEFT JOIN [dbo].[Modules] M ON AC.ModuleId = M.ModuleId
	LEFT JOIN [dbo].[Functionalities] F ON AC.FunctionalityId  = F.FunctionalityId
	LEFT JOIN [dbo].[FunctionalityEvents] FE ON F.FunctionalityId  = FE.FunctionalityId
	LEFT JOIN [dbo].[FunctionalitiesTables] FT ON AC.FunctionalityId = FT.FunctionalityId
	LEFT JOIN [dbo].[FunctionalitiesFields] FF ON AC.FunctionalitiesFieldId = FF.FunctionalitiesFieldId
	--WHERE AC.ModuleId= @ModuleId
	GROUP BY 
	AC.ApprovalConfigurationId,
	AC.RuleName,
	M.ModuleId,
	M.ModuleName,
	F.FunctionalityId,
	F.Name,
	FT.FunctionalitiesTableId,
	FT.TableName,
	FF.FunctionalitiesFieldId,
	FF.FieldName,
	FE.FunctionalityEventId,
	FE.EventName
	--AC.ApproverRoleId,
	--AC.ApprovalAction  
    END TRY        
    BEGIN CATCH            
        DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
        DECLARE @ErrorSeverity int = ERROR_SEVERITY()            
        DECLARE @ErrorState int = ERROR_STATE()            
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
    END CATCH         
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationByApprovalConfigurationId]    Script Date: 10-08-2024 14:59:28 ******/
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
            R.RoleName,  
            AC.ApprovalAction  
        FROM [dbo].[ApprovalConfiguration] AC  
        LEFT JOIN [dbo].[Modules] M ON AC.ModuleId = M.ModuleId  
        LEFT JOIN [dbo].[Functionalities] F ON AC.FunctionalityId = F.FunctionalityId  
        LEFT JOIN [dbo].[FunctionalitiesFields] FF ON AC.FunctionalitiesFieldId = FF.FunctionalitiesFieldId
        LEFT JOIN [dbo].[Roles] R ON AC.[ApproverRoleId] = R.[RoleId]       
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
/****** Object:  StoredProcedure [dbo].[GetApprovalConfigurationRulesByModuleIdAndFunctionalityId]    Script Date: 10-08-2024 14:59:28 ******/
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
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsByApprovalRequestId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetApprovalRequestsByApprovalRequestId 1
CREATE PROCEDURE [dbo].[GetApprovalRequestsByApprovalRequestId]                        
    @ApprovalRequestId INT
AS                        
BEGIN                        
    SET NOCOUNT ON;                        
    BEGIN TRY                                
        SELECT                        
            AR.ApprovalRequestId,
            AR.ModuleId,
            M.ModuleName,
            AR.FunctionalityId,
            F.Name AS FunctionalityName,
            AR.TableId,
            FT.TableName,
            AR.FunctionalitiesFieldId,
            FF.FieldName,
            AR.FunctionalityEventId,
            FE.EventName,
            AR.OldValue,
            AR.NewValue,
            AR.RequestedByUserId,
            R.FirstName + ' ' + R.LastName AS RequestedByUserName,
            AR.RequestedDate,
            AR.ApprovedByUserId,
            A.FirstName + ' ' + A.LastName AS ApprovedByUserName,
            AR.ApprovedDate,
            AR.Status
        FROM [dbo].[ApprovalRequests] AR
        LEFT JOIN [dbo].[Modules] M ON M.ModuleId = AR.ModuleId  
        LEFT JOIN [dbo].[Functionalities] F ON F.FunctionalityId = AR.FunctionalityId
        LEFT JOIN [dbo].[FunctionalitiesTables] FT ON FT.FunctionalitiesTableId = AR.TableId
        LEFT JOIN [dbo].[FunctionalityEvents] FE ON FE.FunctionalityEventId= AR.FunctionalityEventId
        LEFT JOIN [dbo].[FunctionalitiesFields] FF ON FF.FunctionalitiesFieldId = AR.FunctionalitiesFieldId 
        LEFT JOIN [dbo].[Users] R ON R.UserId = AR.RequestedByUserId
        LEFT JOIN [dbo].[Users] A ON A.UserId = AR.ApprovedByUserId  
        WHERE AR.ApprovalRequestId = @ApprovalRequestId
    END TRY                                
    BEGIN CATCH                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                                
        DECLARE @ErrorState INT = ERROR_STATE();                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                                
    END CATCH                         
END
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsListByStatus]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
-- GetApprovalRequestsListByStatus 'Accept'               
CREATE PROCEDURE [dbo].[GetApprovalRequestsListByStatus]                          
@status NVARCHAR(50)  
AS                          
BEGIN                          
    SET NOCOUNT ON;                          
    BEGIN TRY                                  
                
    SELECT                          
        AR.ApprovalRequestId,  
        AR.FunctionalityId,  
        F.Name as FunctionalityName,  
        AR.ModuleId,  
        M.ModuleName  
    FROM [dbo].[ApprovalRequests] AR  
    LEFT JOIN [dbo].[Functionalities] F ON F.FunctionalityId = AR.FunctionalityId      
    LEFT JOIN [dbo].[Modules] M ON M.ModuleId = AR.ModuleId   
    WHERE AR.Status=@status    
    ORDER BY AR.ApprovalRequestId DESC    
                                         
    END TRY                                  
BEGIN CATCH                                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                  
END CATCH                           
                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetApprovalRequestsListByStatusAndRequestedByUserId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
              
-- GetApprovalRequestsListByStatusAndRequestedByUserId 'Pending',109               
CREATE PROCEDURE [dbo].[GetApprovalRequestsListByStatusAndRequestedByUserId]                          
@status NVARCHAR(50),
@RequestedByUserId SMALLINT 
AS                          
BEGIN                          
    SET NOCOUNT ON;                          
    BEGIN TRY                                  
                
    SELECT                          
        AR.ApprovalRequestId,  
        AR.FunctionalityId,  
        F.Name as FunctionalityName,  
        AR.ModuleId,  
        M.ModuleName  
    FROM [dbo].[ApprovalRequests] AR  
    LEFT JOIN [dbo].[Functionalities] F ON F.FunctionalityId = AR.FunctionalityId      
    LEFT JOIN [dbo].[Modules] M ON M.ModuleId = AR.ModuleId
    WHERE AR.Status=@status AND AR.RequestedByUserId=@RequestedByUserId    
    ORDER BY AR.ApprovalRequestId DESC    
                                         
    END TRY                                  
BEGIN CATCH                                  
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                  
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                  
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                  
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                  
END CATCH                           
                          
END 
GO
/****** Object:  StoredProcedure [dbo].[GetContactByCustomerId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
          
-- GetContactByCustomerId 1082,'',''          
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
            AND (@SearchContactType IS NULL OR @SearchContactType='' OR LCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))            
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
/****** Object:  StoredProcedure [dbo].[GetContactBySupplierId]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
            
-- GetContactBySupplierId 2089,'',''
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
            AND (@SearchContactType IS NULL OR @SearchContactType = '' OR SCC.ContactTypeId IN (SELECT ContactTypeId FROM @ContactTypeIdTable))                
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
/****** Object:  StoredProcedure [dbo].[GetOrganizationHistorys]    Script Date: 10-08-2024 14:59:28 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateCustomerApproveStatus]    Script Date: 10-08-2024 14:59:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
             
CREATE PROCEDURE [dbo].[UpdateCustomerApproveStatus]              
@CustomerId INT,                   
@ApprovedBy SMALLINT              
AS              
BEGIN              
 SET NOCOUNT ON;              
BEGIN TRY                        
IF NOT EXISTS (SELECT CustomerId FROM [dbo].[Customers] WHERE CustomerId = @CustomerId)              
BEGIN              
  SELECT @CustomerId as KeyValue,                       
  'NO RECORD FOUND' as ErrorMessage              
END              
ELSE              
BEGIN              
              
 UPDATE [dbo].[Customers] SET      
    StatusId=3,           
    ApprovedBy = @ApprovedBy,              
    ApprovedAt = GETDATE()              
 WHERE CustomerId = @CustomerId      
              
   SELECT @CustomerId as KeyValue,                       
   'Customers Approved' as ErrorMessage     
    
    IF @CustomerId > 0            
    BEGIN            
        
        UPDATE [dbo].[L_CustomerAddresses] SET    
        StatusId=3,    
        ApprovedBy = @ApprovedBy,              
        ApprovedAt = GETDATE()    
            
        UPDATE [dbo].[L_CustomerContacts] SET    
        StatusId=3,    
        ApprovedBy = @ApprovedBy,              
        ApprovedAt = GETDATE()  
          
        UPDATE [dbo].[CustomerDocuments]SET    
        StatusId=3,    
        ApprovedBy = @ApprovedBy,              
        ApprovedAt = GETDATE()     
         
   END               
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
