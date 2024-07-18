USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[GetSubCompanysByMainCompanyId]    Script Date: 18-07-2024 14:25:09 ******/
DROP PROCEDURE [dbo].[GetSubCompanysByMainCompanyId]
GO
/****** Object:  StoredProcedure [dbo].[GetAllSubCompany]    Script Date: 18-07-2024 14:25:09 ******/
DROP PROCEDURE [dbo].[GetAllSubCompany]
GO
/****** Object:  StoredProcedure [dbo].[DeleteSubCompany]    Script Date: 18-07-2024 14:25:09 ******/
DROP PROCEDURE [dbo].[DeleteSubCompany]
GO
/****** Object:  StoredProcedure [dbo].[AddSubCompanyMainCompany]    Script Date: 18-07-2024 14:25:09 ******/
DROP PROCEDURE [dbo].[AddSubCompanyMainCompany]
GO
/****** Object:  StoredProcedure [dbo].[AddSubCompanyMainCompany]    Script Date: 18-07-2024 14:25:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddSubCompanyMainCompany]            
@MainCompanyId int,
@SubCompanyId int              
AS            
BEGIN            
 SET NOCOUNT ON;            
BEGIN TRY                          
   DECLARE @keyId AS INT              
     
   INSERT INTO [dbo].[SubCompanyMainCompany]
    (         
        MainCompanyId,
        SubCompanyId      
    )            
    VALUES          
    (        
        @MainCompanyId,
        @SubCompanyId       
    )            
            
   SET  @keyId = SCOPE_IDENTITY()                    
            
   SELECT @keyId as KeyValue,                     
   'Sub Company added' as ErrorMessage                   
        
END TRY                        
BEGIN CATCH                      
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                      
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                      
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                      
 RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                      
END CATCH                      
END 
GO
/****** Object:  StoredProcedure [dbo].[DeleteSubCompany]    Script Date: 18-07-2024 14:25:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
--DeleteSubCompany 2,2  
CREATE PROCEDURE [dbo].[DeleteSubCompany]  
 @SubCompanyMainCompanyId INT,  
 @DeletedBy SMALLINT  
AS  
BEGIN  
    SET NOCOUNT ON;  
  
    BEGIN TRY  
        IF EXISTS (SELECT SubCompanyMainCompanyId FROM [dbo].[SubCompanyMainCompany] WHERE SubCompanyMainCompanyId = @SubCompanyMainCompanyId)  
        BEGIN  
            UPDATE [dbo].[SubCompanyMainCompany]  
            SET  
                [DeletedBy] = @DeletedBy,  
                [DeletedAt] = GETDATE()  
            WHERE SubCompanyMainCompanyId = @SubCompanyMainCompanyId
  
            SELECT @SubCompanyMainCompanyId AS KeyValue,  
                   'Sub Company Deleted' AS ErrorMessage;  
        END  
        ELSE  
        BEGIN  
            SELECT @SubCompanyMainCompanyId AS KeyValue,  
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
/****** Object:  StoredProcedure [dbo].[GetAllSubCompany]    Script Date: 18-07-2024 14:25:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllSubCompany      
CREATE PROCEDURE [dbo].[GetAllSubCompany]              
AS                                
BEGIN                                
    SET NOCOUNT ON;                                
    BEGIN TRY                                        
        SELECT      
        [CustomerId],
        [Name]    
        FROM [dbo].[Customers] where IsSubCompany=1 ANd deletedby IS NULL AND deletedAt is NULL    
END TRY                                        
BEGIN CATCH                                        
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                        
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                        
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                        
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                        
END CATCH                                 
                                
END 
GO
/****** Object:  StoredProcedure [dbo].[GetSubCompanysByMainCompanyId]    Script Date: 18-07-2024 14:25:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- GetSubCompanysByMainCompanyId 2,1,25,'','',200                
CREATE PROCEDURE [dbo].[GetSubCompanysByMainCompanyId]                                                                
 @MainCompanyId INT,              
 @PageNumber INT = 1,                                                
 @PageSize INT = 25,            
 @SearchText NVARCHAR(200),    
 @SortString VARCHAR(250),               
 @TotalCount INT OUTPUT                
AS                              
BEGIN                              
    SET NOCOUNT ON;                              
    
    -- Calculate the offset for pagination                
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;              
        
    -- Set the default sort order if @SortString is empty or NULL
    DECLARE @OrderBy NVARCHAR(250) = '';      
    IF @SortString = '' OR @SortString IS NULL    
    BEGIN      
        SET @OrderBy = 'SC.SubCompanyMainCompanyId DESC';      
    END     
    ELSE
    BEGIN
        SET @OrderBy = @SortString;
    END
        
    -- Get the total count                
    SELECT @TotalCount = COUNT(*)                
    FROM [dbo].[SubCompanyMainCompany] SC      
    LEFT JOIN [dbo].[Customers] C ON SC.SubCompanyId = C.[CustomerId]
    LEFT JOIN [dbo].[Countries] CO ON C.[CountryId] = CO.CountryId      
    WHERE SC.MainCompanyId = @MainCompanyId 
      AND SC.DeletedBy IS NULL 
      AND SC.DeletedAt IS NULL               
      AND (@SearchText IS NULL OR @SearchText = ''       
      OR C.[Name] LIKE '%' + @SearchText + '%'       
      OR CO.[Name] LIKE '%' + @SearchText + '%');              
        
    -- Prepare the SQL query for fetching data with pagination
    DECLARE @SQL NVARCHAR(MAX);           
    SET @SQL = '
    SELECT      
        SC.SubCompanyMainCompanyId,
        SC.MainCompanyId,
        SC.SubCompanyId,
        C.[Name] AS SubCompanyName,
        CO.[Name] AS CountryName,
        C.TaxId
    FROM [dbo].[SubCompanyMainCompany] SC      
    LEFT JOIN [dbo].[Customers] C ON SC.SubCompanyId = C.[CustomerId]
    LEFT JOIN [dbo].[Countries] CO ON C.[CountryId] = CO.CountryId      
    WHERE SC.MainCompanyId = @MainCompanyId 
      AND SC.DeletedBy IS NULL 
      AND SC.DeletedAt IS NULL               
      AND (@SearchText IS NULL OR @SearchText = ''''       
      OR C.[Name] LIKE ''%'' + @SearchText + ''%''       
      OR CO.[Name] LIKE ''%'' + @SearchText + ''%'')                 
    ORDER BY ' + @OrderBy + '                 
    OFFSET @Offset ROWS                
    FETCH NEXT @PageSize ROWS ONLY;';                           
         
    -- Execute the dynamic SQL
    EXEC sp_executesql @SQL,   
        N'@MainCompanyId INT, @SearchText NVARCHAR(200), @Offset INT, @PageSize INT', 
        @MainCompanyId, @SearchText, @Offset, @PageSize;                        
END
GO
