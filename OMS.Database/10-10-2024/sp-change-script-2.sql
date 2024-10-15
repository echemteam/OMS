
/****** Object:  StoredProcedure [dbo].[AddSupplierDocuments]    Script Date: 10-10-2024 17:15:22 ******/
DROP PROCEDURE [dbo].[AddSupplierDocuments]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerDocuments]    Script Date: 10-10-2024 17:15:22 ******/
DROP PROCEDURE [dbo].[AddCustomerDocuments]
GO
/****** Object:  StoredProcedure [dbo].[AddCustomerDocuments]    Script Date: 10-10-2024 17:15:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCustomerDocuments]                                  
    @CustomerId INT,    
    @CreatedBy SMALLINT,    
    @DocumentList dbo.DocumentTypeTable READONLY    
AS                                      
BEGIN                                      
    SET NOCOUNT ON;                                      
  
    BEGIN TRY                                                
        DECLARE @keyId AS INT    
        DECLARE @DocumentTypeId TINYINT   
        DECLARE @DocumentType VARCHAR(75)   
        DECLARE @Name VARCHAR(75)  
        DECLARE @Attachment NVARCHAR(255)  
  
        -- Declare a cursor for iterating through the DocumentList  
        DECLARE DocumentCursor CURSOR FOR  
        SELECT Name, Attachment, DocumentTypeId, DocumentType FROM @DocumentList  
  
        OPEN DocumentCursor  
  
        -- Fetch the first row from the cursor
        FETCH NEXT FROM DocumentCursor INTO @Name, @Attachment, @DocumentTypeId, @DocumentType  
  
        WHILE @@FETCH_STATUS = 0  
        BEGIN  
            -- Process each document  
            IF @DocumentType IS NOT NULL AND @DocumentTypeId = 0  
            BEGIN  
                IF EXISTS (SELECT 1 FROM [dbo].[DocumentTypes] WHERE Type = @DocumentType  AND IsForCustomers = 1)  
                BEGIN  
                    SET @DocumentTypeId = (SELECT DocumentTypeId FROM [dbo].[DocumentTypes] WHERE Type = @DocumentType AND IsForCustomers = 1);  
                END  
                ELSE  
                BEGIN  
                    INSERT INTO [dbo].[DocumentTypes] (Type, CreatedAt, IsForCustomers)  
                    VALUES (@DocumentType, GETDATE(), 1);  
                    SET @DocumentTypeId = SCOPE_IDENTITY();   
                END  
            END  
              
            -- Insert into CustomerDocuments  
            INSERT INTO [dbo].[CustomerDocuments]                                       
            (                                   
                Name,                    
                DocumentTypeId,                    
                Attachment,                    
                CustomerId,                    
                StatusId,                                
                CreatedBy,                                        
                CreatedAt                                       
            )    
            VALUES (@Name, @DocumentTypeId, @Attachment, @CustomerId, 1, @CreatedBy, GETDATE())  
  
            -- Fetch the next row from the cursor (corrected number of variables)
            FETCH NEXT FROM DocumentCursor INTO @Name, @Attachment, @DocumentTypeId, @DocumentType  
        END  
  
        CLOSE DocumentCursor  
        DEALLOCATE DocumentCursor  
  
        -- Get the last inserted keyId  
        SET @keyId = SCOPE_IDENTITY()                                                
        SELECT @keyId as KeyValue, 'Document Added' as ErrorMessage                                          
  
    END TRY                                                  
      
    BEGIN CATCH                                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE()                                                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY()                                                
        DECLARE @ErrorState INT = ERROR_STATE()                                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                                
    END CATCH                                                
      
END
GO
/****** Object:  StoredProcedure [dbo].[AddSupplierDocuments]    Script Date: 10-10-2024 17:15:22 ******/
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
    @SupplierId INT,    
    @CreatedBy SMALLINT,    
    @DocumentList dbo.DocumentTypeTable READONLY    
AS                                      
BEGIN                                      
    SET NOCOUNT ON;                                      
    
    BEGIN TRY                                              
        DECLARE @keyId AS INT                                        
        DECLARE @DocumentTypeId TINYINT     
        DECLARE @Name VARCHAR(75)    
        DECLARE @Attachment NVARCHAR(255)     
        DECLARE @DocumentType VARCHAR(50)  
    
        -- Declare a cursor for iterating through the DocumentList    
        DECLARE DocumentCursor CURSOR FOR    
        SELECT Name, Attachment, DocumentTypeId, DocumentType FROM @DocumentList    
    
        OPEN DocumentCursor    
    
        FETCH NEXT FROM DocumentCursor INTO @Name, @Attachment, @DocumentTypeId, @DocumentType  
            
        WHILE @@FETCH_STATUS = 0    
        BEGIN    
            -- If the DocumentTypeId is NULL or 0, look up the DocumentType or create a new one    
            IF @DocumentTypeId IS NULL OR @DocumentTypeId = 0    
            BEGIN    
                IF EXISTS (SELECT 1 FROM [dbo].[DocumentTypes] WHERE Type = @DocumentType AND IsForSuppliers = 1)    
                BEGIN    
                    SET @DocumentTypeId = (SELECT DocumentTypeId FROM [dbo].[DocumentTypes] WHERE Type = @DocumentType AND IsForSuppliers = 1);    
                END    
                ELSE    
                BEGIN    
                    INSERT INTO [dbo].[DocumentTypes] (Type, CreatedAt, IsForSuppliers)    
                    VALUES (@DocumentType, GETDATE(), 1);    
                    SET @DocumentTypeId = SCOPE_IDENTITY();     
                END    
            END    
            
            -- Insert document information into SupplierDocuments    
            INSERT INTO [dbo].[SupplierDocuments]                                     
            (                                
                Name,                  
                DocumentTypeId,                  
                Attachment,                  
                SupplierId,                  
                StatusId,                              
                CreatedBy,                                      
                CreatedAt                                     
            )             
            VALUES (@Name, @DocumentTypeId, @Attachment, @SupplierId, 1, @CreatedBy, GETDATE())    
                     
            -- Fetch the next document from the cursor    
            FETCH NEXT FROM DocumentCursor INTO @Name, @Attachment, @DocumentTypeId, @DocumentType                               
        END    
    
        -- Close and deallocate the cursor    
        CLOSE DocumentCursor    
        DEALLOCATE DocumentCursor      
       
        -- Return the last inserted keyId                                              
        SET @keyId = SCOPE_IDENTITY()                                              
        SELECT @keyId AS KeyValue, 'Document Added' AS ErrorMessage                                      
    END TRY                                                
    BEGIN CATCH                                                
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE()                                                
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY()                                                
        DECLARE @ErrorState INT = ERROR_STATE()                                                
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                                
    END CATCH                                                
END
GO


