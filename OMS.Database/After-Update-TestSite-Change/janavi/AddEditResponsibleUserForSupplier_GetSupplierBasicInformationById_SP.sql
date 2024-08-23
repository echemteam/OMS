USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditResponsibleUserForSupplier]    Script Date: 20-08-2024 17:26:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [dbo].[AddEditResponsibleUserForSupplier]
    @SupplierId INT,
    @UserId NVARCHAR(MAX), -- Comma-separated list of user IDs
    @CreatedBy SMALLINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Split the comma-separated list into a table
        DECLARE @UserIdTable TABLE (UserId SMALLINT);
        
        INSERT INTO @UserIdTable (UserId)
        SELECT value FROM STRING_SPLIT(@UserId, ',');

        -- Delete existing records for the given customer
        DELETE FROM [dbo].[ResponsibleUserMappingSupplier]
        WHERE [SupplierId] = @SupplierId;

        -- Insert new records
        INSERT INTO [dbo].[ResponsibleUserMappingSupplier]
        (
            [SupplierId],
            [UserId],
            [CreatedBy],
            [CreatedAt]
        )
        SELECT
            @SupplierId,
            UserId,
            @CreatedBy,
            GETDATE()
        FROM @UserIdTable;

        SELECT SCOPE_IDENTITY() AS KeyValue,
        'Responsible Users Assigned' AS ErrorMessage;

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetSupplierBasicInformationById]    Script Date: 20-08-2024 17:26:38 ******/
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
--  SP.ResponsibleUserId,    
--  U.FirstName + ' ' + U.LastName AS ResponsibleUserName  
  STUFF(         (SELECT ', ' + CAST(U.UserId AS NVARCHAR(10))         FROM [dbo].[ResponsibleUserMappingSupplier] RUMS  LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId         WHERE RUMS.SupplierId = SP.SupplierId         FOR XML PATH(''), TYPE).value('
.', 'NVARCHAR(MAX)'),         1, 2, '') AS ResponsibleUserId,  
    STUFF(         (SELECT ', ' + U.FirstName + ' ' + U.LastName         FROM [dbo].[ResponsibleUserMappingSupplier] RUMS   LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId         WHERE RUMS.SupplierId = SP.SupplierId     FOR XML PATH(''), TYPE).value('
.', 'NVARCHAR(MAX)'),         1, 2, '') AS ResponsibleUserName      
    
 FROM [dbo].[Suppliers] SP        
 LEFT JOIN [dbo].[SupplierTypes] SPT ON SPT.SupplierTypeId = SP.SupplierTypeId     
 LEFT JOIN [dbo].[Emails] E ON SP.SupplierId = E.OwnerId AND OwnerTypeId = 2             
 LEFT JOIN [dbo].[Countries] CS ON CS.CountryId = SP.CountryId            
 LEFT JOIN [dbo].[GroupTypes] GT ON GT.GroupTypeId = SP.GroupTypeId            
 LEFT JOIN [dbo].[Territories] T ON T.TerritoryId = SP.TerritoryId        
 LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId        
-- LEFT JOIN Users U ON U.UserId =SP.ResponsibleUserId    
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
