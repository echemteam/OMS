USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 01-07-2024 11:28:04 ******/
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
