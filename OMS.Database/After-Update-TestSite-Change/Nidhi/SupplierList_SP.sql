USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 21-08-2024 11:20:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
                  
--GetSuppliers 1,10,'','taxId,name desc','',500                     
CREATE PROCEDURE [dbo].[GetSuppliers]                        
  @PageNumber INT = 1,                        
  @PageSize INT = 25,                        
  @SearchText NVARCHAR(50) = '', 
  @SortString VARCHAR(250),                         
  @StatusId VARCHAR(15) = '', 
  @TotalCount INT OUTPUT                        
AS                        
BEGIN                        
    SET NOCOUNT ON;                        
 BEGIN TRY                      
    -- Calculate the offset for pagination                        
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                        
     DECLARE @OrderBy NVARCHAR(250) = '';    
    SET @OrderBy = @SortString   
    IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'SP.SupplierId DESC';    
    END
    
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = '           
    DECLARE @StatusIdsTable TABLE (StatusId VARCHAR(15));                  
                     
    INSERT INTO @StatusIdsTable (StatusId)                  
    SELECT value                  
    FROM STRING_SPLIT(@StatusId, '','')                  
    WHERE @StatusId IS NOT NULL; -- Filter out NULL values                  
                  
    -- Get the total count                        
    SELECT @TotalCount = COUNT(*)                        
    FROM [dbo].[Suppliers] SP                        
    LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId        
    LEFT JOIN [dbo].[Emails] E ON SP.SupplierId= E.OwnerId AND E.OwnerTypeId=2                
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL           
    WHERE                        
        (@StatusId = '''' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (SP.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL             
        OR SP.TaxId = @SearchText OR @SearchText IS NULL           
        OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)                          
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
       ResponsibleUserId = STUFF((SELECT '', '' + CAST(U.UserId AS NVARCHAR(10))  
                                FROM [dbo].[ResponsibleUserMappingSupplier] RUMS 
                                LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId 
                                WHERE RUMS.SupplierId = SP.SupplierId 
                                FOR XML PATH(''''), TYPE).value(''.'', ''NVARCHAR(MAX)''), 1, 2, ''''),
       ResponsibleUserName = STUFF((SELECT '', '' + U.FirstName + '' '' + U.LastName
                                FROM [dbo].[ResponsibleUserMappingSupplier] RUMS 
                                LEFT JOIN [dbo].[Users] U ON U.UserId = RUMS.UserId 
                                WHERE RUMS.SupplierId = SP.SupplierId  
                                FOR XML PATH(''''), TYPE).value(''.'', ''NVARCHAR(MAX)''), 1, 2, '''')        
    FROM [dbo].[Suppliers] SP                     
    LEFT JOIN [dbo].[Status] S ON S.StatusId = SP.StatusId        
    LEFT JOIN [dbo].[Emails] E ON SP.SupplierId= E.OwnerId AND E.OwnerTypeId=2                        
    LEFT JOIN [dbo].[L_SupplierInActiveReasons] SIAR ON SIAR.SupplierId =SP.SupplierId AND SIAR.DeletedAt IS NULL AND SIAR.DeletedBy IS NULL                
    WHERE                        
        (@StatusId = '''' OR SP.StatusId IN (SELECT StatusId FROM @StatusIdsTable))        
        AND (SP.Name LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL            
        OR SP.TaxId = @SearchText OR @SearchText IS NULL    
        OR E.EmailAddress LIKE ''%'' + @SearchText + ''%'' OR @SearchText IS NULL)                       
        AND SP.DeletedBy IS NULL                   
        AND SP.DeletedAt IS NULL                       
    ORDER BY ' + @OrderBy + '                        
    OFFSET @Offset ROWS                        
    FETCH NEXT @PageSize ROWS ONLY;';

    -- Execute the dynamic SQL
    EXEC sp_executesql @SQL,
    N'@StatusId VARCHAR(15), @SearchText NVARCHAR(50), @Offset INT, @PageSize INT, @OrderBy NVARCHAR(250), @TotalCount INT OUTPUT',
    @StatusId, @SearchText, @Offset, @PageSize, @OrderBy, @TotalCount OUTPUT;                        
                  
END TRY                    
    BEGIN CATCH                        
     DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                        
     DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                        
     DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                        
    END CATCH                   
END; 
GO
