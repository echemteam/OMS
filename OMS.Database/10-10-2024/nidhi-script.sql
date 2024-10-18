
/****** Object:  StoredProcedure [dbo].[GetUserLoginLogoutHistoryByUserId]    Script Date: 10-10-2024 17:28:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetUserLoginLogoutHistoryByUserId 110
CREATE PROCEDURE [dbo].[GetUserLoginLogoutHistoryByUserId]  
@UserId SMALLINT        
AS                            
BEGIN                            
 SET NOCOUNT ON;                            
 BEGIN TRY                                    
    
        SELECT  
            uh.UserHistoryId,  
            uh.UserId,
            u.UserName,
            uh.UserLoginDateTime,
            uh.UserLogoutDateTime,
            uh.IPAddress,   
            uh.CreatedAt     
        FROM 
            [dbo].[UserHistory] uh
        LEFT JOIN 
            [dbo].[Users] u ON uh.UserId = u.UserId
        WHERE 
            uh.UserId = @UserId 
            AND u.DeletedAt IS NULL  
            AND u.DeletedBy IS NULL
        ORDER BY 
            uh.CreatedAt DESC;

    END TRY                                        
BEGIN CATCH                                    
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()                                    
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()                                    
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()                                    
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)                                    
END CATCH                             
                            
END   

GO
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 10-10-2024 17:28:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--======================================================================                                
   --GetUsers 1,25,'a','UserName',500                      
CREATE PROCEDURE [dbo].[GetUsers]                                        
    @PageNumber INT = 1,                
    @PageSize INT = 25,                
    @SearchText NVARCHAR(200),  
    @SortString VARCHAR(250),                 
    @TotalCount INT OUTPUT                                       
AS                                        
BEGIN                   
              
    SET NOCOUNT ON;                
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;                
    DECLARE @OrderBy NVARCHAR(250) = '';    
    SET @OrderBy = @SortString   
      
    IF @SortString = '' OR @SortString IS NULL  
    BEGIN    
        SET @OrderBy = 'U.UserName';    
    END   
            
    -- Get the total count                
    SELECT @TotalCount = COUNT(*)                
    FROM [dbo].[Users] U                     
    WHERE   
        U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND  
        (  
            @SearchText = '' OR  
            U.UserName LIKE '%' + @SearchText + '%' OR  
            U.FirstName LIKE '%' + @SearchText + '%' OR  
            U.LastName LIKE '%' + @SearchText + '%'  
        )    
      
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='  
        SELECT                
            U.UserId,    
            U.FirstName,    
            U.LastName,    
            U.UserName,      
            U.IsActive,      
            U.CreatedAt      
        FROM [dbo].[Users] U                         
        WHERE   
            U.DeletedAt IS NULL AND U.DeletedBy IS NULL AND  
            (  
                @SearchText = '''' OR                 U.UserName LIKE ''%'' + @SearchText + ''%'' OR                 U.FirstName LIKE ''%'' + @SearchText + ''%'' OR                 U.LastName LIKE ''%'' + @SearchText + ''%''  
            )     
      
        ORDER BY ' + @OrderBy + '   
        OFFSET @Offset ROWS                
        FETCH NEXT @PageSize ROWS ONLY;';               
           
        EXEC sp_executesql @SQL,         N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',         @SearchText, @Offset, @PageSize;                           
END 
GO
