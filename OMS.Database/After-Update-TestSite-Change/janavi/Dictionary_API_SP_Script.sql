USE [OmsLite]
GO
/****** Object:  StoredProcedure [dbo].[AddEditDictionary]    Script Date: 03-09-2024 10:16:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddEditDictionary] 
@DictionaryId int,
@Key nvarchar(200),
@Value nvarchar(200),
@CreatedBy SMALLINT
AS
BEGIN
	
	SET NOCOUNT ON;
	    BEGIN TRY  
	 DECLARE @keyId AS INT;        
	   IF @DictionaryId > 0        
        BEGIN        
            IF EXISTS (SELECT 1 FROM [dbo].Dictionary WHERE DictionaryId = @DictionaryId)        
            BEGIN        
                UPDATE [dbo].[Dictionary]        
                SET        
                    [Key] = @Key,  
                    [Value] = @Value,
					 UpdatedBy = @CreatedBy,                    
                    UpdatedAt = GETDATE()
                WHERE        
                    DictionaryId = @DictionaryId  
                        
                SELECT @DictionaryId AS KeyValue,           
                'Dictionary Updated' AS ErrorMessage;        
            END        
            ELSE        
            BEGIN        
                SELECT @DictionaryId AS KeyValue,           
                  'NO RECORD FOUND' AS ErrorMessage;        
            END        
        END        
        ELSE        
        BEGIN        
            INSERT INTO [dbo].[Dictionary]  
            (                 
               [Key],  
               [Value],
			    CreatedBy,                                      
                    CreatedAt   
            )                    
            VALUES                  
            (                
                @Key,  
                @Value,
				 @CreatedBy,                                      
                    GETDATE()   
            );                    
                    
            SET @keyId = SCOPE_IDENTITY();        
           
            SELECT @keyId AS KeyValue,           
            'Dictionary Added' AS ErrorMessage;        
        END        
        
               
    END TRY                            
    BEGIN CATCH                              
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();                              
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();                              
        DECLARE @ErrorState INT = ERROR_STATE();                              
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);                              
    END CATCH;        
 
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteDictionary]    Script Date: 03-09-2024 10:16:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteDictionary]
 @DictionaryId int,  
 @DeletedBy SMALLINT 
AS
BEGIN

 BEGIN TRY  
        IF EXISTS (SELECT DictionaryId FROM [dbo]. [Dictionary] WHERE DictionaryId = @DictionaryId )  
        BEGIN  
            UPDATE [dbo].[Dictionary]   
            SET  
                [DeletedBy] = @DeletedBy,  
                [DeletedAt] = GETDATE()  
            WHERE DictionaryId = @DictionaryId   
            
           
            
            SELECT @DictionaryId AS KeyValue,  
                   'Dictionary Deleted' AS ErrorMessage;  
        END  
        ELSE  
        BEGIN  
            SELECT @DictionaryId AS KeyValue,  
                   'No Record Found' AS ErrorMessage;  
        END  
    END TRY  
    BEGIN CATCH  
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
        DECLARE @ErrorState INT = ERROR_STATE();  
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);  
    END CATCH  
	SET NOCOUNT ON;

END
GO
/****** Object:  StoredProcedure [dbo].[GetAllDictionary]    Script Date: 03-09-2024 10:16:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--GetAllDictionary 1,25,'','',100
CREATE PROCEDURE [dbo].[GetAllDictionary]
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
        SET @OrderBy = 'D.DictionaryId DESC';    
    END
              
    -- Get the total count                  
    SELECT @TotalCount = COUNT(*)                  
    FROM [dbo].[Dictionary] D                       
    WHERE      D .DeletedAt IS NULL AND D .DeletedBy IS NULL AND ( 
            @SearchText = '' OR    
            D.[Key] LIKE '%' + @SearchText + '%' OR    
            D.[Value] LIKE '%' + @SearchText + '%' )
                   
      
    DECLARE @SQL NVARCHAR(MAX);         
    SET @SQL='           
        SELECT    
			D.[DictionaryId],
           D.[Key],    
            D.[Value]    
            
        FROM [dbo].[Dictionary] D                            
        WHERE     D .DeletedAt IS NULL AND D .DeletedBy IS NULL AND (  
                @SearchText = '''' OR    
                D.[Key] LIKE ''%'' + @SearchText + ''%'' OR    
                D.[Value] LIKE ''%'' + @SearchText + ''%'')     
             
        
        ORDER BY ' + @OrderBy + '                  
        OFFSET @Offset ROWS                  
        FETCH NEXT @PageSize ROWS ONLY;';                 
             
        EXEC sp_executesql @SQL,  
        N'@SearchText NVARCHAR(200), @Offset INT, @PageSize INT',  
        @SearchText, @Offset, @PageSize;            
	
END
GO
/****** Object:  StoredProcedure [dbo].[GetDictionaryByDictioryId]    Script Date: 03-09-2024 10:16:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetDictionaryByDictioryId]
@DictionaryId int
AS
BEGIN

	SET NOCOUNT ON;
BEGIN TRY            
            
  SELECT 
  [DictionaryId],
 [Key],  
 [Value]
         
  FROM [dbo].[Dictionary] D          
  WHERE DictionaryId = @DictionaryId  
  AND D.DeletedBy IS NULL                 
 AND D.DeletedAt IS NULL 

        
END TRY            
BEGIN CATCH            
 DECLARE @ErrorMessage nvarchar(max) = ERROR_MESSAGE()            
 DECLARE @ErrorSeverity nvarchar(max) = ERROR_SEVERITY()            
 DECLARE @ErrorState nvarchar(max) = ERROR_STATE()            
    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)            
END CATCH        
    
END
GO
