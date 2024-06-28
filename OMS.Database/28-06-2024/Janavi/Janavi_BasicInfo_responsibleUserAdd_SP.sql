USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditSupplierBasicInformation]    Script Date: 28-06-2024 15:52:30 ******/
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
                

                UPDATE [dbo].[SupplierNotes] SET    
                Note=@Note,     
                UpdatedBy=@CreatedBy,    
                UpdatedAt=GETDATE()                    
                WHERE SupplierId=@SupplierId    
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
/****** Object:  StoredProcedure [dbo].[GetSupplierBasicInformationById]    Script Date: 28-06-2024 15:52:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetSupplierBasicInformationById 7         
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
   U.FirstName + ' ' + U.LastName AS ResponsibleUser  

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
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 28-06-2024 15:52:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
        
--GetSuppliers 1,50,'','0',500        
CREATE PROCEDURE [dbo].[GetSuppliers]              
  @PageNumber INT = 1,              
  @PageSize INT = 25,              
  @SearchText NVARCHAR(50) = '0',              
  @StatusId VARCHAR(15) = NULL,              
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
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL 
    WHERE              
        (@StatusId = '0' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))              
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
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL
   LEFT JOIN Users U on U.UserId = SP.ResponsibleUserId
   WHERE              
        (@StatusId = '0' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))              
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
